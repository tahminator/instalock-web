import { GitHubClient, Utils, type Environment } from "@tahminator/pipeline";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import type { Type } from "@/types";

import { migrateDb } from "@/deploy/db";

const { environment, newTagVersion, type } = await yargs(hideBin(process.argv))
  .option("newTagVersion", {
    type: "string",
    demandOption: true,
  })
  .option("environment", {
    choices: ["staging", "production"] satisfies Environment[],
    describe: "Deployment environment (staging or production)",
    demandOption: true,
  })
  .option("type", {
    choices: ["cron", "web"] satisfies Type[],
    describe: "Deployment environment (staging or production)",
    demandOption: true,
  })
  .strict()
  .parse();

async function main() {
  const ciEnv = await Utils.getEnvVariables(["ci"]);
  const { githubPat } = parseCiEnv(ciEnv);
  const ghClient = new GitHubClient(githubPat);

  const { dbHost, dbPassword, dbPort, dbUsername } = parseMigratorEnv(
    await Utils.getEnvVariables(["migrator"]),
  );

  if (environment === "production") {
    if (type === "web") {
      // TODO: This should be indempotent
      await migrateDb({
        dbHost,
        dbPassword,
        dbPort,
        dbUsername,
        dbName: "instalock-server",
      });
      await ghClient.updateK8sTagWithPR({
        manifestRepo: ["tahminator", "k8s-personal"],
        originRepo: ["tahminator", "instalock-web"],
        kustomizationFilePath:
          "apps/production/instalock-web/kustomization.yaml",
        imageName: "tahminator/instalock-web",
        newTag: newTagVersion,
        environment: "production",
      });
    }

    if (type === "cron") {
      await ghClient.updateK8sTagWithPR({
        manifestRepo: ["tahminator", "k8s-personal"],
        originRepo: ["tahminator", "instalock-web"],
        kustomizationFilePath:
          "apps/production/instalock-cron/kustomization.yaml",
        imageName: "tahminator/instalock-cron",
        newTag: newTagVersion,
        environment: "production",
      });
    }
  }

  if (environment === "staging") {
    if (type === "web") {
      // TODO: This should be indempotent
      await migrateDb({
        dbHost,
        dbPassword,
        dbPort,
        dbUsername,
        dbName: "instalock-server-staging",
      });
      await ghClient.updateK8sTagWithPR({
        manifestRepo: ["tahminator", "k8s-personal"],
        originRepo: ["tahminator", "instalock-web"],
        kustomizationFilePath: "apps/staging/instalock-web/kustomization.yaml",
        imageName: "tahminator/instalock-web",
        newTag: newTagVersion,
        environment: "staging",
      });
    }

    if (type === "cron") {
      await ghClient.updateK8sTagWithPR({
        manifestRepo: ["tahminator", "k8s-personal"],
        originRepo: ["tahminator", "instalock-web"],
        kustomizationFilePath: "apps/staging/instalock-cron/kustomization.yaml",
        imageName: "tahminator/instalock-cron",
        newTag: newTagVersion,
        environment: "staging",
      });
    }
  }
}

function parseCiEnv(ciEnv: Record<string, string>) {
  const githubPat = (() => {
    const v = ciEnv["GITHUB_PAT"];
    if (!v) {
      throw new Error("Missing GITHUB_PAT from .env.ci");
    }
    return v;
  })();

  return { githubPat };
}

function parseMigratorEnv(migratorEnv: Record<string, string>) {
  const dbPort = (() => {
    const v = migratorEnv["DB_PORT"];
    if (!v) {
      throw new Error("Missing DB_PORT from .env.ci");
    }
    return v;
  })();

  const dbUsername = (() => {
    const v = migratorEnv["DB_USERNAME"];
    if (!v) {
      throw new Error("Missing DB_USERNAME from .env.ci");
    }
    return v;
  })();

  const dbPassword = (() => {
    const v = migratorEnv["DB_PASSWORD"];
    if (!v) {
      throw new Error("Missing DB_PASSWORD from .env.ci");
    }
    return v;
  })();

  const dbHost = (() => {
    const v = migratorEnv["DB_HOST"];
    if (!v) {
      throw new Error("Missing DB_HOST from .env.ci");
    }
    return v;
  })();

  return {
    dbHost,
    dbPort,
    dbPassword,
    dbUsername,
  };
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
