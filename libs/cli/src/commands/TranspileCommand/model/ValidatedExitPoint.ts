export type ValidatedExitPoint = {
    __validated: true;

    /**
     * The path to a directory containing a tsconfig.json file
     */
    projectPath: string;
    /**
     * The path to the output directory. Must be within the project path.
     */
    exitPath: string;
};
