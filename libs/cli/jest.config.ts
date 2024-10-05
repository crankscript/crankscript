// Reading the SWC compilation config and remove the "exclude"
// for the test files to be compiled by SWC
const swcJestConfig = { swcrc: false };

// Uncomment if using global setup/teardown files being transformed via swc
// https://nx.dev/nx-api/jest/documents/overview#global-setupteardown-with-nx-libraries
// jest needs EsModule Interop to find the default exported setup/teardown functions
// swcJestConfig.module.noInterop = false;

export default {
    displayName: 'cli',
    preset: '../../jest.preset.js',
    transform: {
        '^.+\\.[tj]s$': ['@swc/jest', swcJestConfig],
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    testEnvironment: 'node',
    coverageDirectory: '../coverage/libs',
};
