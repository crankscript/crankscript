import { readFileSync } from 'fs';
import { join } from 'node:path';
import { transpile } from '@/cli/commands/TranspileCommand/fn/transpile.js';
import { validateEntryPoint } from '@/cli/commands/TranspileCommand/fn/validateEntryPoint.js';
import { validateExitPoint } from '@/cli/commands/TranspileCommand/fn/validateExitPoint.js';

const testFolder = new URL('.', import.meta.url).pathname;

const runTranspilation = (name: string) => {
    const path = join(testFolder, `test-${name}`);
    const result = transpile({
        entryPoint: validateEntryPoint({
            projectPath: path,
            entryFile: join(path, 'src', 'index.ts'),
        }),
        exitPoint: validateExitPoint({
            projectPath: path,
            exitFile: join(path, 'Source', 'main.lua'),
        }),
    });
    const lua = readFileSync(join(path, 'Source', 'main.lua'), 'utf-8');
    const transformedLua = lua
        .split('\n')
        .map(line => line.trim())
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
                'B.super.init(firstArgument,getString(nil) or "hello")',
            );
        });

        it('should set instance properties in the constructor', () => {
            expect(transformedLua).toContain(
                'self.firstArgument = firstArgument',
            );
            expect(transformedLua).not.toContain(
                'self.secondArgument = secondArgument',
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

    describe('static', () => {
        const { result, transformedLua } = runTranspilation('static');

        it('should transpile without errors', () => {
            expect(result.diagnostics).toEqual([]);
        });

        it('should set static field on class', () => {
            expect(transformedLua).toContain('A.staticField = "staticField"');
        });
    });

    describe('implicit constructor', () => {
        const { result, transformedLua } = runTranspilation(
            'implicit-constructor',
        );

        it('should transpile without errors', () => {
            expect(result.diagnostics).toEqual([]);
        });

        it('should transpile classes without a constructor', () => {
            expect(transformedLua).toContain('class("A")');
        });
    });

    describe('default parameters', () => {
        const { result, transformedLua } =
            runTranspilation('default-parameters');

        it('should transpile without errors', () => {
            expect(result.diagnostics).toEqual([]);
        });

        it('should transpile default class parameters', () => {
            expect(transformedLua).toContain('if b == nil then');
            expect(transformedLua).toContain('b = 5');
        });

        it('should transpile default function parameters', () => {
            expect(transformedLua).toContain('if y == nil then');
            expect(transformedLua).toContain('y = 5');
        });

        it('should transpile default method parameters', () => {
            expect(transformedLua).toContain('if d == nil then');
            expect(transformedLua).toContain('d = 5');
        });
    });
});
