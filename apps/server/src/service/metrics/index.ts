import type { MetricsDto } from "@instalock/api";

import { TimedAll } from "@instalock/meter";
import { Injectable } from "@tahminator/sapling";

import { unwrap } from "@/lib/result";
import { RiotMatchRepository } from "@/repository/riotMatch";
import { UserRepository } from "@/repository/user/repo";

@Injectable([UserRepository, RiotMatchRepository])
@TimedAll()
export class MetricsService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly riotMatchRepository: RiotMatchRepository,
  ) {}

  async getMetrics(): Promise<MetricsDto> {
    const [totalUsersResult, registeredUsersResult, totalMatchesResult] =
      await Promise.all([
        this.userRepository.getUsersCount(),
        this.userRepository.getRegisteredUsersCount(),
        this.riotMatchRepository.getMatchesCount(),
      ]);

    return {
      totalMatches: unwrap(totalMatchesResult),
      totalUsers: unwrap(totalUsersResult),
      registeredUsers: unwrap(registeredUsersResult),
    };
  }
}
