import { ModuleDeclaration, SourceFile } from 'ts-morph';
import { TypescriptReservedNamed } from '@/cli/constants.js';
import { PlaydateNamespace } from '@/cli/types.js';

export const generateNamespace = (
    subject: SourceFile | ModuleDeclaration,
    namespace: string,
    namespaceDescription: PlaydateNamespace,
    nextNamespaces: string[]
) => {
    const module = subject.addModule({
        name: namespace.trim(),
    });

    if (nextNamespaces.length) {
        generateNamespace(
            module,
            nextNamespaces[0],
            namespaceDescription,
            nextNamespaces.slice(1)
        );
    } else {
        for (const func of namespaceDescription.functions) {
            const isReserved = TypescriptReservedNamed.includes(func.name);

            const name = isReserved ? `_${func.name}` : func.name;

            module.addFunction({
                name,
                docs: [func.docs],
                isExported: !isReserved,
            });

            if (isReserved) {
                module.addExportDeclaration({
                    namedExports: [
                        {
                            name,
                            alias: func.name,
                        },
                    ],
                });
            }
        }
    }
};
