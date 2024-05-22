import { Component, OnInit } from '@angular/core';
import { TeachingHours } from 'src/app/interfaces/teaching-hours';
import { TimeInterval } from 'src/app/interfaces/time-interval';
import { TeachingHoursServiceService } from 'src/app/services/teaching-hours-service.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  teachingHours: TeachingHours[] = [];
  daysOfWeek = ['L', 'M', 'X', 'J', 'V'];

  constructor(private teachingHoursService: TeachingHoursServiceService) {}

  ngOnInit(): void {
    this.getTeachingHours();
  }

  private getTeachingHours(): void {
    this.teachingHoursService.getTeachingHours().subscribe({
      next: (data) => {
        this.teachingHours = data.teachingHours;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getUniqueTimes() {
    const times: TimeInterval[] = this.teachingHours.map(
      (th) => th.timeInterval
    );
    return times.filter(
      (time, index, self) =>
        index ===
        self.findIndex(
          (t) => t.startHour === time.startHour && t.endHour === time.endHour
        )
    );
  }

  getSlotsByDayAndTime(day: string, time: TimeInterval) {
    return this.teachingHours.filter(
      (th) =>
        th.dayOfWeek === day &&
        th.timeInterval.startHour === time.startHour &&
        th.timeInterval.endHour === time.endHour
    );
  }
}
