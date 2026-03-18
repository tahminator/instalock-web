import { $ } from "bun";

export async function promoteDockerImage({
  originalTag,
  newGithubTag,
  dockerHubCredentials,
}: {
  originalTag: string;
  newGithubTag: string;
  dockerHubCredentials: {
    pat: string;
    username: string;
    repository: string;
  };
}) {
  const { username, pat, repository } = dockerHubCredentials;
  const fullRepo = `${username}/${repository}`;
  const oldImage = `${fullRepo}:${originalTag}`;
  const newImage = `${fullRepo}:${newGithubTag}`;

  try {
    await $`echo ${pat} | docker login -u ${username} --password-stdin`;
    await $`docker pull ${oldImage}`;
    await $`docker tag ${oldImage} ${newImage}`;
    await $`docker push ${newImage}`;

    console.log(`Promoted ${originalTag} to ${newGithubTag}`);
  } finally {
    await $`docker logout`;
  }
}
