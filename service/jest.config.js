import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset({
    tsconfig: "tsconfig.test.json",
}).transform;

/** @type {import("jest").Config} **/
export default {
    testEnvironment: "node",
    transform: {
        ...tsJestTransformCfg,
    },
    moduleNameMapper: {
        "^@data/(.*)$": "<rootDir>/src/data/$1",
        "^@app/(.*)$": "<rootDir>/src/app/$1",
        "^@domain/(.*)$": "<rootDir>/src/domain/$1",
        "^@infra/(.*)$": "<rootDir>/src/infra/$1",
        "^@presentation/(.*)$": "<rootDir>/src/presentation/$1",
        "^@src/(.*)$": "<rootDir>/src/$1",
    },
};
