import mantine from "eslint-config-mantine";
import tseslint from "typescript-eslint";

export default tseslint.config(...mantine, {
  rules: {
    "no-console": "off",
  },
  ignores: ["**/*.{mjs,cjs,js,d.ts,d.mts}", "./.storybook/main.ts"],
});
