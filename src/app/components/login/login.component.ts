import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

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
    private router: Router,
    private dialog: MatDialog
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
            this.openDialog(error as string, true);
            console.log(`Error login component: ${error}`);
          },
        });
    }
  }

  openDialog(message: string, isError: boolean): void {
    this.dialog.open(ModalDialogComponent, {
      data: { message, isError }
    });
  }
}
