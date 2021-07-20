module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "src", "."],
  modulePathIgnorePatterns: ["<rootDir>/tests/integration", "<rootDir>/build"],
  testEnvironmentOptions: {
    NODE_ENV: "test",
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ["node_modules", "src/config", "src/app.ts", "tests"],
  coverageReporters: ["text", "lcov", "clover", "html"],
};
