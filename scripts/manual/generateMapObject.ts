import { Buffer } from "buffer";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateMapObject() {
  const res = await fetch("https://valorant-api.com/v1/maps");

  const json = (await res.json()) as {
    status: number;
    data: {
      uuid: string;
      displayName: string;
      splash: string;
    }[];
  };

  const obj: Record<string, string> = {};
  // 4 is the most newest tier updates.
  json.data.forEach(async (v) => {
    obj[v.uuid] = v.displayName;
  });

  console.log(obj);
}

generateMapObject();

export {};
