import * as ts from 'typescript';
import { FunctionVisitor } from 'typescript-to-lua';
import * as tstl from 'typescript-to-lua';
import { transformCallAndArguments } from 'typescript-to-lua/dist/transformation/visitors/call';
import { isBuiltinNewExpression } from './isBuiltinNewExpression';

export const transformNewExpression = ((node, context) => {
    if (isBuiltinNewExpression(node, context.checker)) {
        return context.superTransformExpression(node);
    }

    const signature = context.checker.getResolvedSignature(node);
    const [name, params] = transformCallAndArguments(
        context,
        node.expression,
        node.arguments ?? [ts.factory.createTrue()],
        signature
    );
    return tstl.createCallExpression(name, params);
}) satisfies FunctionVisitor<ts.NewExpression>;
