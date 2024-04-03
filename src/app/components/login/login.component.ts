import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/internal/operators/map';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginServiceService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value['username'], this.loginForm.value['password']).subscribe({
        next: res => {
          console.log(res.headers)
          this.loginService.handleLoginResponse(res);
          console.log(sessionStorage.getItem('JSESSIONID'))
        },
        error: error => {
          console.log(error)
        }
      });
    }
  }
}
