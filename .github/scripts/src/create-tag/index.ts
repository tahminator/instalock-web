import { getEnvVariables } from "@/utils/load-env";

import { createTag } from "../utils/create-tag";

export async function main() {
  const ciEnv = await getEnvVariables(["ci"]);
  const { githubPat } = parseCiEnv(ciEnv);

  await createTag({
    token: githubPat,
  });
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
