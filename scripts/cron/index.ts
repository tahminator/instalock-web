import { loadMatchesForEachUser } from "./helpers/loadMatches";

console.log("Script has been loaded in.");

setInterval(async () => {
  console.log(
    `\nRunning the following tasks at ${new Date().toLocaleString()}`
  );

  console.log(`Running the match populator now`);

  try {
    await loadMatchesForEachUser();
  } catch (e) {
    console.error(e);
  }

  console.log("Match populator should be complete.\n");
}, 1000 * 60 * 10);
