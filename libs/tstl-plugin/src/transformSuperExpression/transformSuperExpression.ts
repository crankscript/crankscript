import * as ts from 'typescript';
import { FunctionVisitor, TransformationContext } from 'typescript-to-lua';
import * as lua from 'typescript-to-lua/dist/LuaAST';
import { ClassSuperInfo } from '../types';

export const transformSuperExpression = ((
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

    return lua.createTableIndexExpression(
        className,
        lua.createStringLiteral('super')
    );
}) satisfies FunctionVisitor<ts.SuperExpression>;
