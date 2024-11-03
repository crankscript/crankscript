import * as ts from 'typescript';
import { TransformationContext } from 'typescript-to-lua';
import * as tstl from 'typescript-to-lua';
import { ScopeType } from 'typescript-to-lua/dist/transformation/utils/scope';
import { transformClassInstanceFields } from 'typescript-to-lua/dist/transformation/visitors/class/members/fields';
import {
    transformFunctionBodyContent,
    transformParameters,
} from 'typescript-to-lua/dist/transformation/visitors/function';

export const transformConstructor = (
    context: TransformationContext,
    className: tstl.Identifier,
    instanceFields: ts.PropertyDeclaration[],
    constructor: ts.ConstructorDeclaration
): tstl.Statement | undefined => {
    const methodName = 'init';
    context.pushScope(ScopeType.Function);
    let bodyStatements: tstl.Statement[] = [];
    const params = transformParameters(
        context,
        constructor?.parameters,
        tstl.createIdentifier('self')
    )[0];
    const classInstanceFields = transformClassInstanceFields(
        context,
        instanceFields
    );

    bodyStatements.push(...classInstanceFields);

    if (constructor?.body) {
        const body = transformFunctionBodyContent(context, constructor.body);

        bodyStatements.push(...body);
        bodyStatements = bodyStatements.reduce((previous, current) => {
            if (
                tstl.isExpressionStatement(current) &&
                tstl.isCallExpression(current.expression) &&
                tstl.isTableIndexExpression(current.expression.expression) &&
                tstl.isStringLiteral(current.expression.expression.index) &&
                current.expression.expression.index.value === '____constructor'
            ) {
                return [
                    {
                        ...current,
                        expression: {
                            ...current.expression,
                            expression: {
                                ...current.expression.expression,
                                index: tstl.createStringLiteral('init'),
                            },
                            params: current.expression.params.slice(1),
                        },
                    },
                    ...previous,
                ];
            }

            return [...previous, current];
        }, [] as tstl.Statement[]);
    }
    context.popScope();
    return tstl.createAssignmentStatement(
        tstl.createTableIndexExpression(
            className,
            tstl.createStringLiteral(methodName)
        ),
        tstl.createFunctionExpression(tstl.createBlock(bodyStatements), params)
    );
};
