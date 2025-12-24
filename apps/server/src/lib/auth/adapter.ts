import type { Adapter, DatabaseSession, DatabaseUser } from "lucia";

import type { SessionRepository } from "@/repository/session";
import type { UserRepository } from "@/repository/user";

export class AuthPostgresAdapter implements Adapter {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async deleteSession(sessionId: string): Promise<void> {
    await this.sessionRepository.deleteSession(sessionId);
  }

  async deleteUserSessions(userId: string): Promise<void> {
    await this.sessionRepository.deleteUserSessions(userId);
  }

  async getSessionAndUser(
    sessionId: string,
  ): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
    const sessionData = await this.sessionRepository.getSessionById(sessionId);

    if (!sessionData) {
      return [null, null];
    }

    const userData = await this.userRepository.getUserByPuuid(
      sessionData.userId,
    );

    if (!userData) {
      return [null, null];
    }

    const session: DatabaseSession = {
      id: sessionData.id,
      userId: sessionData.userId,
      expiresAt: new Date(sessionData.expiresAt),
      attributes: {},
    };

    const user: DatabaseUser = {
      id: userData.puuid,
      attributes: {
        ...userData,
      },
    };

    return [session, user];
  }

  async getUserSessions(userId: string): Promise<DatabaseSession[]> {
    const sessions =
      await this.sessionRepository.getSessionsByUserPuuid(userId);

    return sessions.map((session) => ({
      id: session.id,
      userId: session.userId,
      expiresAt: new Date(session.expiresAt),
      attributes: {},
    }));
  }

  async setSession(session: DatabaseSession): Promise<void> {
    await this.sessionRepository.createSession(
      session.id,
      session.userId,
      session.expiresAt,
    );
  }

  async updateSessionExpiration(
    sessionId: string,
    expiresAt: Date,
  ): Promise<void> {
    await this.sessionRepository.updateSessionExpiration(sessionId, expiresAt);
  }

  async deleteExpiredSessions(): Promise<void> {
    await this.sessionRepository.deleteExpiredSessions();
  }
}
