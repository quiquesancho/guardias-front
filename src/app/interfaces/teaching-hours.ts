import { Teacher } from './teacher';
import { TimeInterval } from './time-interval';

export interface TeachingHours {
  teachingHourId: number;
  timeInterval: TimeInterval;
  dayOfWeek: string;
  teacher: Teacher;
  occupation: string;
}
