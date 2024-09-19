import React from 'react';
import { Command, Option } from 'clipanion';
import * as t from 'typanion';
import { GenerateTypes } from './components/GenerateTypes.js';
import { PlaydateSdkVersionIdentifier } from '../../types.js';
import { AnyStrictValidator } from 'typanion';
import { EnvironmentAwareCommand } from '../EnvironmentAwareCommand/index.js';
import { Environment } from '../../environment/dto/Environment.js';

export class GenerateTypesCommand extends EnvironmentAwareCommand {
    static override paths = [['generate-types']];
    static override usage = Command.Usage({
        description: 'Generate types from the Playdate SDK documentation',
    });

    version = Option.String(
        '-v,--version',
        PlaydateSdkVersionIdentifier.FromConfig,
        {
            description: 'The version',
            validator: t.isOneOf([
                t.isLiteral(PlaydateSdkVersionIdentifier.FromConfig),
                t.matchesRegExp(
                    /^[0-9]+\.[0-9]+\.[0-9]+$/
                ) as AnyStrictValidator,
            ]),
        }
    );

    override renderWithEnvironment(environment: Environment) {
        return (
            <GenerateTypes
                version={
                    this.version === PlaydateSdkVersionIdentifier.FromConfig
                        ? environment.configuration.version
                        : this.version
                }
            />
        );
    }
}
