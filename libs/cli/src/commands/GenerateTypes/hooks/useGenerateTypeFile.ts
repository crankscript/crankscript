import { writeFileSync } from 'node:fs';
import { useMemo } from 'react';
import {
    ClassDeclaration,
    FunctionDeclarationStructure,
    MethodDeclarationStructure,
    ModuleDeclaration,
    Project,
    SourceFile,
} from 'ts-morph';
import { createTypeProvider } from '@/cli/commands/GenerateTypes/utils/createTypeProvider.js';
import { TypescriptReservedNamed } from '@/cli/constants.js';
import { ApiDefinitions, ApiObject, CheckListItem } from '@/cli/types.js';

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

                const globalNamespace = definitions.global;

                typeFile.addStatements(typeProvider.getGlobalStatements());

                generateNamespace(globalNamespace, typeFile, typeProvider, '');

                writeFileSync(
                    path,
                    typeFile.getFullText().replace('*/', '*/\n')
                );
            },
            ready: definitions !== null && typeProvider !== null,
        } satisfies CheckListItem<void>;
    }, [definitions, typeProvider]);

    return {
        generateTypeFile,
    };
};

const generateNamespace = (
    apiObject: ApiObject,
    incomingSubject: SourceFile | ModuleDeclaration,
    typeProvider: ReturnType<typeof createTypeProvider>,
    namespace: string,
    name?: string
) => {
    let subject = incomingSubject;
    const fullNamespaceName = [namespace, name].filter(Boolean).join('.');

    if (name) {
        subject = incomingSubject.addModule({
            name,
        });
    }

    if (name === 'playdate') {
        subject.addStatements(typeProvider.getStatements());
    }

    for (const func of apiObject.functions) {
        const isFunctionNameReserved = TypescriptReservedNamed.includes(
            func.name
        );
        const resolvedName = `_${func.name}`;
        const parameters = typeProvider.getParameters(func);

        subject.addFunction({
            name: isFunctionNameReserved ? resolvedName : func.name,
            docs: [func.docs],
            parameters,
            returnType: typeProvider.getFunctionReturnType(func),
            isExported: !!name,
            ...(typeProvider.getFunctionOverrideOptions(
                func
            ) as FunctionDeclarationStructure),
        });

        if (isFunctionNameReserved) {
            subject.addExportDeclaration({
                namedExports: [
                    {
                        name: resolvedName,
                        alias: func.name,
                    },
                ],
            });
        }
    }

    let propertiesSubject: ClassDeclaration | null = null;

    if (name && apiObject.methods.length > 0) {
        const typeClass = incomingSubject.addClass({
            name,
            ...typeProvider.getClassOptions(fullNamespaceName),
        });
        propertiesSubject = typeClass;

        for (const method of apiObject.methods) {
            const parameters = typeProvider.getParameters(method);

            typeClass.addMethod({
                name: method.name,
                docs: [method.docs],
                parameters,
                returnType: typeProvider.getFunctionReturnType(method),
                ...(typeProvider.getFunctionOverrideOptions(
                    method
                ) as Partial<MethodDeclarationStructure>),
            });
        }
    }

    for (const property of apiObject.properties) {
        const propertyDetails = typeProvider.getPropertyDetails(property);

        if (propertiesSubject) {
            propertiesSubject.addProperty({
                name: property.name,
                docs: [property.docs],
                type: propertyDetails.type,
                isStatic: propertyDetails.isStatic,
                isReadonly: propertyDetails.isReadOnly,
            });
        } else {
            subject.addVariableStatement({
                docs: [property.docs],
                declarations: [
                    {
                        name: property.name,
                        type: propertyDetails.type,
                    },
                ],
            });
        }
    }

    for (const eachNamespace of Object.entries(apiObject.namespaces)) {
        generateNamespace(
            eachNamespace[1],
            subject,
            typeProvider,
            fullNamespaceName,
            eachNamespace[0]
        );
    }
};
