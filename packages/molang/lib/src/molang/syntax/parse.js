"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMolang = parseMolang;
const nodes_1 = require("./nodes");
const tokens_1 = require("./tokens");
const util_1 = require("./util");
const builder_1 = require("./builder");
const errors_1 = require("./errors");
const operators_1 = require("./operators");
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
    var _a, _b;
    // tokens = trimBraces(tokens);
    tokens = trimEnding(tokens);
    if (tokens.length === 1)
        return (_a = convertToken(tokens[0])) !== null && _a !== void 0 ? _a : costlyConvertToken(tokens, 0).node;
    const builder = new builder_1.SyntaxBuilder((_b = tokens[0].position) !== null && _b !== void 0 ? _b : 0);
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
                    break;
                case nodes_1.NodeType.ResourceReference:
                    if (bracketArgs.length > 0) {
                        throw errors_1.MolangSyntaxError.fromToken(t, "unexpected function call after resource access");
                    }
                    break;
                case nodes_1.NodeType.Variable:
                    if (bracketArgs.length > 1) {
                        throw errors_1.MolangSyntaxError.fromToken(t, "unexpected amount of parameters for array access");
                    }
                    if (!tokens_1.Token.oneOfType(code[0], tokens_1.TokenType.OpenBracket)) {
                        throw errors_1.MolangSyntaxError.fromToken(t, "unexpected function call after resource access");
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
/** Filter () {} [] from start or finish if they match */
function trimBraces(tokens) {
    if (tokens.length <= 1)
        return tokens;
    while ((tokens[0].type === tokens_1.TokenType.OpenBrace && tokens[tokens.length - 1].type === tokens_1.TokenType.CloseBrace) ||
        (tokens[0].type === tokens_1.TokenType.OpenBracket && tokens[tokens.length - 1].type === tokens_1.TokenType.CloseBracket) ||
        (tokens[0].type === tokens_1.TokenType.OpenParen && tokens[tokens.length - 1].type === tokens_1.TokenType.CloseParen)) {
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
                case "this":
                    return nodes_1.VariableNode.create({
                        scope: "this",
                        names: [],
                        position: token.position,
                    });
            }
            break;
        case tokens_1.TokenType.NamespacedIdentifier:
            const parts = token.value.split(".");
            switch (parts[0]) {
                case "this":
                    return nodes_1.VariableNode.create({
                        scope: "this",
                        names: [],
                        position: token.position,
                    });
                case "q":
                case "math":
                case "query":
                    return nodes_1.FunctionCallNode.create({
                        names: parts.slice(1),
                        scope: parts[0],
                        arguments: [],
                        position: token.position,
                    });
                case "texture":
                case "material":
                case "geometry":
                    return nodes_1.ResourceReferenceNode.create({
                        position: token.position,
                        scope: parts[0],
                        names: parts.slice(1),
                    });
                case "temp":
                case "t":
                case "variable":
                case "v":
                case "context":
                case "c":
                case "array":
                    return nodes_1.VariableNode.create({
                        names: parts.slice(1),
                        position: token.position,
                        scope: parts[0],
                    });
                case "return":
                    return nodes_1.UnaryOperationNode.create({
                        operator: token.value,
                        position: token.position,
                        operand: {},
                    });
            }
            break;
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
            if (token.value === "return")
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
            if (current.value === "return") {
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