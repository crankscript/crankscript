import * as ts from 'typescript';
import { TransformationContext } from 'typescript-to-lua';
import * as tstl from 'typescript-to-lua';
import { transformInPrecedingStatementScope } from 'typescript-to-lua/dist/transformation/utils/preceding-statements';
import { ScopeType } from 'typescript-to-lua/dist/transformation/utils/scope';
import { transformClassInstanceFields } from 'typescript-to-lua/dist/transformation/visitors/class/members/fields';
import {
    transformFunctionBodyContent,
    transformParameters,
} from 'typescript-to-lua/dist/transformation/visitors/function';

const transformParameterDefaultValue = (
    context: TransformationContext,
    paramName: tstl.Identifier,
    value: ts.Expression,
): tstl.Statement | undefined => {
    if (!value) return undefined;

    const { precedingStatements, result: parameterValue } =
        transformInPrecedingStatementScope(context, () =>
            context.transformExpression(value),
        );

    if (!tstl.isNilLiteral(parameterValue)) {
        precedingStatements.push(
            tstl.createAssignmentStatement(paramName, parameterValue),
        );
    }

    if (precedingStatements.length === 0) return undefined;

    const nilCondition = tstl.createBinaryExpression(
        paramName,
        tstl.createNilLiteral(),
        tstl.SyntaxKind.EqualityOperator,
    );

    return tstl.createIfStatement(
        nilCondition,
        tstl.createBlock(precedingStatements),
        undefined,
    );
};

export const transformConstructor = (
    context: TransformationContext,
    className: tstl.Identifier,
    instanceFields: ts.PropertyDeclaration[],
    constructor: ts.ConstructorDeclaration,
): tstl.Statement | undefined => {
    const methodName = 'init';
    context.pushScope(ScopeType.Function);
    let bodyStatements: tstl.Statement[] = [];
    const params = transformParameters(
        context,
        constructor?.parameters,
        tstl.createIdentifier('self'),
    )[0];
    const classInstanceFields = transformClassInstanceFields(
        context,
        instanceFields,
    );

    bodyStatements.push(...classInstanceFields);

    const defaultParamStatements = constructor?.parameters
        .filter(param => param.initializer !== undefined)
        .map(param => {
            if (ts.isIdentifier(param.name) && param.initializer) {
                const paramName = tstl.createIdentifier(param.name.text);

                return transformParameterDefaultValue(
                    context,
                    paramName,
                    param.initializer,
                );
            }

            return undefined;
        })
        .filter((stmt): stmt is tstl.Statement => stmt !== undefined);

    bodyStatements.push(...defaultParamStatements);

    const parameterAssignments = constructor?.parameters
        .filter(
            param =>
                param.name && param.modifiers && param.modifiers.length > 0,
        )
        .map(param => {
            if (ts.isIdentifier(param.name)) {
                const paramName = param.name.text;
                return tstl.createAssignmentStatement(
                    tstl.createTableIndexExpression(
                        tstl.createIdentifier('self'),
                        tstl.createStringLiteral(paramName),
                    ),
                    tstl.createIdentifier(paramName),
                );
            }
            return undefined;
        })
        .filter((stmt): stmt is tstl.AssignmentStatement => stmt !== undefined);

    bodyStatements.push(...parameterAssignments);

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
            tstl.createStringLiteral(methodName),
        ),
        tstl.createFunctionExpression(tstl.createBlock(bodyStatements), params),
    );
};
