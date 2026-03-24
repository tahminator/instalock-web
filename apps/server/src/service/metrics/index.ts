import type { MetricsDto } from "@instalock/api";

import { TimedAll } from "@instalock/meter";
import { Injectable } from "@tahminator/sapling";

import { RiotMatchRepository } from "@/repository/riotMatch";
import { UserRepository } from "@/repository/user";

@Injectable([UserRepository, RiotMatchRepository])
@TimedAll()
export class MetricsService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly riotMatchRepository: RiotMatchRepository,
  ) {}

  async getMetrics(): Promise<MetricsDto> {
    const [totalUsers, registeredUsers, totalMatches] = await Promise.all([
      await this.userRepository.getUsersCount(),
      await this.userRepository.getRegisteredUsersCount(),
      await this.riotMatchRepository.getMatchesCount(),
    ]);

    return {
      totalMatches,
      totalUsers,
      registeredUsers,
    };
  }
}
