import { Plugin } from 'typescript-to-lua';
import { withAutomaticImportWarning } from './withAutomaticImportWarning';
import { ImportMap } from '../ImportMap';

export const getBeforeEmit = (importMap: ImportMap) => {
    return ((_, __, ___, result) => {
        const importsString = importMap
            .map((importString) => `import "CoreLibs/${importString}"`)
            .join('\n');

        if (importsString.trim() === '') {
            return;
        }

        result[0].code = withAutomaticImportWarning(
            importsString,
            result[0].code
        );
    }) satisfies Plugin['beforeEmit'];
};
