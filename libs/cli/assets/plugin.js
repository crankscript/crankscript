"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformSuperExpression = exports.transformClassDeclaration = void 0;
exports.transformPropertyName = transformPropertyName;
var ts = __importStar(require("typescript"));
var tstl = __importStar(require("typescript-to-lua"));
var lua = __importStar(require("typescript-to-lua/dist/LuaAST"));
var scope_1 = require("typescript-to-lua/dist/transformation/utils/scope");
var call_1 = require("typescript-to-lua/dist/transformation/visitors/call");
var fields_1 = require("typescript-to-lua/dist/transformation/visitors/class/members/fields");
var utils_1 = require("typescript-to-lua/dist/transformation/visitors/class/utils");
var function_1 = require("typescript-to-lua/dist/transformation/visitors/function");
var importMap = {
    graphics: new Set(['graphics']),
    sprites: new Set(['sprite']),
    crank: new Set(['getCrankTicks']),
    object: new Set(['printTable']),
    'utilities/where': new Set(['where']),
    easing: new Set(['easingFunctions']),
    nineSlice: new Set(['nineSlice']),
    qrcode: new Set(['generateQRCode']),
    animation: new Set(['animation']),
    animator: new Set(['animator']),
    keyboard: new Set(['keyboard']),
    math: new Set(['math']),
    string: new Set(['string']),
    timer: new Set(['timer']),
    frameTimer: new Set(['frameTimer']),
    ui: new Set(['ui']),
};
var imports = new Set();
function createClassCall(context, className, extendsNode) {
    // class('X')
    var classCall = tstl.createCallExpression(tstl.createIdentifier('class'), [tstl.createStringLiteral(className.text)]);
    var classCreationExpression;
    if (extendsNode) {
        // class('X').extends(Blah)
        classCreationExpression = tstl.createCallExpression(tstl.createTableIndexExpression(classCall, tstl.createStringLiteral('extends')), [context.transformExpression(extendsNode.expression)]);
    }
    else {
        classCreationExpression = tstl.createCallExpression(tstl.createTableIndexExpression(classCall, tstl.createStringLiteral('extends')), [tstl.createIdentifier('Object')]);
    }
    return tstl.createExpressionStatement(classCreationExpression);
}
function transformPropertyName(context, node) {
    if (ts.isComputedPropertyName(node)) {
        return context.transformExpression(node.expression);
    }
    else if (ts.isIdentifier(node)) {
        return tstl.createStringLiteral(node.text);
    }
    else if (ts.isPrivateIdentifier(node)) {
        throw new Error('PrivateIdentifier is not supported');
    }
    else {
        return context.transformExpression(node);
    }
}
function transformConstructor(context, className, instanceFields, constructor) {
    var methodName = 'init';
    context.pushScope(scope_1.ScopeType.Function);
    var bodyStatements = [];
    var params;
    if (constructor) {
        params = (0, function_1.transformParameters)(context, constructor === null || constructor === void 0 ? void 0 : constructor.parameters, tstl.createIdentifier('self'))[0];
    }
    else {
        params = [tstl.createIdentifier('self')];
    }
    bodyStatements.push(tstl.createExpressionStatement(tstl.createCallExpression(tstl.createTableIndexExpression(tstl.createTableIndexExpression(className, tstl.createStringLiteral('super')), tstl.createStringLiteral('init')), params)));
    var classInstanceFields = (0, fields_1.transformClassInstanceFields)(context, instanceFields);
    // initializers have to come before any body of the constructor
    bodyStatements.push.apply(bodyStatements, classInstanceFields);
    if (constructor === null || constructor === void 0 ? void 0 : constructor.body) {
        var body = (0, function_1.transformFunctionBodyContent)(context, constructor.body);
        // if the first expression in the body is a super call, ignore it, because we have
        // constructed our own super call.
        // if it's not, make sure to include the entire body.
        var firstStatement = constructor.body.statements[0];
        if (firstStatement &&
            ts.isExpressionStatement(firstStatement) &&
            ts.isCallExpression(firstStatement.expression) &&
            firstStatement.expression.expression.kind ===
                ts.SyntaxKind.SuperKeyword) {
            bodyStatements.push.apply(bodyStatements, body.slice(1));
        }
        else {
            bodyStatements.push.apply(bodyStatements, body);
        }
    }
    context.popScope();
    return tstl.createAssignmentStatement(tstl.createTableIndexExpression(className, tstl.createStringLiteral(methodName)), tstl.createFunctionExpression(tstl.createBlock(bodyStatements), params));
}
function transformMethodDeclaration(context, node, className) {
    var functionExpression = (0, function_1.transformFunctionToExpression)(context, node)[0];
    return tstl.createAssignmentStatement(tstl.createTableIndexExpression(className, transformPropertyName(context, node.name)), functionExpression);
}
var transformClassDeclaration = function (declaration, context) {
    imports.add('object');
    var className;
    if (declaration.name) {
        className = tstl.createIdentifier(declaration.name.text);
    }
    else {
        className = tstl.createIdentifier(context.createTempName('class'), declaration);
    }
    var extension = (0, utils_1.getExtendedNode)(declaration);
    if (context.classSuperInfos) {
        context.classSuperInfos.push({
            className: className,
            extendedTypeNode: extension,
        });
    }
    else {
        context.classSuperInfos = [{ className: className, extendedTypeNode: extension }];
    }
    // Get all properties with value
    var properties = declaration.members
        .filter(ts.isPropertyDeclaration)
        .filter(function (member) { return member.initializer; });
    // Divide properties into static and non-static
    var instanceFields = properties.filter(function (prop) { return !(0, utils_1.isStaticNode)(prop); });
    var statements = [];
    // class('X')
    statements.push(createClassCall(context, className, extension));
    // function X:init()
    //   X.super.init(self)
    // end
    var constructor = declaration.members.find(function (n) {
        return ts.isConstructorDeclaration(n) && n.body !== undefined;
    });
    var transformedConstructor = transformConstructor(context, className, instanceFields, constructor);
    if (transformedConstructor) {
        statements.push(transformedConstructor);
    }
    var methods = declaration.members
        .filter(ts.isMethodDeclaration)
        .map(function (method) { return transformMethodDeclaration(context, method, className); })
        .filter(function (method) { return method !== undefined; });
    statements.push.apply(statements, methods);
    // export the class if needed
    // todo: check if there is a cleaner way to do this
    if ('localSymbol' in declaration &&
        typeof declaration.localSymbol === 'object' &&
        'exportSymbol' in declaration.localSymbol &&
        typeof declaration.localSymbol.exportSymbol === 'object' &&
        'escapedName' in declaration.localSymbol.exportSymbol &&
        typeof declaration.localSymbol.exportSymbol.escapedName === 'string') {
        var escapedName = declaration.localSymbol.exportSymbol.escapedName;
        statements.push(tstl.createAssignmentStatement(tstl.createTableIndexExpression(tstl.createIdentifier('____exports'), tstl.createStringLiteral(escapedName)), className));
    }
    return statements;
};
exports.transformClassDeclaration = transformClassDeclaration;
var transformNewExpression = function (node, context) {
    var _a;
    var signature = context.checker.getResolvedSignature(node);
    var _b = (0, call_1.transformCallAndArguments)(context, node.expression, (_a = node.arguments) !== null && _a !== void 0 ? _a : [ts.factory.createTrue()], signature), name = _b[0], params = _b[1];
    return tstl.createCallExpression(name, params);
};
var transformSuperExpression = function (expression, context) {
    var superInfos = context.classSuperInfos;
    var superInfo = undefined;
    if (superInfos) {
        superInfo = superInfos[superInfos.length - 1];
    }
    if (!superInfo)
        return lua.createAnonymousIdentifier(expression);
    var className = superInfo.className;
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
    return lua.createTableIndexExpression(className, lua.createStringLiteral('super'));
};
exports.transformSuperExpression = transformSuperExpression;
var processName = function (name) {
    for (var _i = 0, _a = Object.entries(importMap); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if (value instanceof Set && value.has(name)) {
            imports.add(key);
        }
    }
};
var plugin = {
    beforeEmit: function (_, __, ___, result) {
        var importsString = Array.from(imports)
            .map(function (importString) { return "import \"CoreLibs/".concat(importString, "\""); })
            .join('\n');
        if (importsString.trim() === '') {
            return;
        }
        result[0].code = "-- These imports were added automatically\n\n".concat(importsString, "\n\n-- End of automatic imports\n\n").concat(result[0].code);
    },
    visitors: (_a = {},
        _a[ts.SyntaxKind.ClassDeclaration] = exports.transformClassDeclaration,
        _a[ts.SyntaxKind.SuperKeyword] = exports.transformSuperExpression,
        _a[ts.SyntaxKind.NewExpression] = transformNewExpression,
        _a[ts.SyntaxKind.PropertyAccessExpression] = function (node, context) {
            if (ts.isIdentifier(node.expression)) {
                processName(node.name.text);
            }
            return context.superTransformExpression(node);
        },
        _a[ts.SyntaxKind.CallExpression] = function (node, context) {
            if (ts.isIdentifier(node.expression)) {
                processName(node.expression.escapedText.toString());
            }
            if (ts.isIdentifier(node.expression) &&
                node.expression.escapedText === 'require') {
                var normalNode = context.superTransformExpression(node);
                normalNode.expression.text = 'import';
                normalNode.expression.originalName = 'import';
                return normalNode;
            }
            else {
                return context.superTransformExpression(node);
            }
        },
        _a),
};
exports.default = plugin;
