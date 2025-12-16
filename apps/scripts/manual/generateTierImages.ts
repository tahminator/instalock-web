import { Buffer } from "buffer";
import { writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

async function generateTierImages() {
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
      const fileName = `${v.tier}.webp`;
      const filePath = path.resolve(
        __dirname,
        "..",
        "..",
        "frontend",
        "public",
        "tiers",
        fileName,
      );
      const iconRes = await fetch(url);

      if (!iconRes.ok) {
        throw new Error(`Failed to download ${url}: ${iconRes.status}`);
      }

      const arrayBuffer = await iconRes.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const webpBuffer = await sharp(buffer)
        .webp({ quality: 80 }) // Set quality for compression
        .toBuffer();
      await writeFile(filePath, webpBuffer);
      console.log(`Saved ${fileName} to icons folder`);
    }
  });
}

generateTierImages();
