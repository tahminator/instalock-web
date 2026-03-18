import { $ } from "bun";

export async function promoteDockerImage({
  originalTag,
  newGithubTags,
  dockerHubCredentials,
}: {
  originalTag: string;
  newGithubTags: string[];
  dockerHubCredentials: {
    pat: string;
    username: string;
    repository: string;
  };
}) {
  const { username, pat, repository } = dockerHubCredentials;
  const fullRepo = `${username}/${repository}`;
  const oldImage = `${fullRepo}:${originalTag}`;

  try {
    await $`echo ${pat} | docker login -u ${username} --password-stdin`;
    await $`docker pull ${oldImage}`;

    for (const tag of newGithubTags) {
      const newImage = `${fullRepo}:${tag}`;
      console.log(`Promoting to ${newImage}...`);

      await $`docker tag ${oldImage} ${newImage}`;
      await $`docker push ${newImage}`;
    }

    console.log(`Promoted ${originalTag} to: ${newGithubTags.join(", ")}`);
  } finally {
    await $`docker logout`;
  }
}
