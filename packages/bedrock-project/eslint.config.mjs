import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    files: ["**/*.ts"],
    ignores: [
      "coverage/",
      "coverage/*",
      "coverage/**/*",
      "lib/",
      "lib/*",
      "lib/**/*",
      "node_modules/",
      "node_modules/*",
    ],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    plugins: {
      jest: {},
    },
  },
  {
    rules: {
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-case-declarations": "off",
    },
  }
);