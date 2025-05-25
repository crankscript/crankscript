import * as ts from 'typescript';
import { TransformationContext } from 'typescript-to-lua';
import * as tstl from 'typescript-to-lua';
import { transformFunctionToExpression } from 'typescript-to-lua/dist/transformation/visitors/function';
import { transformPropertyName } from './transformPropertyName';

export const transformMethodDeclaration = (
    context: TransformationContext,
    node: ts.MethodDeclaration,
    className: tstl.Identifier,
): tstl.Statement | undefined => {
    if (
        node.modifiers?.some(
            modifier => modifier.kind === ts.SyntaxKind.AbstractKeyword,
        )
    ) {
        return undefined;
    }

    const [functionExpression] = transformFunctionToExpression(context, node);
    return tstl.createAssignmentStatement(
        tstl.createTableIndexExpression(
            className,
            transformPropertyName(context, node.name),
        ),
        functionExpression,
    );
};
