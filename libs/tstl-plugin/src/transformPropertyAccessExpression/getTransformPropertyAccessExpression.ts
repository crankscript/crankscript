import * as ts from 'typescript';
import { FunctionVisitor } from 'typescript-to-lua';
import { ImportMap } from '../ImportMap';

export const getTransformPropertyAccessExpression = (importMap: ImportMap) => {
    return ((node, context) => {
        importMap.processName(node.name.text);

        return context.superTransformExpression(node);
    }) satisfies FunctionVisitor<ts.PropertyAccessExpression>;
};
