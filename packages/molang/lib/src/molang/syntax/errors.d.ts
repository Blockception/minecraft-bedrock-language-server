import { Token } from "./tokens";
/** Represents a syntax error in the Molang code */
export declare class MolangSyntaxError extends Error {
    position: number;
    code: string;
    constructor(message: string, position: number, code: string);
    static fromToken(token: Token, message: string): MolangSyntaxError;
    static fromTokens(tokens: Token[], message: string): MolangSyntaxError;
}
