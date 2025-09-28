"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatchingTokenSlice = getMatchingTokenSlice;
const tokens_1 = require("./tokens");
/**
 * Gets a slice tokens from ( to ) (or for {}, [])
 * @param tokens
 * @param startIndex
 * @returns
 */
function getMatchingTokenSlice(tokens, startIndex) {
    if (startIndex >= tokens.length) {
        throw new Error("Start index is out of bounds");
    }
    const startToken = tokens[startIndex];
    let targetType;
    let counterType;
    // Determine what we're looking for based on the starting token
    switch (startToken.type) {
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
            throw new Error(`Token at index ${startIndex} is not an opening bracket, brace, or parenthesis`);
    }
    let level = 1; // We start with level 1 since we found the opening token
    let endIndex = -1;
    // Search for the matching closing token
    for (let i = startIndex + 1; i < tokens.length; i++) {
        const token = tokens[i];
        if (token.type === counterType) {
            level++;
        }
        else if (token.type === targetType) {
            level--;
            if (level === 0) {
                endIndex = i;
                break;
            }
        }
    }
    // Validate that we found the matching closing token
    if (endIndex === -1) {
        const tokenName = startToken.type === tokens_1.TokenType.OpenBrace ? "{" : startToken.type === tokens_1.TokenType.OpenParen ? "(" : "[";
        const closingName = targetType === tokens_1.TokenType.CloseBrace ? "}" : targetType === tokens_1.TokenType.CloseParen ? ")" : "]";
        throw new Error(`Couldn't find the matching closing ${closingName} for ${tokenName} at index ${startIndex}`);
    }
    // Return the slice including both opening and closing tokens
    return tokens.slice(startIndex, endIndex + 1);
}
//# sourceMappingURL=util.js.map