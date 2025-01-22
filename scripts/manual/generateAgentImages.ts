import { Buffer } from "buffer";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateAgentImages() {
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
  // 4 is the most newest tier updates.
  json.data.forEach(async (v) => {
    if (v.isPlayableCharacter) {
      const url = v.displayIcon;
      const fileName = `${v.displayName.replace("/", "")}.webp`;
      const filePath = path.resolve(
        __dirname,
        "..",
        "..",
        "frontend",
        "public",
        "agents",
        fileName
      );
      const iconRes = await fetch(url);

      if (!iconRes.ok) {
        throw new Error(`Failed to download ${url}: ${iconRes.status}`);
      }

      const arrayBuffer = await iconRes.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // await mkdir(filePath, { recursive: true });

      const webpBuffer = await sharp(buffer)
        .webp({ quality: 80 }) // Set quality for compression
        .toBuffer();
      await writeFile(filePath, webpBuffer);
      console.log(`Saved ${fileName} to icons folder`);
    }
  });
}

generateAgentImages();
