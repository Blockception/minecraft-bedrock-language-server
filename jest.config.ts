import type { Config } from 'jest';

/** @type {import('jest').Config} */
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
  testMatch: ['**/*.{test,spec}.ts'],
};

export default config;
