import { Session } from "@instalock/db";
import { User } from "@instalock/db";

export interface AuthenticationObjectDto {
  user: User | null;
  session: Session | null;
}
