import { Command, Option } from 'clipanion';
import React from 'react';
import * as t from 'typanion';
import { RenderableCommand } from '@/cli/commands/RenderableCommand.js';
import { LibraryTemplateName } from '@/cli/types.js';
import { NewLib } from './components/NewLib.js';

const defaultTemplate = LibraryTemplateName.Blank;

export class NewLibCommand extends RenderableCommand {
    static override paths = [['new-lib']];

    static override usage = Command.Usage({
        description: 'Create a new crankscript library',
    });

    name = Option.String({
        name: 'name',
    });

    template = Option.String('-t,--template', defaultTemplate, {
        description: `The template to use, defaults to "${defaultTemplate}"`,
        validator: t.isEnum(LibraryTemplateName),
    });

    override render() {
        return <NewLib name={this.name} template={this.template} />;
    }
}
