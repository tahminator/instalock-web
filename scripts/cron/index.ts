import { loadMatchesForEachUser } from "./helpers/loadMatches.js";

const tasks = async () => {
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
};

console.log("Script has been loaded in.");
tasks();

setInterval(async () => {
  tasks();
}, 1000 * 60 * 10);
