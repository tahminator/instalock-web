import { MiddlewareClass } from "@tahminator/sapling";
import * as promClient from "prom-client";

import { MetricsService } from "@/service/metrics";

@MiddlewareClass({
  deps: [MetricsService],
})
export class MetricsRegistrarMiddleware {
  private readonly appInfoGauge: promClient.Gauge;
  private readonly totalUsersGauge: promClient.Gauge;
  private readonly registeredUsersGauge: promClient.Gauge;
  private readonly totalMatchesGauge: promClient.Gauge;

  constructor(private readonly metricsService: MetricsService) {
    this.appInfoGauge = new promClient.Gauge({
      name: "application_info",
      help: "Application metadata",
      labelNames: ["version", "totalUsers", "registeredUsers", "totalMatches"],
    });

    this.totalUsersGauge = new promClient.Gauge({
      name: "app_users_total",
      help: "Number of users who have either registered atleast once or have been in a match with a registered user",
    });

    this.registeredUsersGauge = new promClient.Gauge({
      name: "app_users_registered",
      help: "Number of users who have registered atleast once",
    });

    this.totalMatchesGauge = new promClient.Gauge({
      name: "app_matches_total",
      help: "Number of tracked matches",
    });

    this.populateOnce();
    this.registerDummyTrigger();
  }

  private async populateOnce() {
    this.appInfoGauge.set(
      {
        version: process.env.VERSION ?? "N/A",
      },
      1,
    );

    await this.populateGaugesWithMetrics();
  }

  private registerDummyTrigger() {
    new promClient.Gauge({
      name: "metric_collection_trigger",
      help: "Internal trigger for async metric collection",
      collect: async () => {
        await this.populateGaugesWithMetrics();
      },
    });
  }

  private async populateGaugesWithMetrics(): Promise<void> {
    const metrics = await this.metricsService.getMetrics();

    this.totalUsersGauge.set(metrics.totalUsers);
    this.registeredUsersGauge.set(metrics.registeredUsers);
    this.totalMatchesGauge.set(metrics.totalMatches);
  }
}
