import { Diagnostic, formatDiagnosticsWithColorAndContext } from 'typescript';

export const getErrorMessage = (diagnostics: readonly Diagnostic[]) => {
    return formatDiagnosticsWithColorAndContext(diagnostics, {
        getCurrentDirectory: () => process.cwd(),
        getCanonicalFileName: fileName => fileName,
        getNewLine: () => '\n',
    });
};
