import tseslint from "typescript-eslint";
import base from "./eslint.config.base";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

const config: ReturnType<typeof tseslint.config> = tseslint.config(...base, {
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    react: react,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/jsx-newline": [
      "error",
      {
        prevent: true,
        allowMultilines: false,
      },
    ],
    "react/jsx-key": [2, { checkFragmentShorthand: true }],
  },
});

export default config;
