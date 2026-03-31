// this must be first
import "@instalock/log";
import type { RefreshResult, TraverseResult } from "cron/helpers/types";

import { SSM } from "@instalock/meter/src/server";
import { MatchTraverser } from "cron/helpers/traverse";

import { MatchRefresher } from "./helpers/refresh";

const METRIC_PORT = 3051;

MatchRefresher.registerListeners();

const refresh = async () => {
  console.time("refresh");
  console.log(`Running the match refresher now`);

  let result: RefreshResult | null = null;
  try {
    result = await MatchRefresher.refreshMatchesForEachUser();
  } catch (e) {
    console.error(e);
  }

  console.timeEnd("refresh");

  if (!result) {
    console.error("RefreshResult is empty");
    return;
  }

  console.log(
    `After refreshing ${result?.users} users, ${result?.matches} matches were added`,
  );

  console.log("Match populator complete.\n");
};

const traverse = async () => {
  console.time("traverse");
  console.log(`Running the match traverser now`);

  let result: TraverseResult | null = null;
  try {
    result = await MatchTraverser.traverseMatchesForEachUser();
  } catch (e) {
    console.error(e);
  }

  console.timeEnd("traverse");

  if (!result) {
    console.error("TraverseResult is empty");
    return;
  }

  console.log(
    `After iterating ${result?.totalMatches} matches, ${result?.newMatchConnections} match connections were created`,
  );

  console.log("Match traverser complete.\n");
};

const tasks = async () => {
  await refresh();
  await traverse();
};

const username = process.env.PROMETHEUS_USERNAME;
const password = process.env.PROMETHEUS_PASSWORD;

if (!username || !password) {
  throw new Error("PROMETHEUS_USERNAME and/or PROMETHEUS_PASSWORD is not set");
}

SSM.createStandaloneMetricServer({
  username,
  password,
}).listen(METRIC_PORT, () => {
  console.log("Metric server is ready.");
  void tasks();
});

SSM.Utils.setAndForgetAppInfoGauge();
SSM.Utils.registerUpGauge();

console.log("Script has been loaded in.");

setInterval(
  () => {
    void tasks();
  },
  1000 * 60 * 10,
);
