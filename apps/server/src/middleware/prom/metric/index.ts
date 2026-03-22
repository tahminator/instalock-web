import { MiddlewareClass } from "@tahminator/sapling";
import * as promClient from "prom-client";

import { PrometheusMetricTypeProvider } from "@/middleware/prom/metric/provider";
import { MetricsService } from "@/service/metrics";

@MiddlewareClass({
  deps: [MetricsService, PrometheusMetricTypeProvider],
})
export class MetricsRegistrarMiddleware {
  private readonly gauges: typeof this.gaugeProvider.gauges;

  constructor(
    private readonly metricsService: MetricsService,
    readonly gaugeProvider: PrometheusMetricTypeProvider,
  ) {
    this.gauges = this.gaugeProvider.gauges;

    this.populateOnce();
    this.registerDummyTrigger();
  }

  private async populateOnce() {
    this.gauges.appInfoGauge.set(
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

    this.gauges.totalUsersGauge.set({}, metrics.totalUsers);
    this.gauges.registeredUsersGauge.set({}, metrics.registeredUsers);
    this.gauges.totalMatchesGauge.set({}, metrics.totalMatches);
  }
}
