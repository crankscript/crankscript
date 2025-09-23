<h1 align="center">CrankScript</h1>

<p align="center">
  <img src="https://github.com/crankscript/crankscript/actions/workflows/ci.yml/badge.svg" alt="CI">
  <img src="https://img.shields.io/npm/v/crankscript.svg" alt="NPM version">
  <img src="https://img.shields.io/badge/SDK-2.7.6-FFC733" alt="SDK">
</p>

Crankscript is a collection of tools that lets you write Playdate games in TypeScript. TypeScript code is enriched with Playdate type definitions, and transformed to Lua with [TypeScript-to-Lua](https://typescripttolua.github.io/).

> [!WARNING]
> This project is in an early development stage. The type definitions may be incomplete or incorrect. Please report any issues you encounter. Class transpilation is especially unstable at the moment; an improved test coverage is underway.

https://github.com/user-attachments/assets/ea667a8b-754b-4b79-8f9e-8fe608228ed9

## Getting started

The `crankscript` cli application is the main entry point for using Crankscript. To create a new project, use the command:

```sh
npx crankscript@latest new <project-name>
```

Optionally, a template can be specified:

```sh
npx crankscript@latest new <project-name> --template <template-name>
```

However, at the moment, only the "blank" template is available.

After that, install all dependencies with:

```sh
cd <project-name>
npm install
```

Build the project and run it in the Playdate Simulator with:

```sh
npm run simulator
```

That's it!

## A note about platform support

A more detailed documentation is in progress. For now, here's an important note about platform support.

The `simulator` command supports `--watch`. In MacOS, when a change is detected, the simulator is launched again. This will not open a new simulator window, but will instead reload the game in the existing window.

This behavior is not supported in Linux or Windows, so a workaround is needed. In those platforms, it is possible to use the following command:

```sh
npm run simulator -- --watch --recompile-only
```

This will recompile the project when a change is detected, but the simulator will not be reopened. In order to see the changes, a reload must be triggered from the Lua side.

The package `@crankscript/core` provides a helper function which can do just that. It will check the latest modified time of "main.pdz" at regular intervals, and if a change is detected, it will reload the game using `playdate.file.run`.

To use the utility, simply wrap your update function with it.

```ts
import { withReload } from '@crankscript/core';

playdate.update = withReload(
    () => {
        // Your update code here
    },
    {
        // It is possible to specify the interval in milliseconds
        interval: 1000, // this is the default interval
    },
);
```

Please report any issues you encounter.

## Credits and legal

> [!NOTE]
> Crankscript exists thanks to [this Playdate Dev Forum thread](https://devforum.play.date/t/playdate-sdk-with-typescript/). Special thanks to Andy for contributing the TypeScript-to-Lua plugin and the initial d.ts file, and to Orta for providing the require transformation code.

> [!NOTE]
> This repository uses a headless Playdate Simulator to run the Lua test suite.
> The CI configuration is based on the clever [workflow file](https://github.com/samdze/playdate-nim/blob/main/.github/workflows/build.yml) from 
> [@samdze](https://github.com/samdze)'s [playdate-nim](https://github.com/samdze/playdate-nim).

> [!NOTE]
> Crankscript is not affiliated with Playdate or Panic Inc. in any way.
> The documentation excerpts present in this repository are owned by Panic Inc. and are provided here solely for reference
> within the context of Playdate game development. I do not claim ownership of any part of the documentation.
>
> If you are using this project, you must also comply with the Playdate SDK license, available at https://play.date/dev/sdk-license/.
