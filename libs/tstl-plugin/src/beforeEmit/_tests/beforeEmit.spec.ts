import { Program } from 'typescript';
import { EmitFile, EmitHost } from 'typescript-to-lua';
import { ImportMap } from '../../ImportMap';
import { getBeforeEmit } from '../getBeforeEmit';

describe('beforeEmit', () => {
    const importMap = new ImportMap();
    const beforeEmit = getBeforeEmit(importMap);
    const code = 'print("Hello, world!")';

    const runBeforeEmit = (code: string) => {
        const emitFile = [
            {
                code,
            },
        ] as unknown as EmitFile[];

        beforeEmit(
            undefined as unknown as Program,
            {},
            {} as unknown as EmitHost,
            emitFile,
        );

        return emitFile;
    };

    it('should not add automatic imports if there are none', () => {
        const result = runBeforeEmit(code);

        expect(result[0].code).toBe(code);
    });

    it('should add automatic imports', () => {
        importMap.add('graphics');

        const result = runBeforeEmit(code);

        expect(result[0].code).toContain('import "CoreLibs/graphics"');
    });
});
