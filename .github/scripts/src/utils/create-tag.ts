import { Octokit } from "@octokit/rest";
import semver from "semver";

const githubToken = (() => {
  const v = process.env.GH_TOKEN;
  return v;
})();

const [owner, repo] = (() => {
  const v = process.env.GITHUB_REPOSITORY;
  if (!v) {
    throw new Error("GITHUB_REPOSITORY is required");
  }
  return v.split("/") as [string, string];
})();

export async function createTag({ token }: { token?: string }) {
  if (!token && !githubToken) {
    throw new Error("Some token should be set");
  }

  const client = new Octokit({
    auth: token ?? githubToken,
  });

  const { data: tags } = await client.rest.repos.listTags({ owner, repo });

  const lastTag = tags
    .map((t) => t.name)
    .filter((v) => semver.valid(v))
    .sort(semver.rcompare)[0];

  const nextTag = lastTag ? semver.inc(lastTag, "patch") : "1.0.0";

  if (!nextTag) {
    throw new Error("Could not increment version");
  }

  const { data: repository } = await client.rest.repos.get({
    owner,
    repo,
  });

  const { data: branch } = await client.rest.repos.getBranch({
    owner,
    repo,
    branch: repository.default_branch,
  });

  const { data: commit } = await client.rest.git.createCommit({
    owner,
    repo,
    message: `Version ${nextTag}`,
    tree: branch.commit.commit.tree.sha,
    parents: [branch.commit.sha],
  });

  await client.rest.git.createRef({
    owner,
    repo,
    ref: `refs/tags/${nextTag}`,
    sha: commit.sha,
  });
}
