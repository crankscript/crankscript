import { join } from 'node:path';
import * as process from 'node:process';
import { Command, Option } from 'clipanion';
import React from 'react';
import * as t from 'typanion';
import { AnyStrictValidator } from 'typanion';
import { EnvironmentAwareCommand } from '@/cli/commands/EnvironmentAwareCommand/index.js';
import { Environment } from '@/cli/environment/dto/Environment.js';
import { PlaydateSdkVersionIdentifier } from '@/cli/types.js';
import { GenerateTypes } from './components/GenerateTypes.js';

export class GenerateTypesCommand extends EnvironmentAwareCommand {
    static override paths = [['generate-types']];
    static override usage = Command.Usage({
        description: 'Generate types from the Playdate SDK documentation',
    });

    output = Option.String('-o,--output', process.cwd(), {
        description: 'Where to generate the playdate.d.ts file',
        validator: t.isString(),
    });

    version = Option.String(
        '-s,--sdk-version',
        PlaydateSdkVersionIdentifier.FromConfig,
        {
            tolerateBoolean: false,
            description: 'The version',
            validator: t.isOneOf([
                t.isLiteral(PlaydateSdkVersionIdentifier.FromConfig),
                t.isLiteral(PlaydateSdkVersionIdentifier.Latest),
                t.matchesRegExp(
                    /^[0-9]+\.[0-9]+\.[0-9]+$/
                ) as AnyStrictValidator,
            ]),
        }
    );

    override renderWithEnvironment(environment: Environment) {
        const output = this.output.endsWith('playdate.d.ts')
            ? this.output
            : join(this.output, 'playdate.d.ts');

        return (
            <GenerateTypes
                output={output}
                version={
                    this.version === PlaydateSdkVersionIdentifier.FromConfig
                        ? environment.configuration.version
                        : this.version
                }
            />
        );
    }
}
