"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MolangSyntaxError = void 0;
/** Represents a syntax error in the Molang code */
class MolangSyntaxError extends Error {
    constructor(message, position, code) {
        super(message);
        this.position = position;
        this.code = code;
        this.name = "MolangSyntaxError";
    }
    static fromToken(token, message) {
        return new MolangSyntaxError(message, token.position, token.value);
    }
    static fromTokens(tokens, message) {
        return new MolangSyntaxError(message, tokens[0].position, tokens.map((i) => i.value).join(""));
    }
}
exports.MolangSyntaxError = MolangSyntaxError;
//# sourceMappingURL=errors.js.map