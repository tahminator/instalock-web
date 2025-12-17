import { Injectable } from "@tahminator/sapling";
import {
  Lucia,
  TimeSpan,
  Session as LuciaSession,
  User as LuciaUser,
} from "lucia";
import { SessionRepository } from "@/repository/session";
import { UserRepository } from "@/repository/user";
import { AuthPostgresAdapter } from "../lib/auth/adapter";
import { attempt } from "@instalock/attempt";

export interface AuthSession extends LuciaSession {}
export interface AuthUser extends LuciaUser {}

@Injectable([SessionRepository, UserRepository])
export class AuthService {
  private readonly lucia: Lucia;

  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly userRepository: UserRepository,
  ) {
    const adapter = new AuthPostgresAdapter(sessionRepository, userRepository);

    this.lucia = new Lucia(adapter, {
      sessionExpiresIn: new TimeSpan(1, "d"),
      sessionCookie: {
        attributes: {
          path: "/",
          secure: process.env.NODE_ENV === "production",
        },
      },
      getUserAttributes: (attributes) => {
        return {
          puuid: attributes.puuid,
        };
      },
    });
  }

  async createSession(
    userId: string,
    attributes: Record<string, any> = {},
  ): Promise<LuciaSession> {
    return await this.lucia.createSession(userId, attributes);
  }

  async validateSession(
    sessionId: string,
  ): Promise<{ session: LuciaSession | null; user: LuciaUser | null }> {
    return await this.lucia.validateSession(sessionId);
  }

  async invalidateSession(sessionId: string): Promise<void> {
    await this.lucia.invalidateSession(sessionId);
  }

  async invalidateUserSessions(userId: string): Promise<void> {
    await this.lucia.invalidateUserSessions(userId);
  }

  readSessionCookie(cookieHeader: string): string | null {
    return this.lucia.readSessionCookie(cookieHeader);
  }

  createSessionCookie(sessionId: string) {
    return this.lucia.createSessionCookie(sessionId);
  }

  createBlankSessionCookie() {
    return this.lucia.createBlankSessionCookie();
  }

  async deleteExpiredSessions(): Promise<void> {
    await this.lucia.deleteExpiredSessions();
  }
}
