<div align="center">
<h1>Crankscript</h1>
<span>⚠️ This documentation is a work in progress  ⚠️</span>
</div><br>

Crankscript is a collection of tools that lets you write Playdate games in TypeScript. TypeScript code is enriched with Playdate type definitions, and transformed to Lua with [TypeScript-to-Lua](https://typescripttolua.github.io/).

> [!NOTE]
> Crankscript exists thanks to [this Playdate Dev Forum thread](https://devforum.play.date/t/playdate-sdk-with-typescript/). Special thanks to Andy for contributing the TypeScript-to-Lua plugin and the initial d.ts file, and to Orta for providing the require transformation code.

> [!NOTE]
> Disclaimer: Crankscript is not an official Playdate SDK. It is a community project that aims to make Playdate development more accessible to TypeScript developers.

> [!WARNING]
> This project is in early development. The type definitions may be incomplete or incorrect. Please report any issues you encounter.

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
