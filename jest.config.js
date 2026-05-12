"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @type {import('jest').Config} */
const config = {
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
    reporters: [
        ['github-actions', { silent: false }],
        'summary'
    ]
};
exports.default = config;
//# sourceMappingURL=jest.config.js.map