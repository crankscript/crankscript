import * as ts from 'typescript';
import { Expression, FunctionVisitor } from 'typescript-to-lua';
import { ImportMap } from '../ImportMap';

export const getTransformCallExpression = (importMap: ImportMap) => {
    return ((node, context) => {
        if (ts.isIdentifier(node.expression)) {
            importMap.processName(node.expression.escapedText.toString());
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
        } else {
            return context.superTransformExpression(node);
        }
    }) satisfies FunctionVisitor<ts.CallExpression>;
};
