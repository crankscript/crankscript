import { Command, Option } from 'clipanion';
import React from 'react';
import * as t from 'typanion';
import { RenderableCommand } from '@/cli/commands/RenderableCommand.js';
import { TemplateName } from '@/cli/types.js';
import { New } from './components/New.js';

const defaultTemplate = TemplateName.Blank;

export class NewCommand extends RenderableCommand {
    static override paths = [['new']];

    static override usage = Command.Usage({
        description: 'Create a new crankscript project',
    });

    name = Option.String({
        name: 'name',
    });

    template = Option.String('-t,--template', defaultTemplate, {
        description: `The template to use, defaults to "${defaultTemplate}"`,
        validator: t.isEnum(TemplateName),
    });

    override render() {
        return <New name={this.name} template={this.template} />;
    }
}
