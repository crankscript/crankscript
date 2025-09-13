import type { Config } from 'jest';

export default {
    displayName: 'tstl-plugin',
    preset: '../../node_modules/ts-jest/presets/default/jest-preset.js',
    resolver: 'ts-jest-resolver',
    transform: {},
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleFileExtensions: ['ts', 'js', 'html'],
    testEnvironment: 'node',
    coverageDirectory: '../coverage/libs',
    moduleNameMapper: {},
} satisfies Config;
