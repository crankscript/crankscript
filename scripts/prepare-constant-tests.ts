#!/usr/bin/env tsx
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const jsonPath = join(__dirname, '../libs/cli/src/data/2.7.6.json');
const data = JSON.parse(readFileSync(jsonPath, 'utf8'));

const generateConstantTests = () => {
    const testCases: string[] = [];

    for (const [namespace, constants] of Object.entries(data.constants)) {
        if (!Array.isArray(constants)) continue;

        const assertions: string[] = [];

        for (const constant of constants) {
            const name =
                typeof constant === 'string' ? constant : constant.name;
            const expectedValue =
                typeof constant === 'string' ? '0' : constant.type;
            const fullPath = `${namespace}.${name}`;
            assertions.push(`        t.equals(${fullPath}, ${expectedValue});`);
        }

        testCases.push(`    suite.spec('${namespace}', (t) => {
${assertions.join('\n')}
    });`);
    }

    return testCases.join('\n\n');
};

const testFilePath = join(__dirname, '../playdate-tests/src/constants.test.ts');
const testFileContent = readFileSync(testFilePath, 'utf8');
const generatedTests = generateConstantTests();
const startMarker = '    // @crankscript-constant-tests-start';
const endMarker = '    // @crankscript-constant-tests-end';
const startIndex = testFileContent.indexOf(startMarker);
const endIndex = testFileContent.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
    throw new Error('Could not find test markers in constants.test.ts');
}

const beforeMarker = testFileContent.substring(
    0,
    startIndex + startMarker.length,
);
const afterMarker = testFileContent.substring(endIndex);

const updatedContent = `${beforeMarker}
${generatedTests}
${afterMarker}`;

writeFileSync(testFilePath, updatedContent);

console.log(
    `Generated ${Object.values(data.constants).flat().length} constant tests in constants.test.ts`,
);
