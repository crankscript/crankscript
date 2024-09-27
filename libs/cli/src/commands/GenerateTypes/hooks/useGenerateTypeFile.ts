import { useMemo } from 'react';
import { Project } from 'ts-morph';
import { generateNamespace } from '@/cli/commands/GenerateTypes/fn/generateNamespace.js';
import { CheckListItem, ApiDefinitions } from '@/cli/types.js';

export const useGenerateTypeFile = (
    path: string,
    definitions: ApiDefinitions | null
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

                const project = new Project();
                const typeFile = project.createSourceFile(path, '', {
                    overwrite: true,
                });

                typeFile.addStatements(
                    '/// <reference types="lua-types/5.4" />'
                );

                for (const constantDefinition of definitions.constants) {
                    typeFile.addEnum({
                        name: constantDefinition.name,
                        docs: [constantDefinition.docs],
                        isConst: true,
                        isExported: true,
                        members: constantDefinition.values.map((value) => ({
                            name: value.name,
                            docs: [value.docs],
                            value: value.value,
                        })),
                    });
                }

                Object.keys(definitions.namespaces).forEach((namespace) => {
                    const namespaceDescription =
                        definitions.namespaces[namespace];
                    const namespaces = namespace.split('.');
                    generateNamespace(
                        typeFile,
                        namespaces[0],
                        namespaceDescription,
                        namespaces.slice(1)
                    );
                });

                typeFile.saveSync();
            },
            ready: definitions !== null,
        } satisfies CheckListItem<void>;
    }, [definitions]);

    return {
        generateTypeFile,
    };
};
