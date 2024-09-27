import { join } from 'node:path';
import * as process from 'node:process';
import { Command, Option } from 'clipanion';
import React from 'react';
import * as t from 'typanion';
import { AnyStrictValidator } from 'typanion';
import { RenderableCommand } from '@/cli/commands/RenderableCommand.js';
import { PlaydateSdkVersionIdentifier } from '@/cli/types.js';
import { GenerateTypes } from './components/GenerateTypes.js';

export class GenerateTypesCommand extends RenderableCommand {
    static override paths = [['generate-types']];
    static override usage = Command.Usage({
        description: 'Generate types from the Playdate SDK documentation',
    });

    output = Option.String('-o,--output', process.cwd(), {
        description: `Where to generate the playdate.d.ts file. Defaults to the current working directory ("${process.cwd()}")`,
        validator: t.isString(),
    });

    version = Option.String({
        name: 'version',
        validator: t.isOneOf([
            t.isLiteral(PlaydateSdkVersionIdentifier.Latest),
            t.matchesRegExp(/^[0-9]+\.[0-9]+\.[0-9]+$/) as AnyStrictValidator,
        ]),
    });

    override render() {
        const output = this.output.endsWith('.d.ts')
            ? this.output
            : join(this.output, 'playdate.d.ts');

        return <GenerateTypes output={output} version={this.version} />;
    }
}
