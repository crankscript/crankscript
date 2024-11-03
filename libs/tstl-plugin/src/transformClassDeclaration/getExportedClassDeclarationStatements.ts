import * as ts from 'typescript';
import * as tstl from 'typescript-to-lua';

export const getExportedClassDeclarationStatements = (
    className: tstl.Identifier,
    declaration: ts.ClassLikeDeclaration
) => {
    if (
        'localSymbol' in declaration &&
        declaration.localSymbol &&
        typeof declaration.localSymbol === 'object' &&
        'exportSymbol' in declaration.localSymbol &&
        declaration.localSymbol.exportSymbol &&
        typeof declaration.localSymbol.exportSymbol === 'object' &&
        'escapedName' in declaration.localSymbol.exportSymbol &&
        typeof declaration.localSymbol.exportSymbol.escapedName === 'string'
    ) {
        const escapedName = declaration.localSymbol.exportSymbol.escapedName;

        return [
            tstl.createAssignmentStatement(
                tstl.createTableIndexExpression(
                    tstl.createIdentifier('____exports'),
                    tstl.createStringLiteral(escapedName)
                ),
                className
            ),
        ];
    }

    return [];
};
