import * as ts from 'typescript';
import { Plugin } from 'typescript-to-lua';
import { getBeforeEmit } from './beforeEmit';
import { ImportMap } from './ImportMap';
import { getTransformCallExpression } from './transformCallExpression';
import { getTransformClassDeclaration } from './transformClassDeclaration';
import { transformNewExpression } from './transformNewExpression';
import { getTransformPropertyAccessExpression } from './transformPropertyAccessExpression';
import { transformSuperExpression } from './transformSuperExpression';

const importMap = new ImportMap();

export default {
    beforeEmit: getBeforeEmit(importMap),
    visitors: {
        [ts.SyntaxKind.ClassDeclaration]:
            getTransformClassDeclaration(importMap),
        [ts.SyntaxKind.SuperKeyword]: transformSuperExpression,
        [ts.SyntaxKind.NewExpression]: transformNewExpression,
        [ts.SyntaxKind.PropertyAccessExpression]:
            getTransformPropertyAccessExpression(importMap),
        [ts.SyntaxKind.CallExpression]: getTransformCallExpression(importMap),
    },
} satisfies Plugin;
