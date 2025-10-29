import { Buffer } from "buffer";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateAgentObject() {
  const res = await fetch("https://valorant-api.com/v1/agents");

  const json = (await res.json()) as {
    status: number;
    data: {
      uuid: string;
      displayName: string;
      displayIcon: string;
      isPlayableCharacter: boolean;
    }[];
  };

  const obj: Record<string, string> = {};
  json.data.forEach(async (v) => {
    if (v.isPlayableCharacter) {
      obj[v.uuid] = v.displayName.replace("/", "");
    }
  });

  console.log(obj);
}

generateAgentObject();
