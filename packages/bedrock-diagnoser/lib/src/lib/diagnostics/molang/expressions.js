"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_molang_syntax_current_document = diagnose_molang_syntax_current_document;
exports.diagnose_molang_syntax_document = diagnose_molang_syntax_document;
exports.diagnose_molang_syntax_text = diagnose_molang_syntax_text;
exports.diagnose_molang_syntax_line = diagnose_molang_syntax_line;
exports.diagnose_molang_syntax_set = diagnose_molang_syntax_set;
exports.diagnose_molang_syntax = diagnose_molang_syntax;
exports.diagnose_molang_syntax_optimizations = diagnose_molang_syntax_optimizations;
exports.diagnose_molang_function = diagnose_molang_function;
const types_1 = require("bc-minecraft-bedrock-types/lib/types");
const bc_minecraft_molang_1 = require("bc-minecraft-molang");
const molang_1 = require("bc-minecraft-molang/lib/src/molang");
const types_2 = require("../../types");
const json_1 = require("../json");
function diagnose_molang_syntax_current_document(diagnoser, obj) {
    return diagnose_molang_syntax_document(diagnoser.document, diagnoser, obj);
}
function diagnose_molang_syntax_document(doc, diagnoser, obj) {
    const objSet = obj !== null && obj !== void 0 ? obj : json_1.Json.LoadReport(types_2.DocumentDiagnosticsBuilder.wrap(diagnoser, doc));
    return diagnose_molang_set(objSet, diagnoser, doc.getText());
}
function diagnose_molang_syntax_text(text, diagnoser, obj) {
    const objSet = obj !== null && obj !== void 0 ? obj : JSON.parse(text);
    return diagnose_molang_set(objSet, diagnoser, text);
}
function diagnose_molang_syntax_line(line, diagnoser) {
    return diagnose_molang_set(line, diagnoser, line);
}
function diagnose_molang_set(obj, diagnoser, text) {
    const set = new molang_1.MolangSet();
    if (obj === undefined)
        return set;
    try {
        set.harvest(obj, text);
    }
    catch (err) {
        if (err instanceof molang_1.MolangSyntaxError) {
            diagnoser.add(err.position, err.message, types_2.DiagnosticSeverity.error, `molang.${err.code}`);
        }
        else {
            diagnoser.add(0, `unknown error was thrown during parsing of molang, please submit an github issue.\n${JSON.stringify({
                message: err.message,
                stack: err.stack,
            }, null, 2)}`, types_2.DiagnosticSeverity.error, "molang.error.unknown");
        }
    }
    finally {
    }
    return diagnose_molang_syntax_set(set, diagnoser);
}
function diagnose_molang_syntax_set(set, diagnoser) {
    // Check functions parameters
    set.functions.forEach((fn) => diagnose_molang_function(fn, diagnoser));
    // Check syntax
    for (let exps of set.cache.expressions()) {
        exps.forEach((exp) => {
            diagnose_molang_syntax(exp, diagnoser);
            diagnose_molang_syntax_optimizations(exp, diagnoser);
        });
    }
    return set;
}
function diagnose_molang_syntax(expression, diagnoser) {
    const objs = [expression];
    for (let i = 0; i < objs.length; i++) {
        const n = objs[i];
        switch (n.type) {
            case molang_1.NodeType.ResourceReference:
            case molang_1.NodeType.Variable:
                if (n.scope !== "this" && n.names.length === 0)
                    diagnoser.add(n.position, `expected something after '${n.scope}.' but found nothing`, types_2.DiagnosticSeverity.error, "molang.identifier.invalid");
                if (n.names.length > 2)
                    diagnoser.add(n.position, `found to many nesting in '${n.scope}.${n.names.join(".")}'`, types_2.DiagnosticSeverity.error, "molang.identifier.invalid");
                switch (n.scope.toLowerCase()) {
                    case "array":
                    case "this":
                    case "geometry":
                    case "material":
                    case "texture":
                    case "v":
                    case "variable":
                    case "c":
                    case "context":
                    case "t":
                    case "temp":
                        break;
                    default:
                        diagnoser.add(n.position, `unknown variable/resource starting identifier: '${n.scope}' for '${n.scope}.${n.names.join(".")}'`, types_2.DiagnosticSeverity.error, "molang.identifier.scope");
                }
                break;
            case molang_1.NodeType.ArrayAccess:
                objs.push(n.array, n.index);
                break;
            case molang_1.NodeType.Assignment:
                // TODO left should be a resource / variable
                objs.push(n.left, n.right);
                break;
            case molang_1.NodeType.BinaryOperation:
                objs.push(n.left, n.right);
                // TODO check operator
                break;
            case molang_1.NodeType.Conditional:
                objs.push(n.condition, n.falseExpression, n.trueExpression);
                break;
            case molang_1.NodeType.FunctionCall:
                objs.push(...n.arguments);
                break;
            case molang_1.NodeType.StringLiteral:
            case molang_1.NodeType.Literal:
                break;
            case molang_1.NodeType.NullishCoalescing:
                objs.push(n.left, n.right);
                break;
            case molang_1.NodeType.StatementSequence:
                objs.push(...n.statements);
                break;
            case molang_1.NodeType.UnaryOperation:
                objs.push(n.operand);
                // TODO check operator
                break;
            case molang_1.NodeType.Marker:
            default:
                diagnoser.add(n.position, `unknown piece of molang syntax: ${JSON.stringify(n)}`, types_2.DiagnosticSeverity.error, "molang.diagnoser.syntax");
        }
    }
}
function diagnose_molang_syntax_optimizations(expression, diagnoser) {
    // TODO: optimizations
}
function diagnose_molang_function(fn, diagnoser) {
    const id = fn.names.join(".");
    let fnData;
    switch (fn.scope) {
        case "math":
            fnData = bc_minecraft_molang_1.MolangData.General.getMath(id);
            break;
        case "q":
        case "query":
            fnData = bc_minecraft_molang_1.MolangData.General.getQuery(id);
            break;
        default:
            diagnoser.add(types_1.OffsetWord.create(`${fn.scope}.${fn.names.join(".")}`, fn.position), `Unknown function molang scope: ${fn.scope}, expected math or query`, types_2.DiagnosticSeverity.error, `molang.function.scope`);
            return;
    }
    if (fnData === undefined) {
        diagnoser.add(types_1.OffsetWord.create(`${fn.scope}.${fn.names.join(".")}`, fn.position), `Unknown function ${fn.scope}.${id}, doesn't seem to exist`, types_2.DiagnosticSeverity.error, `molang.function.${fn.scope}.${id}`);
        return;
    }
    if (fnData.deprecated) {
        let msg = fnData.deprecated;
        if (msg.startsWith("query") || msg.startsWith("math")) {
            msg = `\n\treplace it with: ${fnData.deprecated}`;
        }
        diagnoser.add(types_1.OffsetWord.create(`${fn.scope}.${fn.names.join(".")}`, fn.position), `molang function has been deprecated: ${fnData.deprecated}`, types_2.DiagnosticSeverity.error, "molang.function.deprecated");
    }
    if (fnData.parameters) {
        if (fnData.parameters.length != fn.arguments.length) {
            diagnoser.add(types_1.OffsetWord.create(`${fn.scope}.${fn.names.join(".")}`, fn.position), `wrong amount of arguments, expected ${fnData.parameters.length} but got ${fn.arguments.length}`, types_2.DiagnosticSeverity.error, "molang.function.arguments");
        }
    }
}
//# sourceMappingURL=expressions.js.map