import { Absence } from "./absence";
import { Teacher } from "./teacher";

export interface RegistryAbsence {
  registryAbsenceId: number,
  absence: Absence,
  teacher: Teacher,
  observation: string,
  checkGuard: Date
}
