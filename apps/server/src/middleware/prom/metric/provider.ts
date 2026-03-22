import { Injectable } from "@tahminator/sapling";
import * as promClient from "prom-client";

@Injectable()
export class PrometheusMetricTypeProvider {
  private readonly appInfoGauge: promClient.Gauge;
  private readonly totalUsersGauge: promClient.Gauge;
  private readonly registeredUsersGauge: promClient.Gauge;
  private readonly totalMatchesGauge: promClient.Gauge;

  private readonly riotClientExecutionHistogram: promClient.Histogram;

  constructor() {
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

    this.riotClientExecutionHistogram = new promClient.Histogram({
      name: "riot_client_execution_seconds",
      help: "Duration of RiotClient execution in seconds",
      labelNames: ["functionName", "status"],
    });
  }

  get gauges() {
    return {
      appInfoGauge: this.appInfoGauge,
      totalUsersGauge: this.totalUsersGauge,
      registeredUsersGauge: this.registeredUsersGauge,
      totalMatchesGauge: this.totalMatchesGauge,
    } as const;
  }

  get histograms() {
    return {
      riotClientExecutionHistogram: this.riotClientExecutionHistogram,
    } as const;
  }
}
