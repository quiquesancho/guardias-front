import { Teacher } from "./teacher";

export interface TimetableGroup {
  timetableGroupId: number;
  dayOfWeek: string;
  startHour: string;
  endHour: string;
  group: string;
  classroom: string;
  content: string;
  teacher: Teacher;
}
