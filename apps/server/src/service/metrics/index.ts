import type { z } from "zod";

import { TimedAll } from "@instalock/meter";
import { Injectable } from "@tahminator/sapling";

import type { GetMetricsResponseBodySchema } from "@/controller/api/riot/unauthenticated/schema";

import { unwrap } from "@/lib/result";
import { RiotMatchRepository } from "@/repository/riotMatch";
import { UserRepository } from "@/repository/user/repo";

export type MetricsDto = z.infer<
  typeof GetMetricsResponseBodySchema
>["payload"];

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
