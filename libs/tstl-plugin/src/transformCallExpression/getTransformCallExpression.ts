import * as ts from 'typescript';
import { Expression, FunctionVisitor } from 'typescript-to-lua';
import { ImportMap } from '../ImportMap';

export const getTransformCallExpression = (importMap: ImportMap) => {
    return ((node, context) => {
        if (ts.isIdentifier(node.expression)) {
            importMap.processName(node.expression.escapedText.toString());
        }

        if (
            ts.isPropertyAccessExpression(node.expression) &&
            node.expression.expression.kind === ts.SyntaxKind.SuperKeyword
        ) {
            return context.superTransformExpression(node);
        }

        if (node.expression.kind === ts.SyntaxKind.SuperKeyword) {
            const superPropertyAccess =
                ts.factory.createPropertyAccessExpression(
                    ts.factory.createSuper(),
                    'init',
                );

            const newCallExpression = ts.factory.createCallExpression(
                superPropertyAccess,
                undefined,
                node.arguments,
            );

            return context.superTransformExpression(newCallExpression);
        }

        const typeChecker = context.program.getTypeChecker();
        const callExpressionType = typeChecker.getTypeAtLocation(
            node.expression,
        );
        const callTypeString = typeChecker.typeToString(callExpressionType);

        if (callTypeString.startsWith('PredictFunction<')) {
            const sourceFile = node.getSourceFile();
            const fileName = sourceFile.fileName;
            const lineNumber =
                sourceFile.getLineAndCharacterOfPosition(node.getStart()).line +
                1;

            const newCallExpression = ts.factory.createCallExpression(
                node.expression,
                undefined,
                [
                    ts.factory.createStringLiteral(fileName),
                    ts.factory.createNumericLiteral(lineNumber.toString()),
                    ...node.arguments,
                ],
            );

            return context.superTransformExpression(newCallExpression);
        }

        if (ts.isPropertyAccessExpression(node.expression)) {
            const typeChecker = context.program.getTypeChecker();
            const methodType = typeChecker.getTypeAtLocation(node.expression);
            const methodTypeString = typeChecker.typeToString(methodType);

            if (methodTypeString.startsWith('PredictFunction<')) {
                const sourceFile = node.getSourceFile();
                const fileName = sourceFile.fileName;
                const lineNumber =
                    sourceFile.getLineAndCharacterOfPosition(node.getStart())
                        .line + 1;

                const newCallExpression = ts.factory.createCallExpression(
                    node.expression,
                    undefined,
                    [
                        ts.factory.createStringLiteral(fileName),
                        ts.factory.createNumericLiteral(lineNumber.toString()),
                        ...node.arguments,
                    ],
                );

                return context.superTransformExpression(newCallExpression);
            }
        }

        if (
            ts.isIdentifier(node.expression) &&
            node.expression.escapedText === 'require'
        ) {
            const normalNode = context.superTransformExpression(
                node,
            ) as unknown as {
                expression: { text: string; originalName: string };
            };

            normalNode.expression.text = 'import';
            normalNode.expression.originalName = 'import';

            return normalNode as unknown as Expression;
        } else if (
            ts.isIdentifier(node.expression) &&
            node.expression.escapedText === 'predict'
        ) {
            const sourceFile = node.getSourceFile();
            const fileName = sourceFile.fileName;
            const lineNumber =
                sourceFile.getLineAndCharacterOfPosition(node.getStart()).line +
                1;

            const newCallExpression = ts.factory.createCallExpression(
                node.expression,
                undefined,
                [
                    ...node.arguments,
                    ts.factory.createStringLiteral(fileName),
                    ts.factory.createNumericLiteral(lineNumber.toString()),
                ],
            );

            return context.superTransformExpression(newCallExpression);
        } else {
            return context.superTransformExpression(node);
        }
    }) satisfies FunctionVisitor<ts.CallExpression>;
};
