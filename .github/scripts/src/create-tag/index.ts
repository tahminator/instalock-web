import { GitHubClient, Utils } from "@tahminator/pipeline";
import { $ } from "bun";

export async function main() {
  const ciEnv = await Utils.getEnvVariables(["ci"]);
  const { githubPat } = parseCiEnv(ciEnv);

  const ghClient = new GitHubClient(githubPat);

  await ghClient.createTag({
    onPreTagCreate: async (tag) => {
      const files = (
        await $`find . -name "package.json" -not -path "*/node_modules/*"`.text()
      )
        .trim()
        .split("\n");

      for (const fileLocation of files) {
        const file = Bun.file(fileLocation);

        const pkg = await file.json();
        pkg.version = tag;

        await Bun.write(fileLocation, JSON.stringify(pkg, null, 2) + "\n");

        console.log(
          `Successfully updated version in ${fileLocation} to ${tag}`,
        );
      }
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
