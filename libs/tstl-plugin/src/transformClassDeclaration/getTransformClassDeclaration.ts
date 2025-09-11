import * as ts from 'typescript';
import { FunctionVisitor, TransformationContext } from 'typescript-to-lua';
import * as tstl from 'typescript-to-lua';
import { transformStaticPropertyDeclaration } from 'typescript-to-lua/dist/transformation/visitors/class/members/fields';
import {
    getExtendedNode,
    isStaticNode,
} from 'typescript-to-lua/dist/transformation/visitors/class/utils';
import { getExportedClassDeclarationStatements } from './getExportedClassDeclarationStatements';
import { ImportMap } from '../ImportMap';
import { ClassSuperInfo } from '../types';
import { createClassCall } from './createClasCall';
import { transformConstructor } from './transformConstructor';
import { transformMethodDeclaration } from './transformMethodDeclaration';

const hasSuperInfos = (
    context: TransformationContext,
): context is TransformationContext & {
    classSuperInfos?: [ClassSuperInfo];
} => {
    return 'classSuperInfos' in context;
};

export const getTransformClassDeclaration = (importMap: ImportMap) => {
    return ((declaration, context: TransformationContext) => {
        importMap.add('object');

        let className: tstl.Identifier;
        if (declaration.name) {
            className = tstl.createIdentifier(declaration.name.text);
        } else {
            className = tstl.createIdentifier(
                context.createTempName('class'),
                declaration,
            );
        }

        const extension = getExtendedNode(declaration);

        if (hasSuperInfos(context)) {
            if (context.classSuperInfos) {
                context.classSuperInfos.push({
                    className,
                    extendedTypeNode: extension,
                });
            } else {
                context.classSuperInfos = [
                    { className, extendedTypeNode: extension },
                ];
            }
        }

        // Get all properties with value
        const properties = declaration.members
            .filter(ts.isPropertyDeclaration)
            .filter(member => member.initializer);

        // Divide properties into static and non-static
        const instanceFields = properties.filter(prop => !isStaticNode(prop));
        const staticFields = properties.filter(prop => isStaticNode(prop));

        const statements: tstl.Statement[] = [];

        // class('X')
        statements.push(createClassCall(context, className, extension));

        // function X:init()
        //   X.super.init(self)
        // end

        const staticFieldStatements = staticFields
            .map(field =>
                transformStaticPropertyDeclaration(context, field, className),
            )
            .filter(
                (stmt): stmt is tstl.AssignmentStatement => stmt !== undefined,
            );
        statements.push(...staticFieldStatements);

        const constructor = declaration.members.find(
            (n): n is ts.ConstructorDeclaration =>
                ts.isConstructorDeclaration(n) && n.body !== undefined,
        );

        const constructorToUse =
            constructor ||
            ts.factory.createConstructorDeclaration(
                undefined,
                [],
                ts.factory.createBlock([], true),
            );

        const transformedConstructor = transformConstructor(
            context,
            className,
            instanceFields,
            constructorToUse,
        );

        if (transformedConstructor) {
            statements.push(transformedConstructor);
        }

        const methods = declaration.members
            .filter(ts.isMethodDeclaration)
            .map(method =>
                transformMethodDeclaration(context, method, className),
            )
            .filter((method): method is tstl.Statement => method !== undefined);
        statements.push(...methods);

        statements.push(
            tstl.createAssignmentStatement(
                tstl.createTableIndexExpression(
                    className,
                    tstl.createStringLiteral('constructor'),
                ),
                className,
            ),
        );

        if (extension) {
            const superClassName = context.transformExpression(
                extension.expression,
            );
            statements.push(
                tstl.createAssignmentStatement(
                    tstl.createTableIndexExpression(
                        className,
                        tstl.createStringLiteral('____super'),
                    ),
                    superClassName,
                ),
            );
        }

        statements.push(
            ...getExportedClassDeclarationStatements(className, declaration),
        );

        return statements;
    }) satisfies FunctionVisitor<ts.ClassLikeDeclaration>;
};
