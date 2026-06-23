import * as esbuild from "esbuild";
// @ts-expect-error no types
import { importPatternPlugin } from "esbuild-plugin-import-pattern";

async function main() {
  const ctx = await esbuild.context({
    entryPoints: ["src/index.ts"],
    bundle: true,
    sourcemap: true,
    platform: "node",
    outfile: "src/index.js",
    logLevel: "info",
    format: "cjs",
    tsconfig: "./tsconfig.default.json",
    plugins: [importPatternPlugin()],
  });

  await ctx.rebuild();
  await ctx.dispose();
}

void main();
