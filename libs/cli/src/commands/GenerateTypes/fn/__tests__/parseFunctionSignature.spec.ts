import { parseFunctionSignature } from '../parseFunctionSignature.js';

describe('parseFunctionSignature', () => {
    it('should parse global function', () => {
        const signature = 'functionName()';
        const result = parseFunctionSignature(signature);

        expect(result.name).toBe('functionName');
        expect(result.namespaces).toEqual([]);
        expect(result.hasSelf).toBe(false);
    });

    it('should parse function in a namespace', () => {
        const signature = 'namespace1.namespace2.functionName()';
        const result = parseFunctionSignature(signature);

        expect(result.name).toBe('functionName');
        expect(result.namespaces).toEqual(['namespace1', 'namespace2']);
        expect(result.hasSelf).toBe(false);
    });

    it('should parse function with self', () => {
        const signature = 'namespace1.type:functionName()';
        const result = parseFunctionSignature(signature);

        expect(result.name).toBe('functionName');
        expect(result.namespaces).toEqual(['namespace1', 'type']);
        expect(result.hasSelf).toBe(true);
    });

    it('should get parameters', () => {
        const signature = 'functionName(argument1, argument2)';
        const { parameters } = parseFunctionSignature(signature);

        expect(parameters).toHaveLength(2);
        expect(parameters[0].name).toBe('argument1');
        expect(parameters[0].required).toBe(true);
        expect(parameters[1].name).toBe('argument2');
        expect(parameters[1].required).toBe(true);
    });

    it('should recognize when there are no parameters', () => {
        const signature = 'functionName()';
        const { parameters } = parseFunctionSignature(signature);

        expect(parameters).toHaveLength(0);
    });

    it('should recognize optional parameters', () => {
        const signature = 'functionName(required, [optional])';
        const { parameters } = parseFunctionSignature(signature);

        expect(parameters).toHaveLength(2);
        expect(parameters[0].name).toBe('required');
        expect(parameters[0].required).toBe(true);
        expect(parameters[1].name).toBe('optional');
        expect(parameters[1].required).toBe(false);
    });

    it('should recognize required parameters after optional parameters', () => {
        const signature =
            'playdate.graphics.perlinArray(count, x, dx, [y, dy, z, dz, repeat, octaves, persistence])';
        const { parameters } = parseFunctionSignature(signature);

        expect(parameters).toHaveLength(10);
        expect(parameters[0].required).toBe(true);
        expect(parameters[1].required).toBe(true);
        expect(parameters[2].required).toBe(true);
        expect(parameters[3].required).toBe(false);
        expect(parameters[4].required).toBe(false);
        expect(parameters[5].required).toBe(false);
        expect(parameters[6].required).toBe(false);
        expect(parameters[7].required).toBe(false);
        expect(parameters[8].required).toBe(false);
        expect(parameters[9].required).toBe(false);
    });
});
