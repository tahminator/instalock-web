import { loadMatchesForEachUser } from "./helpers/loadMatches";

const tasks = async () => {
  console.time("tasks");
  console.log(
    `\nRunning the following tasks at ${new Date().toLocaleString()}`
  );

  console.log(`Running the match populator now`);

  try {
    await loadMatchesForEachUser();
  } catch (e) {
    console.error(e);
  }

  console.timeEnd("tasks");
  console.log("Match populator should be complete.\n");
};

console.log("Script has been loaded in.");
tasks();

setInterval(async () => {
  tasks();
}, 1000 * 60 * 4);
