import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginServiceService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService
        .login(
          this.loginForm.value['username'],
          this.loginForm.value['password']
        )
        .subscribe({
          next: (res) => {
            if (res.body != null && res.status == 200) {
              this.router.navigate(['/calendar']);
            }
          },
          error: (error) => {
            this.loginError = true;
            console.log(`Error login component: ${error}`);
          },
        });
    }
  }
}
