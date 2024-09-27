import { getApiDefinitions } from '@/cli/commands/GenerateTypes/fn/getApiDefinitions.js';
import { parseFunctionSignature } from '@/cli/commands/GenerateTypes/fn/parseFunctionSignature.js';

const getDescriptions = (...signatures: string[]) => {
    return signatures.map((signature) => ({
        ...parseFunctionSignature(signature),
        docs: 'docs',
    }));
};

describe('getApiDefinitions', () => {
    it('should recognize namespaces', () => {
        const functions = getDescriptions(
            'namespace1.namespace2.functionName()' // no self, should be a namespace
        );
        const result = getApiDefinitions(functions);

        expect(result.namespaces).toHaveProperty('namespace1');
        expect(result.namespaces['namespace1']).toHaveProperty('functions');
        expect(
            result.namespaces['namespace1.namespace2'].functions[0].name
        ).toBe('functionName');
    });

    it('should propagate namespace status to parent', () => {
        const functions = getDescriptions(
            'parentNamespace.childNamespace.functionName()' // no self, should mark both as namespaces
        );
        const result = getApiDefinitions(functions);

        expect(result.namespaces).toHaveProperty('parentNamespace');
        expect(
            result.namespaces['parentNamespace.childNamespace'].functions[0]
                .name
        ).toBe('functionName');
    });

    it('should recognize types for methods only', () => {
        const functions = getDescriptions(
            'typeName:methodName()', // method, so it should be a type, not a namespace
            'typeName.subType:anotherMethod()' // another method, confirming it's a type
        );
        const result = getApiDefinitions(functions);

        expect(result.types).toHaveProperty('typeName');
        expect(result.types['typeName'].methods[0].name).toBe('methodName');
        expect(result.types['typeName.subType'].methods[0].name).toBe(
            'anotherMethod'
        );
    });

    it('should differentiate between namespaces and types', () => {
        const functions = getDescriptions(
            'namespaceName.functionName()', // no self, it's a namespace
            'namespaceName.typeName:methodName()' // method, so typeName is a type
        );
        const result = getApiDefinitions(functions);

        expect(result.namespaces).toHaveProperty('namespaceName');
        expect(result.types).toHaveProperty(['namespaceName.typeName']);
        expect(result.types['namespaceName.typeName'].methods[0].name).toBe(
            'methodName'
        );
    });

    it('should handle complex cases with nested namespaces and types', () => {
        const functions = getDescriptions(
            'grandparentNamespace.parentNamespace.childNamespace.functionName()', // no self, marks namespaces
            'grandparentNamespace.parentNamespace.childNamespace:typeMethod()' // method, type within a namespace
        );
        const result = getApiDefinitions(functions);

        // Check namespaces
        expect(result.namespaces).toHaveProperty('grandparentNamespace');
        expect(
            result.namespaces['grandparentNamespace.parentNamespace']
        ).toBeDefined();
        expect(
            result.namespaces[
                'grandparentNamespace.parentNamespace.childNamespace'
            ]
        ).toBeDefined();
        expect(
            result.namespaces[
                'grandparentNamespace.parentNamespace.childNamespace'
            ].functions[0].name
        ).toBe('functionName');
    });
});
