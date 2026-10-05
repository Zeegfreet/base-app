import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        plugins: { js, "simple-import-sort": simpleImportSort },
        extends: ["js/recommended"],
        languageOptions: { globals: globals.node },
        rules: {
            eqeqeq: ["error", "always", { null: "ignore" }],
            curly: ["error", "all"],
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "no-var": "error",
            "prefer-const": "error",
            "object-shorthand": "error",
            "prefer-template": "error",
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
            "quotes": ["warn", "double"],
            "indent": ["warn", 4],
            "semi": "warn",
            "no-multiple-empty-lines": ["warn", { "max": 1, "maxEOF": 0 }],
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
        },
    },
    tseslint.configs.recommended,
    {
        files: ["**/*.{ts,mts,cts}"],
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            "@typescript-eslint/no-namespace": "off",
        },
    },
]);
