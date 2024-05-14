import { Component, OnInit } from '@angular/core';
import { toArray } from 'rxjs';
import { TeachingHours } from 'src/app/interfaces/teaching-hours';
import { TeachingHoursServiceService } from 'src/app/services/teaching-hours-service.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  teachingHours: TeachingHours[] = [];

  constructor(private teachingHoursService: TeachingHoursServiceService) {}

  ngOnInit(): void {
    this.getTeachingHours();
  }

  private getTeachingHours(): void {
    this.teachingHoursService.getTeachingHours().subscribe({
      next: (data) => {
        this.teachingHours = data;
      },
      error: (error) => {
        console.log(error);
      },
    });

    /*
    .subscribe(th => {
      this.teachingHours.push(th);
    }, error => {
      console.log(error)
    });*/
  }
}
