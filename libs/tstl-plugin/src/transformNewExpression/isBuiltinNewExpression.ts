import * as ts from 'typescript';

export const isBuiltinNewExpression = (
    node: ts.NewExpression,
    typeChecker: ts.TypeChecker
) => {
    if (!node.expression) return false;

    const type = typeChecker.getTypeAtLocation(node.expression);

    const symbol = type.getSymbol();
    if (!symbol) return false;

    const declarations = symbol.getDeclarations();
    if (!declarations || declarations.length === 0) return false;

    return declarations.some((decl) => {
        const sourceFile = decl.getSourceFile();
        return sourceFile.fileName.includes('node_modules/typescript/lib');
    });
};
