#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const packageJsonContents = readFileSync(
    join(__dirname, '..', 'package.json'),
    'utf-8'
);
const packageJson = JSON.parse(packageJsonContents);

yargs(hideBin(process.argv))
    .version(packageJson.version)
    .scriptName('crankscript')
    .command('hello', 'says hello', {}, () => {
        console.info('Hello.');
    })
    .command('$0', 'says hi', {}, () => {
        console.info('Hi! Something here soon.');
    })
    .help()
    .parse();
