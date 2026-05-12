"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMolang = parseMolang;
const builder_1 = require("./builder");
const errors_1 = require("./errors");
const nodes_1 = require("./nodes");
const operators_1 = require("./operators");
const tokens_1 = require("./tokens");
const util_1 = require("./util");
/** Main function to parse Molang code into a syntax tree */
function parseMolang(line) {
    const tokens = (0, tokens_1.tokenize)(line.text);
    tokens.forEach((t) => (t.position += line.offset));
    const statements = splitTokens(tokens, (item) => item.type === tokens_1.TokenType.Semicolon).filter((t) => t.length > 0);
    // Parse each statement
    return statements
        .map(trimEnding)
        .filter((item) => item.length > 0 && item[0].type !== tokens_1.TokenType.EOF)
        .map(parseTokens);
}
/**
 * Converts the given tokens into nodes
 * @param tokens
 * @returns
 */
function parseTokens(tokens) {
    // tokens = trimBraces(tokens);
    tokens = trimEnding(tokens);
    if (tokens.length === 1)
        return convertToken(tokens[0]) ?? costlyConvertToken(tokens, 0).node;
    const builder = new builder_1.SyntaxBuilder(tokens[0].position ?? 0);
    for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];
        const c = convertToken(t);
        let n;
        if (c) {
            n = c;
        }
        else {
            const cdata = costlyConvertToken(tokens, i);
            i = cdata.startIndex - 1;
            n = cdata.node;
        }
        builder.add(n);
        // Check for parenthese, brackets and braces
        if (tokens_1.Token.oneOfType(t, tokens_1.TokenType.NamespacedIdentifier) &&
            tokens_1.Token.oneOfType(tokens[i + 1], tokens_1.TokenType.OpenBrace, tokens_1.TokenType.OpenBracket, tokens_1.TokenType.OpenParen)) {
            const code = (0, util_1.getMatchingTokenSlice)(tokens, i + 1);
            const inner = trimBraces(code);
            const params = splitTokens(inner, (item) => item.type === tokens_1.TokenType.Comma);
            const bracketArgs = params.map(parseTokens);
            i += code.length; // move index to end
            switch (n.type) {
                case nodes_1.NodeType.FunctionCall:
                    n.arguments = bracketArgs;
                    n.hasParens = true;
                    break;
                case nodes_1.NodeType.ResourceReference:
                    if (bracketArgs.length > 0) {
                        throw errors_1.MolangSyntaxError.fromToken(t, 'unexpected function call after resource access');
                    }
                    break;
                case nodes_1.NodeType.Variable:
                    if (bracketArgs.length > 1) {
                        throw errors_1.MolangSyntaxError.fromToken(t, 'unexpected amount of parameters for array access');
                    }
                    if (!tokens_1.Token.oneOfType(code[0], tokens_1.TokenType.OpenBracket)) {
                        throw errors_1.MolangSyntaxError.fromToken(t, 'unexpected function call after resource access');
                    }
                    builder.replace(n, nodes_1.ArrayAccessNode.create({
                        position: n.position,
                        array: n,
                        index: bracketArgs[0],
                    }));
                    break;
            }
        }
    }
    //
    (0, operators_1.processOperators)(builder);
    return builder.build();
}
/**
 * Filter () {} [] from start or finish if they match
 *
 * This function removes matching opening and closing brackets from the start and end of a token array.
 * It's critical that this function verifies the brackets actually match each other - for example,
 * in `(a) || (b)`, the first `(` matches the first `)`, NOT the last `)`, so we should NOT trim.
 *
 * Example behaviors:
 * - `((a))` -> `(a)` -> `a` (trims twice)
 * - `(a)` -> `a` (trims once)
 * - `(a) || (b)` -> `(a) || (b)` (no trim, first and last don't match)
 * - `((a) || (b))` -> `(a) || (b)` (trims once, outer pair matches)
 */
function trimBraces(tokens) {
    if (tokens.length <= 1)
        return tokens;
    while ((tokens[0].type === tokens_1.TokenType.OpenBrace && tokens[tokens.length - 1].type === tokens_1.TokenType.CloseBrace) ||
        (tokens[0].type === tokens_1.TokenType.OpenBracket && tokens[tokens.length - 1].type === tokens_1.TokenType.CloseBracket) ||
        (tokens[0].type === tokens_1.TokenType.OpenParen && tokens[tokens.length - 1].type === tokens_1.TokenType.CloseParen)) {
        // Verify that the first and last tokens actually match each other
        // by tracking nesting levels to find where the first opening bracket closes
        const firstType = tokens[0].type;
        let targetType;
        let counterType;
        switch (firstType) {
            case tokens_1.TokenType.OpenBrace:
                targetType = tokens_1.TokenType.CloseBrace;
                counterType = tokens_1.TokenType.OpenBrace;
                break;
            case tokens_1.TokenType.OpenParen:
                targetType = tokens_1.TokenType.CloseParen;
                counterType = tokens_1.TokenType.OpenParen;
                break;
            case tokens_1.TokenType.OpenBracket:
                targetType = tokens_1.TokenType.CloseBracket;
                counterType = tokens_1.TokenType.OpenBracket;
                break;
            default:
                return tokens;
        }
        // Find the closing bracket that matches the opening bracket at index 0
        // by tracking nesting level (increment on open, decrement on close, match when level reaches 0)
        let level = 1;
        let matchIndex = -1;
        for (let i = 1; i < tokens.length; i++) {
            if (tokens[i].type === counterType) {
                level++;
            }
            else if (tokens[i].type === targetType) {
                level--;
                if (level === 0) {
                    matchIndex = i;
                    break;
                }
            }
        }
        // Only trim if the matching closing bracket is at the end of the array
        // If it's not at the end, then the first and last brackets don't form a pair
        if (matchIndex !== tokens.length - 1) {
            break;
        }
        tokens = tokens.slice(1, tokens.length - 1);
        if (tokens.length === 0)
            return tokens;
    }
    return tokens;
}
function trimEnding(tokens) {
    // Filter off
    while (tokens[tokens.length - 1].type === tokens_1.TokenType.EOF || tokens[tokens.length - 1].type === tokens_1.TokenType.Semicolon) {
        tokens = tokens.slice(0, tokens.length - 1);
        if (tokens.length === 0)
            return tokens;
    }
    return tokens;
}
/**
 * Cheap converserions from tokens to nodes
 * @param token
 * @returns
 */
function convertToken(token) {
    switch (token.type) {
        case tokens_1.TokenType.Identifier:
            switch (token.value) {
                case 'this':
                    return nodes_1.VariableNode.create({
                        scope: 'this',
                        names: [],
                        position: token.position,
                    });
            }
            break;
        case tokens_1.TokenType.NamespacedIdentifier:
            const parts = token.value.split('.');
            const scope = parts[0];
            switch (scope) {
                case 'this':
                    return nodes_1.VariableNode.create({
                        scope: 'this',
                        names: [],
                        position: token.position,
                    });
                case 'q':
                case 'math':
                case 'query':
                    return nodes_1.FunctionCallNode.create({
                        names: parts.slice(1),
                        scope: scope,
                        arguments: [],
                        position: token.position,
                    });
                case 'texture':
                case 'material':
                case 'geometry':
                    return nodes_1.ResourceReferenceNode.create({
                        position: token.position,
                        scope: scope,
                        names: parts.slice(1),
                    });
                case 'temp':
                case 't':
                case 'variable':
                case 'v':
                case 'context':
                case 'c':
                case 'array':
                    return nodes_1.VariableNode.create({
                        names: parts.slice(1),
                        position: token.position,
                        scope: scope,
                    });
                case 'return':
                    return nodes_1.UnaryOperationNode.create({
                        operator: token.value,
                        position: token.position,
                        operand: {},
                    });
            }
            break;
        case tokens_1.TokenType.Boolean:
            return nodes_1.LiteralNode.create({
                position: token.position,
                value: token.value,
            });
        case tokens_1.TokenType.Number:
            return nodes_1.LiteralNode.create({
                position: token.position,
                value: token.value,
            });
        case tokens_1.TokenType.StringLiteral:
            return nodes_1.StringLiteralNode.create({
                position: token.position,
                value: token.value,
            });
        case tokens_1.TokenType.Operator:
            return nodes_1.BinaryOperationNode.create({
                operator: token.value,
                position: token.position,
                left: {},
                right: {},
            });
        case tokens_1.TokenType.UnaryOperator:
            // Skip the return operator, and have that done via costly
            if (token.value === 'return')
                break;
            return nodes_1.UnaryOperationNode.create({
                operator: token.value,
                position: token.position,
                operand: {},
            });
        case tokens_1.TokenType.Assignment:
            return nodes_1.AssignmentNode.create({
                position: token.position,
                left: {},
                right: {},
            });
        case tokens_1.TokenType.QuestionMark:
            return nodes_1.ConditionalExpressionNode.create({
                position: token.position,
                condition: {},
                falseExpression: {},
                trueExpression: {},
            });
        case tokens_1.TokenType.Colon:
            return nodes_1.MarkerNode.create({
                position: token.position,
                token: token,
            });
        case tokens_1.TokenType.NullishCoalescing:
            return nodes_1.NullishCoalescingNode.create({
                position: token.position,
                left: {},
                right: {},
            });
    }
    return undefined;
}
/**
 * The more costly conversions, and the last restort, will throw an error if doesn't know what to do
 * @param tokens
 * @param startIndex
 */
function costlyConvertToken(tokens, startIndex) {
    const current = tokens[startIndex];
    switch (current.type) {
        case tokens_1.TokenType.OpenBrace:
        case tokens_1.TokenType.OpenBracket:
        case tokens_1.TokenType.OpenParen:
            const code = (0, util_1.getMatchingTokenSlice)(tokens, startIndex);
            return {
                node: parseTokens(trimBraces(code)),
                startIndex: startIndex + code.length,
            };
        case tokens_1.TokenType.UnaryOperator:
            // Everything that comes after return is part of its expression statement
            if (current.value === 'return') {
                const code = tokens.slice(startIndex + 1);
                const node = nodes_1.UnaryOperationNode.create({
                    operator: current.value,
                    position: current.position,
                    operand: parseTokens(trimBraces(code)),
                });
                // We already processed the return statement
                operators_1.Processed.withValue(node, true);
                return {
                    node: node,
                    startIndex: startIndex + 1 + code.length,
                };
            }
    }
    throw errors_1.MolangSyntaxError.fromToken(current, `don't know how to process this token: ['${current.value}' ${tokens_1.TokenType[current.type]}]`);
}
function splitTokens(tokens, predicate) {
    const result = [];
    let startIndex = 0;
    let bracketIndex = 0;
    let parentIndex = 0;
    let braceIndex = 0;
    //loop
    for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];
        switch (t.type) {
            case tokens_1.TokenType.OpenBrace:
                braceIndex++;
                break;
            case tokens_1.TokenType.OpenParen:
                parentIndex++;
                break;
            case tokens_1.TokenType.OpenBracket:
                bracketIndex++;
                break;
            case tokens_1.TokenType.CloseBrace:
                braceIndex--;
                break;
            case tokens_1.TokenType.CloseParen:
                parentIndex--;
                break;
            case tokens_1.TokenType.CloseBracket:
                bracketIndex--;
                break;
        }
        if (bracketIndex > 0 || parentIndex > 0 || braceIndex > 0)
            continue;
        if (predicate(t)) {
            const left = tokens.slice(startIndex, i);
            result.push(left);
            startIndex = i + 1;
        }
    }
    // Validate
    if (bracketIndex > 0)
        throw errors_1.MolangSyntaxError.fromTokens(tokens, "couldn't find the closing {");
    if (parentIndex > 0)
        throw errors_1.MolangSyntaxError.fromTokens(tokens, "couldn't find the closing (");
    if (braceIndex > 0)
        throw errors_1.MolangSyntaxError.fromTokens(tokens, "couldn't find the closing [");
    if (startIndex < tokens.length) {
        const left = tokens.slice(startIndex);
        result.push(left);
    }
    return result;
}
//# sourceMappingURL=parse.js.map