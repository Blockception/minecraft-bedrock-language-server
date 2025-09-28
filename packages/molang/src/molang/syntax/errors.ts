import { Token } from "./tokens";

/** Represents a syntax error in the Molang code */
export class MolangSyntaxError extends Error {
  constructor(message: string, public position: number, public code: string) {
    super(message);
    this.name = "MolangSyntaxError";
  }

  static fromToken(token: Token, message: string) {
    return new MolangSyntaxError(message, token.position, token.value);
  }
  static fromTokens(tokens: Token[], message: string) {
    return new MolangSyntaxError(message, tokens[0].position, tokens.map((i) => i.value).join(""));
  }
}
