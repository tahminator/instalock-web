// this must be first
import "@instalock/log";
import { SSM } from "@instalock/meter/src/server";

import { MatchRefresher } from "./helpers/loadMatches";

const METRIC_PORT = 3051;

const tasks = async () => {
  console.time("tasks");
  console.log(
    `\nRunning the following tasks at ${new Date().toLocaleString()}`,
  );

  console.log(`Running the match populator now`);

  try {
    await MatchRefresher.refreshMatchesForEachUser();
  } catch (e) {
    console.error(e);
  }

  console.timeEnd("tasks");
  console.log("Match populator should be complete.\n");
};

const username = process.env.PROMETHEUS_USERNAME;
const password = process.env.PROMETHEUS_PASSWORD;

if (!username || !password) {
  throw new Error("PROMETHEUS_USERNAME and/or PROMETHEUS_PASSWORD is not set");
}

SSM.createStandaloneMetricServer({
  username,
  password,
}).then((s) => {
  s.listen(METRIC_PORT, async () => {
    console.log("Metric server is ready.");
    await tasks();
  });
});

SSM.Utils.setAndForgetAppInfoGauge();
SSM.Utils.registerUpGauge();

console.log("Script has been loaded in.");

setInterval(
  async () => {
    tasks();
  },
  1000 * 60 * 4,
);
