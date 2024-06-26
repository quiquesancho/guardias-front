import { Teacher } from "./teacher";

export interface LoginResponse {
  teacher: Teacher;
  token: string;
}
