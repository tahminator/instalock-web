import { Gauge } from "prom-client";

export class MetricsUtils {
  static setAndForgetAppInfoGauge(): void {
    new Gauge({
      name: "application_info",
      help: "Application metadata",
      labelNames: ["version"],
    }).set(
      {
        version: process.env.VERSION,
      },
      1,
    );
  }

  static registerUpGauge(): Gauge {
    return new Gauge({
      name: "up",
      help: "Up",
      collect() {
        this.set(1);
      },
    });
  }
}
