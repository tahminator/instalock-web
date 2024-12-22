import { Session, User } from "lucia";

declare global {
  namespace Express {
    interface Locals {
      user: Omit<User, "id"> | null;
      session: Session | null;
    }
  }
}
