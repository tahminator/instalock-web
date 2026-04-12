import type { Adapter, DatabaseSession, DatabaseUser } from "lucia";

import { TimedAll } from "@instalock/meter";
import { HttpStatus, ResponseStatusError } from "@tahminator/sapling";
import { err, ok } from "neverthrow";

import type { SessionRepository } from "@/repository/session";
import type { UserRepository } from "@/repository/user/repo";

@TimedAll()
export class AuthPostgresAdapter implements Adapter {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async deleteSession(sessionId: string): Promise<void> {
    await this.sessionRepository.taintSession(sessionId);
  }

  async deleteUserSessions(userId: string): Promise<void> {
    await this.sessionRepository.deleteUserSessions(userId);
  }

  async getSessionAndUser(
    sessionId: string,
  ): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
    const sessionUser = await this.sessionRepository
      .getSessionById(sessionId)
      .andThen((maybeSession) =>
        maybeSession ?
          ok(maybeSession)
        : err(
            new ResponseStatusError(
              HttpStatus.NOT_FOUND,
              `Session not found: ${sessionId}`,
            ),
          ),
      )
      .andThen((sessionData) =>
        this.userRepository
          .getUserByPuuid(sessionData.userId)
          .andThen((maybeUser) =>
            maybeUser ?
              ok(maybeUser)
            : err(
                new ResponseStatusError(
                  HttpStatus.NOT_FOUND,
                  `User not found: ${sessionData.userId}`,
                ),
              ),
          )
          .map((userData) => ({ sessionData, userData })),
      );

    if (sessionUser.isErr()) {
      return [null, null];
    }

    const { sessionData, userData } = sessionUser.value;

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
    const sessionsResult =
      await this.sessionRepository.getSessionsByUserPuuid(userId);

    if (sessionsResult.isErr()) {
      return [];
    }

    return sessionsResult.value.map((session) => ({
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
