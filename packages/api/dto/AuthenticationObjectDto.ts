import type { Session } from "@instalock/db";
import type { User } from "@instalock/db";

export interface AuthenticationObjectDto {
  user: User | null;
  session: Session | null;
}
