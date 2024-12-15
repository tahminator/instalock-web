import { Buffer } from "buffer";
import { writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateTiers() {
  const res = await fetch("https://valorant-api.com/v1/competitivetiers");

  const json = (await res.json()) as {
    status: number;
    data: {
      uuid: string;
      assetObjectName: string;
      tiers: {
        tier: number;
        tierName: string;
        division: string;
        divisionName: string;
        color: string;
        backgroundColor: string;
        largeIcon: string;
      }[];
      assetPath: string;
    }[];
  };
  // 4 is the most newest tier updates.
  json.data[4].tiers.forEach(async (v) => {
    if (v.largeIcon) {
      const url = v.largeIcon;
      const fileName = `${v.tier}.png`;
      const filePath = path.resolve(
        __dirname,
        "..",
        "frontend",
        "public",
        "tiers",
        fileName
      );
      const iconRes = await fetch(url);

      if (!iconRes.ok) {
        throw new Error(`Failed to download ${url}: ${iconRes.status}`);
      }

      const arrayBuffer = await iconRes.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await writeFile(filePath, buffer);
      console.log(`Saved ${fileName} to icons folder`);
    }
  });
}

generateTiers();

export {};
