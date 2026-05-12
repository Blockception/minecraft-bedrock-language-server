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
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const bc_minecraft_molang_1 = require("bc-minecraft-molang");
const types_1 = require("../../types");
const json_1 = require("../json");
const registry_1 = require("./optimizations/registry");
function diagnose_molang_syntax_current_document(diagnoser, obj) {
    return diagnose_molang_syntax_document(diagnoser.document, diagnoser, obj);
}
function diagnose_molang_syntax_document(doc, diagnoser, obj) {
    const objSet = obj ?? json_1.Json.LoadReport(types_1.DocumentDiagnosticsBuilder.wrap(diagnoser, doc));
    return diagnose_molang_set(objSet, diagnoser, doc.getText(), doc.uri);
}
function diagnose_molang_syntax_text(text, diagnoser, obj) {
    const objSet = obj ?? JSON.parse(text);
    return diagnose_molang_set(objSet, diagnoser, text);
}
function diagnose_molang_syntax_line(line, diagnoser) {
    return diagnose_molang_set(line, diagnoser, line);
}
function diagnose_molang_set(obj, diagnoser, text, documentUri) {
    const set = new bc_minecraft_molang_1.MolangSet();
    if (obj === undefined)
        return set;
    try {
        set.harvest(obj, text);
    }
    catch (err) {
        if (err instanceof bc_minecraft_molang_1.MolangSyntaxError) {
            diagnoser.add(err.position, err.message, types_1.DiagnosticSeverity.error, `molang.${err.code}`);
        }
        else {
            diagnoser.add(0, `unknown error was thrown during parsing of molang, please submit an github issue.\n${JSON.stringify({
                message: err.message,
                stack: err.stack,
            }, null, 2)}`, types_1.DiagnosticSeverity.error, 'molang.error.unknown');
        }
    }
    return diagnose_molang_syntax_set(set, diagnoser, documentUri);
}
function diagnose_molang_syntax_set(set, diagnoser, documentUri) {
    // Check functions parameters
    set.functions.forEach((fn) => diagnose_molang_function(fn, diagnoser, documentUri));
    // Check syntax
    for (const exps of set.cache.expressions()) {
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
            case bc_minecraft_molang_1.NodeType.ResourceReference:
            case bc_minecraft_molang_1.NodeType.Variable:
                if (n.scope !== 'this' && n.names.length === 0)
                    diagnoser.add(n.position, `expected something after '${n.scope}.' but found nothing`, types_1.DiagnosticSeverity.error, 'molang.identifier.invalid');
                switch (n.scope.toLowerCase()) {
                    case 'array':
                    case 'this':
                    case 'geometry':
                    case 'material':
                    case 'texture':
                    case 'v':
                    case 'variable':
                    case 'c':
                    case 'context':
                    case 't':
                    case 'temp':
                        break;
                    default:
                        diagnoser.add(n.position, `unknown variable/resource starting identifier: '${n.scope}' for '${n.scope}.${n.names.join('.')}'`, types_1.DiagnosticSeverity.error, 'molang.identifier.scope');
                }
                break;
            case bc_minecraft_molang_1.NodeType.ArrayAccess:
                objs.push(n.array, n.index);
                break;
            case bc_minecraft_molang_1.NodeType.Assignment:
                // TODO left should be a resource / variable
                objs.push(n.left, n.right);
                break;
            case bc_minecraft_molang_1.NodeType.BinaryOperation:
                objs.push(n.left, n.right);
                // TODO check operator
                break;
            case bc_minecraft_molang_1.NodeType.Conditional:
                objs.push(n.condition, n.falseExpression, n.trueExpression);
                break;
            case bc_minecraft_molang_1.NodeType.FunctionCall:
                objs.push(...n.arguments);
                break;
            case bc_minecraft_molang_1.NodeType.StringLiteral:
            case bc_minecraft_molang_1.NodeType.Literal:
                break;
            case bc_minecraft_molang_1.NodeType.NullishCoalescing:
                objs.push(n.left, n.right);
                break;
            case bc_minecraft_molang_1.NodeType.StatementSequence:
                objs.push(...n.statements);
                break;
            case bc_minecraft_molang_1.NodeType.UnaryOperation:
                objs.push(n.operand);
                // TODO check operator
                break;
            case bc_minecraft_molang_1.NodeType.Marker:
            default:
                diagnoser.add(n.position, `unknown piece of molang syntax: ${JSON.stringify(n)}`, types_1.DiagnosticSeverity.error, 'molang.diagnoser.syntax');
        }
    }
}
// Singleton registry instance for optimization rules
let optimizationRegistry;
/**
 * Gets or creates the optimization registry
 */
function getOptimizationRegistry() {
    if (!optimizationRegistry) {
        optimizationRegistry = (0, registry_1.createDefaultOptimizationRegistry)();
    }
    return optimizationRegistry;
}
/**
 * Diagnoses Molang expression optimizations
 * @param expression The expression to diagnose
 * @param diagnoser The diagnoser to report issues to
 */
function diagnose_molang_syntax_optimizations(expression, diagnoser) {
    const registry = getOptimizationRegistry();
    (0, registry_1.traverseAndOptimize)(expression, registry, diagnoser);
}
/**
 * Checks if the pack type is one that can be validated for MoLang pack-specific queries
 * @param packType The pack type to check
 * @returns true if the pack type supports MoLang validation (Behavior or Resource pack)
 */
function isValidatablePackType(packType) {
    return packType === bc_minecraft_bedrock_project_1.PackType.behavior_pack || packType === bc_minecraft_bedrock_project_1.PackType.resource_pack;
}
/**
 * Diagnoses a Molang function call for correctness
 * @param fn The function call node to diagnose
 * @param diagnoser The diagnoser to report issues to
 * @param documentUri Optional document URI to detect pack type
 * @returns void
 */
function diagnose_molang_function(fn, diagnoser, documentUri) {
    const id = fn.names.join('.');
    let fnData;
    switch (fn.scope) {
        case 'math':
            fnData = bc_minecraft_molang_1.MolangData.General.getMath(id);
            break;
        case 'q':
        case 'query':
            fnData = bc_minecraft_molang_1.MolangData.General.getQuery(id);
            break;
        default:
            diagnoser.add(bc_minecraft_bedrock_shared_1.OffsetWord.create(bc_minecraft_molang_1.ExpressionNode.getIdentifier(fn), fn.position), `Unknown function molang scope: ${fn.scope}, expected math or query`, types_1.DiagnosticSeverity.error, `molang.function.scope`);
            return;
    }
    if (fnData === undefined) {
        diagnoser.add(bc_minecraft_bedrock_shared_1.OffsetWord.create(bc_minecraft_molang_1.ExpressionNode.getIdentifier(fn), fn.position), `Unknown function ${fn.scope}.${id}, doesn't seem to exist`, types_1.DiagnosticSeverity.error, `molang.function.${fn.scope}.${id}`);
        return;
    }
    if (fnData.deprecated) {
        let msg = fnData.deprecated;
        if (msg.startsWith('query') || msg.startsWith('math')) {
            msg = `\n\treplace it with: ${fnData.deprecated}`;
        }
        diagnoser.add(bc_minecraft_bedrock_shared_1.OffsetWord.create(bc_minecraft_molang_1.ExpressionNode.getIdentifier(fn), fn.position), `molang function has been deprecated: ${msg}`, types_1.DiagnosticSeverity.error, 'molang.function.deprecated');
    }
    // Check pack type restrictions if packType is specified on the function and we have a document URI
    if (fnData.packType && documentUri) {
        const detectedPackType = bc_minecraft_bedrock_project_1.PackType.detect(documentUri);
        // Only validate if we can detect a pack type that supports MoLang validation
        if (isValidatablePackType(detectedPackType)) {
            const expectedPackType = fnData.packType === 'behavior' ? bc_minecraft_bedrock_project_1.PackType.behavior_pack : bc_minecraft_bedrock_project_1.PackType.resource_pack;
            if (detectedPackType !== expectedPackType) {
                const packTypeStr = fnData.packType === 'behavior' ? 'Behavior Packs' : 'Resource Packs';
                const currentPackStr = detectedPackType === bc_minecraft_bedrock_project_1.PackType.behavior_pack ? 'Behavior Pack' : 'Resource Pack';
                diagnoser.add(bc_minecraft_bedrock_shared_1.OffsetWord.create(bc_minecraft_molang_1.ExpressionNode.getIdentifier(fn), fn.position), `${fn.scope}.${id} is only available in ${packTypeStr}, but is being used in a ${currentPackStr}`, types_1.DiagnosticSeverity.error, 'molang.function.wrong_pack_type');
            }
        }
    }
    if (fnData.parameters) {
        // Check if the last parameter is repeatable
        const lastParam = fnData.parameters[fnData.parameters.length - 1];
        const hasRepeatableParam = lastParam?.repeatable === true;
        const minRequiredParams = fnData.parameters.length;
        // Validate parameter count
        if (hasRepeatableParam) {
            // With repeatable parameter, we need at least the minimum parameters
            if (fn.arguments.length < minRequiredParams) {
                diagnoser.add(bc_minecraft_bedrock_shared_1.OffsetWord.create(bc_minecraft_molang_1.ExpressionNode.getIdentifier(fn), fn.position), `wrong amount of arguments, expected at least ${minRequiredParams} but got ${fn.arguments.length}`, types_1.DiagnosticSeverity.error, 'molang.function.arguments');
            }
        }
        else {
            // Without repeatable parameter, we need exact match
            if (fnData.parameters.length != fn.arguments.length) {
                diagnoser.add(bc_minecraft_bedrock_shared_1.OffsetWord.create(bc_minecraft_molang_1.ExpressionNode.getIdentifier(fn), fn.position), `wrong amount of arguments, expected ${fnData.parameters.length} but got ${fn.arguments.length}`, types_1.DiagnosticSeverity.error, 'molang.function.arguments');
            }
        }
        // Validate parameter types
        for (let i = 0; i < fn.arguments.length; i++) {
            const arg = fn.arguments[i];
            let expectedParam;
            // Determine which parameter definition to use
            if (i < fnData.parameters.length) {
                // Use the parameter at this index
                expectedParam = fnData.parameters[i];
            }
            else if (hasRepeatableParam) {
                // Use the last (repeatable) parameter for additional arguments
                expectedParam = lastParam;
            }
            // Validate type if specified
            if (expectedParam?.type) {
                const actualType = getArgumentType(arg);
                if (actualType && actualType !== expectedParam.type) {
                    diagnoser.add(bc_minecraft_bedrock_shared_1.OffsetWord.create(bc_minecraft_molang_1.ExpressionNode.getIdentifier(fn), fn.position), `wrong argument type at position ${i + 1}, expected ${expectedParam.type} but got ${actualType}`, types_1.DiagnosticSeverity.error, 'molang.function.arguments.type');
                }
            }
        }
    }
}
/**
 * Helper function to determine the type of an argument node
 */
function getArgumentType(arg) {
    switch (arg.type) {
        case bc_minecraft_molang_1.NodeType.StringLiteral:
            return 'string';
        case bc_minecraft_molang_1.NodeType.Literal:
            // Check if it's a boolean literal (true/false) or numeric
            const value = arg.value?.toLowerCase();
            if (value === 'true' || value === 'false') {
                return 'boolean';
            }
            return 'float';
        default:
            // For complex expressions, we can't determine the type statically
            return undefined;
    }
}
//# sourceMappingURL=expressions.js.map