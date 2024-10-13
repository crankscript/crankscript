<h1 align="center">Crankscript</h1>

Crankscript is a collection of tools that lets you write Playdate games in TypeScript. TypeScript code is enriched with Playdate type definitions, and transformed to Lua with [TypeScript-to-Lua](https://typescripttolua.github.io/).

> [!NOTE]
> Crankscript exists thanks to [this Playdate Dev Forum thread](https://devforum.play.date/t/playdate-sdk-with-typescript/). Special thanks to Andy for contributing the TypeScript-to-Lua plugin and the initial d.ts file, and to Orta for providing the require transformation code.

> [!NOTE]
> Crankscript is not affiliated with Playdate or Panic Inc. in any way.

> [!WARNING]
> This project is in an early development stage. The type definitions may be incomplete or incorrect. Please report any issues you encounter.

https://github.com/user-attachments/assets/5b4165ee-82b5-46c6-9199-f58d2a3fe2af

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

<img width="595" alt="Screenshot 2024-10-12 at 23 13 56" src="https://github.com/user-attachments/assets/4b4b657e-b4b6-4f2f-893d-483d395d2cdc">

The type definitions file includes the description 
