import { Component, OnInit } from '@angular/core';
import { playgrounds } from 'src/app/interfaces/playgrounds';
import { Teacher } from 'src/app/interfaces/teacher';
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
  private dayOrder: { [key: string]: number } = {
    "L": 1,
    "M": 2,
    "X": 3,
    "J": 4,
    "V": 5
  };

  constructor(private teachingHoursService: TeachingHoursServiceService) {}

  ngOnInit(): void {
    this.getTeachingHours();
  }

  private getTeachingHours(): void {
    this.teachingHoursService.getTeachingHours().subscribe({
      next: (data) => {
        this.teachingHours = data.teachingHours;
        playgrounds.forEach(pg => this.teachingHours.push(pg))
        this.sortTeachingHours(this.teachingHours);
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

  getFullTeacherName(teacher: Teacher): string {
    return `${teacher.name} ${teacher.firstSurname} ${teacher.secondSurname}`;
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private compareTeachingHours(a: TeachingHours, b: TeachingHours): number {
    const dayComparison = this.dayOrder[a.dayOfWeek] - this.dayOrder[b.dayOfWeek];
    if (dayComparison !== 0) {
      return dayComparison;
    }

    const startMinutesA = this.timeToMinutes(a.timeInterval.startHour);
    const startMinutesB = this.timeToMinutes(b.timeInterval.startHour);
    return startMinutesA - startMinutesB;
  }

  sortTeachingHours(teachingHours: TeachingHours[]): TeachingHours[] {
    return teachingHours.sort(this.compareTeachingHours.bind(this));
  }
}
