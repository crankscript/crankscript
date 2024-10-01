import {
    FunctionDeclarationStructure,
    ModuleDeclaration,
    SourceFile,
} from 'ts-morph';
import { createTypeProvider } from '@/cli/commands/GenerateTypes/utils/createTypeProvider.js';
import { TypescriptReservedNamed } from '@/cli/constants.js';
import { FunctionDescription } from '@/cli/types.js';

export const generateFunction = (
    func: FunctionDescription,
    subject: SourceFile | ModuleDeclaration,
    typeProvider: ReturnType<typeof createTypeProvider>
) => {
    const isReserved = TypescriptReservedNamed.includes(func.name);

    const name = isReserved ? `_${func.name}` : func.name;

    subject.addFunction({
        name,
        docs: [func.docs],
        isExported: !isReserved,
        returnType: typeProvider.getFunctionReturnType(func),
        parameters: typeProvider.getParameters(func),
        ...((typeProvider.getFunctionOverrideOptions(
            func
        ) as Partial<FunctionDeclarationStructure>) ?? {}),
    });

    if (isReserved) {
        subject.addExportDeclaration({
            namedExports: [
                {
                    name,
                    alias: func.name,
                },
            ],
        });
    }
};
