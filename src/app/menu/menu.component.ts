import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginServiceService } from '../services/login-service.service';
import { Router } from '@angular/router';
import { Teacher } from '../interfaces/teacher';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  isLogged: boolean = false;
  private ROLES: string[] = ['Docente', 'Admin', 'Secretaria'];
  isTeacher: boolean;
  isSecretary: boolean;
  isAdmin: boolean;
  fullName: string = '';
  email: string = '';

  constructor(
    private loginService: LoginServiceService,
    private router: Router
  ) {
    this.loginService.logginSuccess.subscribe((res) => {
      this.isLogged = res;
      if (this.isLogged) {
        this.checkRoles();
        this.fillNameAndEmail();
      }
    });

    this.isTeacher = false;
    this.isAdmin = false;
    this.isSecretary = false;
    if (sessionStorage.getItem('token') != null) {
      this.isLogged = true;
      this.checkRoles();
    }
  }

  ngOnInit(): void {
    if (this.isLogged) {
      this.checkRoles();
      this.fillNameAndEmail();
    }
  }

  doLogout() {
    this.loginService.doLogout();
    this.fullName = "";
    this.email = "";
    this.isLogged = false;
    this.router.navigate(['/']);
  }

  private checkRoles() {
    let teacherJson = sessionStorage.getItem('teacher');
    if (teacherJson != null) {
      let teacher = JSON.parse(teacherJson) as Teacher;
      this.isTeacher = teacher.role.includes(this.ROLES[0]);
      this.isAdmin = teacher.role.includes(this.ROLES[1]);
      this.isSecretary = teacher.role.includes(this.ROLES[2]);
    }
  }

  private fillNameAndEmail() {
    const json = sessionStorage.getItem('teacher');
    if (json != null) {
      const teacher: Teacher = JSON.parse(json);
      this.fullName = `${teacher.name} ${teacher.firstSurname} ${teacher.secondSurname}`;
      this.email = teacher.email;
    }
  }
}
