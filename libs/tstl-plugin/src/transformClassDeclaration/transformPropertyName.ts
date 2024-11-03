import * as ts from 'typescript';
import { createStringLiteral } from 'typescript-to-lua';
import { TransformationContext } from 'typescript-to-lua';

export const transformPropertyName = (
    context: TransformationContext,
    node: ts.PropertyName
) => {
    if (ts.isComputedPropertyName(node)) {
        return context.transformExpression(node.expression);
    } else if (ts.isIdentifier(node)) {
        return createStringLiteral(node.text);
    } else if (ts.isPrivateIdentifier(node)) {
        throw new Error('PrivateIdentifier is not supported');
    } else {
        return context.transformExpression(node);
    }
};
