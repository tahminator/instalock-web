import type { User } from "@instalock/types";

import type { lucia } from "@/lib/auth";

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: User;
  }
}
