import type { Config } from 'jest';

// Uncomment if using global setup/teardown files being transformed via swc
// https://nx.dev/nx-api/jest/documents/overview#global-setupteardown-with-nx-libraries
// jest needs EsModule Interop to find the default exported setup/teardown functions
// swcJestConfig.module.noInterop = false;
export default {
    displayName: 'cli',
    preset: '../../node_modules/ts-jest/presets/default-esm/jest-preset.js',
    resolver: 'ts-jest-resolver',
    transform: {},
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleFileExtensions: ['ts', 'js', 'html'],
    testEnvironment: 'node',
    coverageDirectory: '../coverage/libs',
    moduleNameMapper: {
        '@/cli/(.*)': '<rootDir>/src/$1',
    },
} satisfies Config;
