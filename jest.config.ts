import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['node_modules', 'coverage'],
  coverageProvider: 'v8',
  testEnvironment: 'node',
  roots: ['<rootDir>/packages', '<rootDir>/ide'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/test/**/*.test.ts', '**/test/**/*.spec.ts'],
};

export default config;
