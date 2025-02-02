import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import babelParser from "@babel/eslint-parser"; // import babel parser

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),

  // Add your custom parser and parserOptions here
  {
    parser: babelParser, // specify the babel parser
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
    rules: {
      // You can also add custom ESLint rules here
    },
  },
];

export default eslintConfig;
