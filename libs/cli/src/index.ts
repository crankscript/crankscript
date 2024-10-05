#!/usr/bin/env node --no-warnings=ExperimentalWarning

import { readFileSync } from 'fs';
import { join } from 'node:path';
import { Cli } from 'clipanion';
import { CompileCommand } from '@/cli/commands/CompileCommand/index.js';
import { DoctorCommand } from '@/cli/commands/DoctorCommand.js';
import { GenerateTypesCommand } from '@/cli/commands/GenerateTypes/index.js';
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
cli.register(CompileCommand);
cli.runExit(args);
