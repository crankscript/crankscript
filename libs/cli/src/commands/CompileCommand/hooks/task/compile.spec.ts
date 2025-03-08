import { join } from 'node:path';
import { compile } from '@/cli/commands/CompileCommand/hooks/task/compile.js';
import { __dirname } from '@/cli/utils/dirname.js';

describe('compile', () => {
    it('should report compilation errors', async () => {
        const { stdout, stderr } = await compile({
            pdcPath: 'echo',
            target: join(__dirname, 'sample'),
        });

        expect(stderr).toBe('');
        expect(stdout).toContain(join(__dirname, 'sample', 'Source'));
        expect(stdout).toContain(join(__dirname, 'sample', 'Game.pdx'));
    });
});
