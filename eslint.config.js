import mantine from "eslint-config-mantine";
import reactRules from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(...mantine, ...reactRules, {
  plugins: ["react-hooks"],
  rules: {
    "no-console": "off",
  },
  ignores: ["**/*.{mjs,cjs,js,d.ts,d.mts}", "./.storybook/main.ts"],
});
