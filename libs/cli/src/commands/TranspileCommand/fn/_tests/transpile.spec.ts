import { readFileSync } from 'fs';
import { join } from 'node:path';
import { transpile } from '@/cli/commands/TranspileCommand/fn/transpile.js';

const testFolder = new URL('.', import.meta.url).pathname;

const runTranspilation = (name: string) => {
    const path = join(testFolder, `test-${name}`);
    const result = transpile(path);
    const lua = readFileSync(join(path, 'Source', 'main.lua'), 'utf-8');
    const transformedLua = lua
        .split('\n')
        .map((line) => line.trim())
        .join('');

    return {
        result,
        transformedLua,
    };
};

describe('transpile', () => {
    describe('automatic imports', () => {
        const { result, transformedLua } =
            runTranspilation('automatic-imports');

        it('should transpile without errors', () => {
            expect(result.diagnostics).toEqual([]);
        });

        it('should add import statements', () => {
            expect(transformedLua).toContain('import "CoreLibs/object"');
        });
    });

    describe('super calls', () => {
        const { result, transformedLua } = runTranspilation('super');

        it('should transpile without errors', () => {
            expect(result.diagnostics).toEqual([]);
        });

        it('should not call the super constructor when the class does not extend another', () => {
            expect(transformedLua).not.toContain('A.super.init()');
        });

        it('should call the super constructor with the correct arguments', () => {
            expect(transformedLua).toContain(
                'B.super.init(firstArgument,getString(nil) or "hello")'
            );
        });

        it('should set instance properties in the constructor', () => {
            expect(transformedLua).toContain(
                'self.firstArgument = firstArgument'
            );
            expect(transformedLua).not.toContain(
                'self.secondArgument = secondArgument'
            );
        });
    });

    describe('builtins', () => {
        const { result, transformedLua } = runTranspilation('builtins');

        describe('Map', () => {
            it('should transpile without errors', () => {
                expect(result.diagnostics).toEqual([]);
            });

            it('should instantiate Map correctly', () => {
                expect(transformedLua).toContain('test = __TS__New(Map)');
            });
        });
    });
});
