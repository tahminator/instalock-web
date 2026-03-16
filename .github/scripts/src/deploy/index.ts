import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import type { Environment, Type } from "@/types";

import { updateK8sTagWithPR } from "@/utils/create-k8s-pr";
import { getEnvVariables } from "@/utils/load-env";

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
  const ciEnv = await getEnvVariables(["ci"]);
  const { githubPat } = parseCiEnv(ciEnv);

  if (environment === "production") {
    if (type === "web") {
      await updateK8sTagWithPR({
        githubPat,
        kustomizationFilePath:
          "apps/production/instalock-web/kustomization.yaml",
        imageName: "docker.io/tahminator/instalock-web",
        newTag: newTagVersion,
        environment: "production",
      });
    }

    if (type === "cron") {
      await updateK8sTagWithPR({
        githubPat,
        kustomizationFilePath:
          "apps/production/instalock-cron/kustomization.yaml",
        imageName: "docker.io/tahminator/instalock-cron",
        newTag: newTagVersion,
        environment: "production",
      });
    }
  }

  if (environment === "staging") {
    if (type === "web") {
      await updateK8sTagWithPR({
        githubPat,
        kustomizationFilePath: "apps/staging/instalock-web/kustomization.yaml",
        imageName: "docker.io/tahminator/instalock-web",
        newTag: newTagVersion,
        environment: "staging",
      });
    }

    if (type === "cron") {
      await updateK8sTagWithPR({
        githubPat,
        kustomizationFilePath: "apps/staging/instalock-cron/kustomization.yaml",
        imageName: "docker.io/tahminator/instalock-cron",
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

main()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
