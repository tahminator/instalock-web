import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { type Type } from "@/types";
import { getEnvVariables } from "@/utils/load-env";

import { promoteDockerImage } from "../utils/promote-image";

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
  const ciEnv = await getEnvVariables(["ci"]);
  const { dockerHubPat } = parseCiEnv(ciEnv);

  await promoteDockerImage({
    originalTag,
    newGithubTags: [newGithubTag, "latest"],
    dockerHubCredentials: {
      username: "tahminator",
      repository: `instalock-${type}`,
      pat: dockerHubPat,
    },
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
