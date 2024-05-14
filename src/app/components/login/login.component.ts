import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginServiceService, private cookieService: CookieService) {
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
          console.log(res.body)
          if(res.body != null){
            localStorage.setItem('token', res.body.token);
            localStorage.setItem('teacher', JSON.stringify(res.body.teacher));
          }


        },
        error: error => {
          console.log(error)
        }
      });
    }
  }
}
