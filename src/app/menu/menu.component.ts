import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { Router } from '@angular/router';
import { Teacher } from '../interfaces/teacher';
import { EventRegisterAbsenceService } from '../services/event-register-absence.service';

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
    private eventRegisterAbsenceService: EventRegisterAbsenceService,
    private router: Router
  ) {
    this.loginService.logginSuccess.subscribe((res) => {
      this.isLogged = res;
      if (this.isLogged) {
        this.checkRoles();
        this.fillNameAndEmail();
        this.subscribeToEvents();
      }
    });

    this.isTeacher = false;
    this.isAdmin = false;
    this.isSecretary = false;
    if (sessionStorage.getItem('token') != null) {
      this.isLogged = true;
      this.checkRoles();
      this.subscribeToEvents();
    }
  }

  ngOnInit(): void {
    if (this.isLogged) {
      this.checkRoles();
      this.fillNameAndEmail();
      this.subscribeToEvents();
    }
  }

  doLogout() {
    this.loginService.doLogout();
    this.fullName = '';
    this.email = '';
    this.isLogged = false;
    this.eventRegisterAbsenceService.unsubscribeToEvents();
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

  private subscribeToEvents(): void {
    this.eventRegisterAbsenceService.subscribeToEvents().subscribe({
      next: (data) => {
        console.log(data.payload);
      },
      error: (data) => {
        console.log(data);
      },
    });
  }
}
