import * as ts from 'typescript';
import * as lua from 'typescript-to-lua/dist/LuaAST';

export interface ClassSuperInfo {
    className: lua.Identifier;
    extendedTypeNode?: ts.ExpressionWithTypeArguments;
}
