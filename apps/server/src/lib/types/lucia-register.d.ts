import { User } from "@instalock/types";

import { lucia } from "@/lib/auth";

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: User;
  }
}
