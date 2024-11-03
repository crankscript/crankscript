import { readFileSync } from 'fs';
import { join } from 'node:path';
import { transpile } from '@/cli/commands/TranspileCommand/fn/transpile.js';

describe('transpile', () => {
    const testFolder = new URL('.', import.meta.url).pathname;

    describe('super calls', () => {
        const path = join(testFolder, 'test-super');
        const result = transpile(path);
        const lua = readFileSync(join(path, 'Source', 'main.lua'), 'utf-8');
        const transformedLua = lua
            .split('\n')
            .map((line) => line.trim())
            .join('');

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
    });
});
