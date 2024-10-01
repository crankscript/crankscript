#!/usr/bin/env node --no-warnings=ExperimentalWarning

import { readFileSync } from 'fs';
import { join } from 'node:path';
import { Cli } from 'clipanion';
import { DoctorCommand } from '@/cli/commands/DoctorCommand.js';
import { GenerateTypesCommand } from '@/cli/commands/GenerateTypes/GenerateTypesCommand.js';
import { RootFolder } from '@/cli/constants.js';

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
