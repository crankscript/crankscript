#!/usr/bin/env node

import { readFileSync } from 'fs';
import { join } from 'node:path';
import { Builtins, Cli } from 'clipanion';
import { CompileCommand } from '@/cli/commands/CompileCommand/index.js';
import { DoctorCommand } from '@/cli/commands/DoctorCommand.js';
import { GenerateTypesCommand } from '@/cli/commands/GenerateTypes/index.js';
import { NewCommand } from '@/cli/commands/NewCommand/NewCommand.js';
import { SimulatorCommand } from '@/cli/commands/SimulatorCommand/index.js';
import { TranspileCommand } from '@/cli/commands/TranspileCommand/index.js';
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

process.on('SIGINT', function () {
    process.exit();
});

cli.register(Builtins.HelpCommand);
cli.register(Builtins.VersionCommand);
cli.register(DoctorCommand);
cli.register(NewCommand);
cli.register(TranspileCommand);
cli.register(CompileCommand);
cli.register(GenerateTypesCommand);
cli.register(SimulatorCommand);
cli.runExit(args);
