import { createTag } from "../utils/create-tag";

export async function main() {
  await createTag({});
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
