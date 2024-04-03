/** * Docs: https://jestjs.io/docs/configuration */

import path from "path";
import type { Config } from "jest";

const config: Config = {
  cacheDirectory: path.join(process.env.LOCALAPPDATA || __dirname, "Temp", "jest"),
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: path.join(__dirname, "coverage"),
  coveragePathIgnorePatterns: ["\\\\node_modules\\\\"],
  coverageProvider: "babel",
  coverageReporters: ["json", "text", "lcov", "clover"],
  maxWorkers: "20%",
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["ts", "js", "json"],
  preset: "ts-jest",
  reporters: [],
  rootDir: path.join(__dirname, "src"),
  testPathIgnorePatterns: ["\\\\node_modules\\\\"],
  testRegex: ["\\.test\\.[tj]s?$"],
  testRunner: "jest-circus/runner",
  watchman: true
};

export default config;
