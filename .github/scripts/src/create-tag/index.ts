import { GitHubClient, Utils } from "@tahminator/pipeline";

export async function main() {
  const ciEnv = await Utils.getEnvVariables(["ci"]);
  const { githubPat } = parseCiEnv(ciEnv);

  const ghClient = new GitHubClient(githubPat);

  await ghClient.createTag({
    onPreTagCreate: async (tag) => {
      await Utils.updateAllPackageJsonsWithVersion(tag);
    },
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
