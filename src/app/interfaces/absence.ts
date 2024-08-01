import { Teacher } from "./teacher";
import { TimeInterval } from "./time-interval";
import { TimetableGroup } from "./timetable-group";


export interface Absence {
  absenceId: number;
  dayOfWeek: string;
  absenceDate: string;
  timeInterval: TimeInterval;
  absentTeacher: Teacher;
  timetableGroup: TimetableGroup;
  isAssigned: boolean;
  assignedTime: string;
}
