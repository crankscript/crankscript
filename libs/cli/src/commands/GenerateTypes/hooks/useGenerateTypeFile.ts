import { writeFileSync } from 'node:fs';
import { useMemo } from 'react';
import {
    InterfaceDeclaration,
    ModuleDeclaration,
    Project,
    SourceFile,
} from 'ts-morph';
import { generateNamespace } from '@/cli/commands/GenerateTypes/fn/generateNamespace.js';
import { createTypeProvider } from '@/cli/commands/GenerateTypes/utils/createTypeProvider.js';
import { ApiDefinitions, CheckListItem } from '@/cli/types.js';

export const useGenerateTypeFile = (
    path: string,
    definitions: ApiDefinitions | null,
    typeProvider: ReturnType<typeof createTypeProvider> | null
) => {
    const generateTypeFile = useMemo(() => {
        return {
            waitingDescription: 'Waiting to generate the type file...',
            errorDescription: 'Failed to generate the type file',
            finishedDescription: () => 'Type file generated',
            runningDescription: 'Generating the type file...',
            runner: async () => {
                if (!definitions) {
                    throw new Error('Definitions are not set');
                }

                if (!typeProvider) {
                    throw new Error('Type provider is not set');
                }

                const project = new Project();
                const typeFile = project.createSourceFile(path, '', {
                    overwrite: true,
                });
                typeFile.addStatements(typeProvider.getGlobalStatements());

                const subjects = new Map<
                    string,
                    SourceFile | ModuleDeclaration
                >();
                const typeSubjects = new Map<string, InterfaceDeclaration>();
                subjects.set('root', typeFile);

                Object.keys(definitions.namespaces).forEach((namespace) => {
                    const namespaceDescription =
                        definitions.namespaces[namespace];
                    const namespaces = namespace.split('.');
                    generateNamespace(
                        namespaceDescription,
                        namespaces,
                        subjects,
                        typeSubjects,
                        typeProvider,
                        definitions.types
                    );
                });

                writeFileSync(
                    path,
                    typeFile
                        .getFullText()
                        .replace('/** Playdate SDK */', '\n/** Playdate SDK */')
                );
            },
            ready: definitions !== null && typeProvider !== null,
        } satisfies CheckListItem<void>;
    }, [definitions, typeProvider]);

    return {
        generateTypeFile,
    };
};
