import * as ts from 'typescript';
import * as tstl from 'typescript-to-lua';

export const createClassCall = (
    context: tstl.TransformationContext,
    className: tstl.Identifier,
    extendsNode?: ts.ExpressionWithTypeArguments
): tstl.Statement => {
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
};
