import { Command } from 'clipanion';
import { render } from 'ink';
import { JSX } from 'react';

export abstract class RenderableCommand extends Command {
    protected abstract render(): JSX.Element;

    protected renderElement(element: JSX.Element) {
        render(element);
    }

    override async execute() {
        this.renderElement(this.render());
    }
}
