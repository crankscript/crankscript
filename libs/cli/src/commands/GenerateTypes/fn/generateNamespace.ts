import {
    InterfaceDeclaration,
    MethodSignatureStructure,
    ModuleDeclaration,
    SourceFile,
    VariableDeclarationKind,
} from 'ts-morph';
import { generateFunction } from '@/cli/commands/GenerateTypes/fn/generateFunction.js';
import { createTypeProvider } from '@/cli/commands/GenerateTypes/utils/createTypeProvider.js';
import {
    FunctionDescription,
    PlaydateNamespace,
    PlaydateType,
} from '@/cli/types.js';

export const generateNamespace = (
    namespaceDescription: PlaydateNamespace,
    namespaces: string[],
    subjects: Map<string, SourceFile | ModuleDeclaration>,
    typeSubjects: Map<string, InterfaceDeclaration>,
    typeProvider: ReturnType<typeof createTypeProvider>,
    types: Record<string, PlaydateType>
) => {
    const subjectName = namespaces.slice(0, -1).join('.');
    const namespaceName = namespaces[namespaces.length - 1];
    const isRoot = namespaces.length === 1 && namespaces[0] === 'playdate';
    const subject =
        namespaces.length === 1
            ? subjects.get('root')
            : subjects.get(subjectName);

    if (!subject) {
        return;
    }

    const module = subject.addModule({
        name: namespaceName,
    });

    const addMethods = (
        typeName: string,
        subj: ModuleDeclaration,
        methods: FunctionDescription[]
    ) => {
        const interfaceName = typeName
            .split('.')
            .map((name) => name[0].toUpperCase() + name.slice(1))
            .join('');
        const typeInterface = subj.addInterface({
            name: interfaceName,
        });
        typeSubjects.set(typeName, typeInterface);

        for (const func of methods) {
            const parameters = typeProvider.getParameters(func);

            typeInterface.addMethod({
                name: func.name,
                docs: [func.docs],
                returnType: typeProvider.getFunctionReturnType(func),
                parameters,
                ...(typeProvider.getFunctionOverrideOptions(
                    func
                ) as Partial<MethodSignatureStructure>),
            });
        }
    };

    if (isRoot) {
        module.addJsDoc({
            description: 'Playdate SDK',
        });
        module.addStatements(typeProvider.getStatements());

        Object.keys(types).forEach((eachType) => {
            addMethods(eachType, module, types[eachType].methods);
        });
    }

    subjects.set(namespaces.join('.'), module);

    if (namespaceDescription.methods.length > 0) {
        addMethods(
            namespaces.join('.'),
            subjects.get('playdate') as ModuleDeclaration,
            namespaceDescription.methods
        );
    }

    for (const property of namespaceDescription.properties) {
        const propertyDetails = typeProvider.getPropertyDetails(property);
        if (!propertyDetails.isStatic) {
            const typeName = namespaces.join('.');

            if (typeSubjects.has(typeName)) {
                const typeInterface = typeSubjects.get(
                    typeName
                ) as InterfaceDeclaration;

                typeInterface.addProperty({
                    name: property.name,
                    type: propertyDetails.type,
                    docs: [property.docs],
                    isReadonly: propertyDetails.isReadOnly,
                });
            }

            continue;
        }

        const propertyType = propertyDetails.type;

        module.addVariableStatement({
            isExported: true,
            declarationKind: VariableDeclarationKind.Const,
            declarations: [
                {
                    name: property.name,
                    type: propertyType,
                },
            ],
        });
    }

    for (const func of namespaceDescription.functions) {
        generateFunction(func, module, typeProvider);
    }
};
