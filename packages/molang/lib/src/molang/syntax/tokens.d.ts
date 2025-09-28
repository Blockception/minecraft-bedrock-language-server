/** Represents a token in the Molang code */
export interface Token {
    type: TokenType;
    value: string;
    position: number;
}
export declare namespace Token {
    function oneOfType(t: Pick<Token, "type"> | undefined, ...params: TokenType[]): boolean;
}
export declare enum TokenType {
    ArrayAccess = 0,
    Arrow = 1,
    Assignment = 2,
    CloseBrace = 3,
    CloseBracket = 4,
    CloseParen = 5,
    Colon = 6,
    Comma = 7,
    Dot = 8,
    Identifier = 9,
    NamespacedIdentifier = 10,
    NullishCoalescing = 11,
    Number = 12,
    OpenBrace = 13,
    OpenBracket = 14,
    OpenParen = 15,
    Operator = 16,
    QuestionMark = 17,
    Semicolon = 18,
    StringLiteral = 19,
    UnaryOperator = 20,
    EOF = 21
}
/** Tokenizes Molang code into a sequence of tokens */
export declare function tokenize(input: string): Token[];
