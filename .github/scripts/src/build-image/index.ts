import { $ } from "bun";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { getEnvVariables } from "@/utils/load-env";

process.env.TZ = "America/New_York";

const { tagPrefix, dockerUpload, type, dockerFileName } = await yargs(
  hideBin(process.argv),
)
  .option("tagPrefix", {
    type: "string",
    default: "",
  })
  .option("dockerUpload", {
    type: "boolean",
    default: true,
  })
  .option("type", {
    type: "string",
    default: "web",
  })
  .option("dockerFileName", {
    type: "string",
    default: "Dockerfile.web",
  })
  .strict()
  .parse();

async function main() {
  const ciEnv = await getEnvVariables(["ci"]);
  const { dockerHubPat } = parseCiEnv(ciEnv);

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
    `tahminator/instalock-${type}:${tagPrefix}latest`,
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
