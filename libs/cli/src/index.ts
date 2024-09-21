#!/usr/bin/env node

import { join } from 'node:path';
import { Cli } from 'clipanion';
import { readFileSync } from 'fs';
import { GenerateTypesCommand } from './commands/GenerateTypes/index.js';
import { RootFolder } from './utils/dirname.js';
import { DoctorCommand } from './commands/DoctorCommand.js';

const packageJsonContents = readFileSync(
    join(RootFolder, 'package.json'),
    'utf-8'
);
const packageJson = JSON.parse(packageJsonContents);

const args = process.argv.slice(2);

const cli = new Cli({
    binaryLabel: 'crankscript',
    binaryName: 'crankscript',
    binaryVersion: packageJson.version,
});

cli.register(DoctorCommand);
cli.register(GenerateTypesCommand);
cli.runExit(args);
