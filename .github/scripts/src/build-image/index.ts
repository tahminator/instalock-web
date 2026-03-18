import { GitHubClient, Utils, type Environment } from "@tahminator/pipeline";
import { $ } from "bun";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import type { Type } from "@/types";

process.env.TZ = "America/New_York";

const {
  environment,
  dockerUpload,
  type,
  dockerFileName,
  getGhaOutput,
  githubOutputFile,
} = await yargs(hideBin(process.argv))
  .option("environment", {
    choices: ["staging", "production"] satisfies Environment[],
    describe: "Deployment environment (staging or production)",
    demandOption: true,
  })
  .option("dockerUpload", {
    type: "boolean",
    default: true,
  })
  .option("getGhaOutput", {
    type: "boolean",
    describe:
      "Enable GitHub Actions output to receive latest built tag version",
    default: false,
  })
  .option("githubOutputFile", {
    type: "string",
    describe:
      "Path to GITHUB_OUTPUT (this will be passed in automatically in CI)",
    default: process.env.GITHUB_OUTPUT,
  })
  .option("type", {
    choices: ["cron", "web"] satisfies Type[],
    describe: "Deployment environment (staging or production)",
    demandOption: true,
  })
  .option("dockerFileName", {
    type: "string",
    default: "Dockerfile.web",
  })
  .strict()
  .parse();

async function main() {
  const ghClient = new GitHubClient();

  const ciEnv = await Utils.getEnvVariables(["ci"]);
  const { dockerHubPat } = parseCiEnv(ciEnv);

  const tagPrefix = environment === "staging" ? "staging-" : "";

  // copy old tz format from build-image.sh
  const timestamp = new Date()
    .toLocaleString("en-US", {
      timeZone: process.env.TZ,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(/(\d+)\/(\d+)\/(\d+),\s(\d+):(\d+):(\d+)/, "$3.$1.$2-$4.$5.$6");

  const gitSha = (await $`git rev-parse --short HEAD`.text()).trim();

  const tags = [
    `tahminator/instalock-${type}:${tagPrefix}${timestamp}`,
    `tahminator/instalock-${type}:${tagPrefix}${gitSha}`,
  ];

  console.log("Building image with following tags:");
  tags.forEach((tag) => console.log(tag));

  if (dockerHubPat) {
    console.log("DOCKER_HUB_PAT found");
  } else {
    console.log("DOCKER_HUB_PAT missing or empty");
  }

  await $`echo ${dockerHubPat} | docker login -u tahminator --password-stdin`;

  try {
    await $`docker buildx create --use --name instalock-builder`;
  } catch {
    await $`docker buildx use instalock-builder`;
  }

  const buildMode = dockerUpload ? "--push" : "--load";

  const tagArgs = tags.flatMap((tag) => ["--tag", tag]);

  await $`docker buildx build ${buildMode} \
              --platform linux/amd64 \
              --file infra/${dockerFileName} \
              ${tagArgs} \
              .`;

  console.log("Image pushed successfully.");

  if (getGhaOutput) {
    ghClient.outputToGithubOutput({
      overrideGithubOutputFile: githubOutputFile ? githubOutputFile : undefined,
      ctx: {
        tag: `${tagPrefix}${gitSha}`,
      },
    });
  }
}

function parseCiEnv(ciEnv: Record<string, string>) {
  const dockerHubPat = (() => {
    const v = ciEnv["DOCKER_HUB_PAT"];
    if (!v) {
      throw new Error("Missing DOCKER_HUB_PAT from .env.ci");
    }
    return v;
  })();

  return { dockerHubPat };
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
