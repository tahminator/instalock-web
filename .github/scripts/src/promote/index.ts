import { DockerClient, Utils } from "@tahminator/pipeline";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { type Type } from "@/types";

const { originalTag, newGithubTag, type } = await yargs(hideBin(process.argv))
  .option("originalTag", {
    type: "string",
    demandOption: true,
  })
  .option("newGithubTag", {
    type: "string",
    demandOption: true,
  })
  .option("type", {
    choices: ["cron", "web"] satisfies Type[],
    describe: "Deployment environment (staging or production)",
    demandOption: true,
  })
  .strict()
  .parse();

export async function main() {
  const ciEnv = await Utils.getEnvVariables(["ci"]);
  const { dockerHubPat } = parseCiEnv(ciEnv);
  await using dockerClient = await DockerClient.create(
    "tahminator",
    dockerHubPat,
  );

  await dockerClient.promoteDockerImage({
    originalTag,
    newGithubTags: [newGithubTag, "latest"],
    repository: `instalock-${type}`,
  });
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
