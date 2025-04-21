export type ValidatedEntryPoint = {
    __validated: true;

    /**
     * The path to a directory containing a tsconfig.json file
     */
    projectPath: string;
    /**
     * The entry point to transpile. Must be within the path.
     */
    entryFile: string;
};
