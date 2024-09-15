#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import packageJson from '../package.json' with { type: 'json' };

yargs(hideBin(process.argv))
    .version(packageJson.version)
    .scriptName('crankscript')
    .command('$0', 'says hi', {}, () => {
        console.info('Hi! Something here soon.');
    })
    .help()
    .parse();
