import * as ts from 'typescript';
import * as tstl from 'typescript-to-lua';
import { FunctionVisitor, TransformationContext } from 'typescript-to-lua';
import * as lua from 'typescript-to-lua/dist/LuaAST';
import { ScopeType } from 'typescript-to-lua/dist/transformation/utils/scope';
import { transformCallAndArguments } from 'typescript-to-lua/dist/transformation/visitors/call';
import { transformClassInstanceFields } from 'typescript-to-lua/dist/transformation/visitors/class/members/fields';
import {
    getExtendedNode,
    isStaticNode,
} from 'typescript-to-lua/dist/transformation/visitors/class/utils';
import {
    transformFunctionBodyContent,
    transformFunctionToExpression,
    transformParameters,
} from 'typescript-to-lua/dist/transformation/visitors/function';

function createClassCall(
    context: tstl.TransformationContext,
    className: tstl.Identifier,
    extendsNode?: ts.ExpressionWithTypeArguments
): tstl.Statement {
    // class('X')
    const classCall = tstl.createCallExpression(
        tstl.createIdentifier('class'),
        [tstl.createStringLiteral(className.text)]
    );
    let classCreationExpression: tstl.Expression;
    if (extendsNode) {
        // class('X').extends(Blah)
        classCreationExpression = tstl.createCallExpression(
            tstl.createTableIndexExpression(
                classCall,
                tstl.createStringLiteral('extends')
            ),
            [context.transformExpression(extendsNode.expression)]
        );
    } else {
        classCreationExpression = tstl.createCallExpression(
            tstl.createTableIndexExpression(
                classCall,
                tstl.createStringLiteral('extends')
            ),
            [tstl.createIdentifier('Object')]
        );
    }
    return tstl.createExpressionStatement(classCreationExpression);
}

export function transformPropertyName(
    context: TransformationContext,
    node: ts.PropertyName
): tstl.Expression {
    if (ts.isComputedPropertyName(node)) {
        return context.transformExpression(node.expression);
    } else if (ts.isIdentifier(node)) {
        return tstl.createStringLiteral(node.text);
    } else if (ts.isPrivateIdentifier(node)) {
        throw new Error('PrivateIdentifier is not supported');
    } else {
        return context.transformExpression(node);
    }
}

function transformConstructor(
    context: TransformationContext,
    className: tstl.Identifier,
    instanceFields: ts.PropertyDeclaration[],
    constructor?: ts.ConstructorDeclaration
): tstl.Statement | undefined {
    const methodName = 'init';
    context.pushScope(ScopeType.Function);
    const bodyStatements: tstl.Statement[] = [];
    let params: tstl.Identifier[];
    if (constructor) {
        [params] = transformParameters(
            context,
            constructor?.parameters,
            tstl.createIdentifier('self')
        );
    } else {
        params = [tstl.createIdentifier('self')];
    }
    bodyStatements.push(
        tstl.createExpressionStatement(
            tstl.createCallExpression(
                tstl.createTableIndexExpression(
                    tstl.createTableIndexExpression(
                        className,
                        tstl.createStringLiteral('super')
                    ),
                    tstl.createStringLiteral('init')
                ),
                params
            )
        )
    );
    const classInstanceFields = transformClassInstanceFields(
        context,
        instanceFields
    );
    // initializers have to come before any body of the constructor
    bodyStatements.push(...classInstanceFields);
    if (constructor?.body) {
        const body = transformFunctionBodyContent(context, constructor.body);
        // if the first expression in the body is a super call, ignore it, because we have
        // constructed our own super call.
        // if it's not, make sure to include the entire body.
        const firstStatement = constructor.body.statements[0];
        if (
            firstStatement &&
            ts.isExpressionStatement(firstStatement) &&
            ts.isCallExpression(firstStatement.expression) &&
            firstStatement.expression.expression.kind ===
                ts.SyntaxKind.SuperKeyword
        ) {
            bodyStatements.push(...body.slice(1));
        } else {
            bodyStatements.push(...body);
        }
    }
    context.popScope();
    return tstl.createAssignmentStatement(
        tstl.createTableIndexExpression(
            className,
            tstl.createStringLiteral(methodName)
        ),
        tstl.createFunctionExpression(tstl.createBlock(bodyStatements), params)
    );
}

function transformMethodDeclaration(
    context: TransformationContext,
    node: ts.MethodDeclaration,
    className: tstl.Identifier
): tstl.Statement | undefined {
    const [functionExpression] = transformFunctionToExpression(context, node);
    return tstl.createAssignmentStatement(
        tstl.createTableIndexExpression(
            className,
            transformPropertyName(context, node.name)
        ),
        functionExpression
    );
}
interface ClassSuperInfo {
    className: lua.Identifier;
    extendedTypeNode?: ts.ExpressionWithTypeArguments;
}

export const transformClassDeclaration: FunctionVisitor<
    ts.ClassLikeDeclaration
> = (
    declaration,
    context: TransformationContext & { classSuperInfos?: [ClassSuperInfo] }
) => {
    let className: tstl.Identifier;
    if (declaration.name) {
        className = tstl.createIdentifier(declaration.name.text);
    } else {
        className = tstl.createIdentifier(
            context.createTempName('class'),
            declaration
        );
    }

    const extension = getExtendedNode(declaration);
    if (context.classSuperInfos) {
        context.classSuperInfos.push({
            className,
            extendedTypeNode: extension,
        });
    } else {
        context.classSuperInfos = [{ className, extendedTypeNode: extension }];
    }

    // Get all properties with value
    const properties = declaration.members
        .filter(ts.isPropertyDeclaration)
        .filter((member) => member.initializer);

    // Divide properties into static and non-static
    const instanceFields = properties.filter((prop) => !isStaticNode(prop));

    const statements: tstl.Statement[] = [];

    // class('X')
    statements.push(createClassCall(context, className, extension));

    // function X:init()
    //   X.super.init(self)
    // end
    const constructor = declaration.members.find(
        (n): n is ts.ConstructorDeclaration =>
            ts.isConstructorDeclaration(n) && n.body !== undefined
    );
    const transformedConstructor = transformConstructor(
        context,
        className,
        instanceFields,
        constructor
    );
    if (transformedConstructor) {
        statements.push(transformedConstructor);
    }

    const methods = declaration.members
        .filter(ts.isMethodDeclaration)
        .map((method) => transformMethodDeclaration(context, method, className))
        .filter((method): method is tstl.Statement => method !== undefined);
    statements.push(...methods);

    return statements;
};

const transformNewExpression: FunctionVisitor<ts.NewExpression> = (
    node,
    context
) => {
    const signature = context.checker.getResolvedSignature(node);
    const [name, params] = transformCallAndArguments(
        context,
        node.expression,
        node.arguments ?? [ts.factory.createTrue()],
        signature
    );
    return tstl.createCallExpression(name, params);
};

export const transformSuperExpression: FunctionVisitor<ts.SuperExpression> = (
    expression,
    context: TransformationContext & { classSuperInfos?: ClassSuperInfo[] }
) => {
    const superInfos = context.classSuperInfos;
    let superInfo: ClassSuperInfo | undefined = undefined;
    if (superInfos) {
        superInfo = superInfos[superInfos.length - 1];
    }
    if (!superInfo) return lua.createAnonymousIdentifier(expression);
    const { className } = superInfo;

    // Using `super` without extended type node is a TypeScript error
    // const extendsExpression = extendedTypeNode?.expression;
    // let baseClassName: lua.AssignmentLeftHandSideExpression | undefined;

    // if (extendsExpression && ts.isIdentifier(extendsExpression)) {
    //     const symbol = context.checker.getSymbolAtLocation(extendsExpression);
    //     if (symbol && !isSymbolExported(context, symbol)) {
    //         // Use "baseClassName" if base is a simple identifier
    //         baseClassName = transformIdentifier(context, extendsExpression);
    //     }
    // }

    // if (!baseClassName) {
    //     // Use "className.____super" if the base is not a simple identifier
    //     baseClassName = lua.createTableIndexExpression(
    //         className,
    //         lua.createStringLiteral('____super'),
    //         expression
    //     );
    // }

    return lua.createTableIndexExpression(
        className,
        lua.createStringLiteral('super')
    );
};

const plugin = {
    visitors: {
        [ts.SyntaxKind.ClassDeclaration]: transformClassDeclaration,
        [ts.SyntaxKind.SuperKeyword]: transformSuperExpression,
        [ts.SyntaxKind.NewExpression]: transformNewExpression,
        [ts.SyntaxKind.CallExpression]: (node, context) => {
            if (
                ts.isIdentifier(node.expression) &&
                node.expression.escapedText === 'require'
            ) {
                console.log(1);
                const normalNode = context.superTransformExpression(
                    node
                ) as unknown as {
                    expression: { text: string; originalName: string };
                };

                normalNode.expression.text = 'import';
                normalNode.expression.originalName = 'import';

                return normalNode as unknown as lua.Expression;
            } else {
                return context.superTransformExpression(node);
            }
        },
    },
} satisfies tstl.Plugin;

export default plugin;
