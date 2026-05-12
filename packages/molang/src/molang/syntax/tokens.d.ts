/** Represents a token in the Molang code */
export interface Token {
    type: TokenType;
    value: string;
    position: number;
}
export declare namespace Token {
    function oneOfType(t: Pick<Token, 'type'> | undefined, ...params: TokenType[]): boolean;
}
export declare enum TokenType {
    ArrayAccess = 0,
    Arrow = 1,
    Assignment = 2,
    Boolean = 3,
    CloseBrace = 4,
    CloseBracket = 5,
    CloseParen = 6,
    Colon = 7,
    Comma = 8,
    Dot = 9,
    Identifier = 10,
    NamespacedIdentifier = 11,
    NullishCoalescing = 12,
    Number = 13,
    OpenBrace = 14,
    OpenBracket = 15,
    OpenParen = 16,
    Operator = 17,
    QuestionMark = 18,
    Semicolon = 19,
    StringLiteral = 20,
    UnaryOperator = 21,
    EOF = 22
}
/** Tokenizes Molang code into a sequence of tokens */
export declare function tokenize(input: string): Token[];
//# sourceMappingURL=tokens.d.ts.map