#!/usr/bin/env tsx
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const jsonPath = join(__dirname, '../libs/cli/src/data/2.7.6.json');
const data = JSON.parse(readFileSync(jsonPath, 'utf8'));

const generateConstantDebugCode = () => {
    const printStatements: string[] = [];
    const collectStatements: string[] = [];

    printStatements.push(`    const results: Record<string, any[]> = {};`);
    printStatements.push(`    `);

    for (const [namespace, constants] of Object.entries(data.constants)) {
        if (!Array.isArray(constants)) continue;

        collectStatements.push(`    results['${namespace}'] = [];`);
        printStatements.push(`    print('=== ${namespace} ===');`);

        for (const constant of constants) {
            const name =
                typeof constant === 'string' ? constant : constant.name;
            const expectedType =
                typeof constant === 'string' ? '0' : constant.type;

            const fullPath = `${namespace}.${name}`;
            printStatements.push(
                `    print('${name} =', ${fullPath}, '(expected: ${expectedType})');`,
            );
            collectStatements.push(
                `    results['${namespace}'].push({ name: '${name}', type: String(${fullPath}) });`,
            );
        }

        printStatements.push(`    print('');`);
    }

    return {
        printCode: printStatements.join('\n'),
        collectCode: collectStatements.join('\n'),
    };
};

const generateExampleContent = () => {
    const { printCode, collectCode } = generateConstantDebugCode();

    return `/// <reference path="../libs/types/types/latest.d.ts" />

// This file is generated automatically by the generate-constant-debug.ts script.
// Run this example with \`crankscript simulator examples/constants.ts\`

let hasRun = false;

playdate.update = () => {
    if (!hasRun) {
        hasRun = true;
        
        print('=== PLAYDATE CONSTANTS DEBUG ===');
        print('');
        
${printCode}
        
        print('=== COLLECTING RESULTS FOR JSON ===');
        
${collectCode}
        
        print('');
        print('=== COPY-PASTE JSON OUTPUT ===');
        print('Copy the following JSON and replace the "constants" section in 2.7.6.json:');
        print('');
        print(JSON.stringify(results, null, 4));
        print('');
        print('=== DEBUG COMPLETE ===');
        
        // Exit the simulator after printing
        playdate.stop();
    }
};
`;
};

const examplePath = join(__dirname, '../examples/constants.ts');
const exampleContent = generateExampleContent();

writeFileSync(examplePath, exampleContent);

console.log(`Generated constants debug example at examples/constants.ts`);
