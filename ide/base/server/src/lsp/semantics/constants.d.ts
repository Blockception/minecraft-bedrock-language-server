/**KEEP THE ORDER OF THESE

/**
 *
 */
export declare const SemanticTokens: string[];
/**
 *
 */
export declare enum SemanticTokensEnum {
    /**For identifiers that declare or reference a namespace, module or package.*/
    namespace = 0,
    /**For identifiers that declare of reference a class type.*/
    class = 1,
    /**For identifiers that declare of reference an enumeration type.*/
    enum = 2,
    /**For identifiers that declare of reference an struct type.*/
    struct = 3,
    /**For identifiers that declare of reference an interface type.*/
    interface = 4,
    /**For identifiers that declare of reference a type parameter.*/
    typeParameter = 5,
    /**For identifiers that declare of reference a type that is not covered above.*/
    type = 6,
    /**For identifiers that declare of reference a function or method parameters.*/
    parameter = 7,
    /**For identifiers that declare of reference a local or global variable.*/
    variable = 8,
    /**For identifiers that declare of reference a member property, member field or member variable.*/
    property = 9,
    /**For identifiers that declare of enumeration property, constant or member.*/
    enumMember = 10,
    /**For identifiers that declare of enumeration property.*/
    event = 11,
    /**For identifiers that declare a function.*/
    function = 12,
    /**For identifiers that declare a member function or method.*/
    method = 13,
    /**For identifiers that declare a macro.*/
    macro = 14,
    /**For identifiers that declare a label.*/
    label = 15,
    /**For tokens that represent a comment.*/
    comment = 16,
    /**For tokens that represent a string literal.*/
    string = 17,
    /**For tokens that represent a language keyword.*/
    keyword = 18,
    /**For tokens that represent a number literal.*/
    number = 19,
    /**For tokens that represent a regular expression literal.*/
    regexp = 20,
    /**For tokens that represent an operator.*/
    operator = 21
}
/**
 *
 */
export declare const SemanticModifiers: string[];
/**
 *
 */
export declare enum SemanticModifiersEnum {
    /**For declarations of symbols.*/
    declaration = 0,
    /**For definitions of symbols, e.g. in header files.*/
    definition = 1,
    /**For readonly variables and member fields a.k.a. constants.*/
    readonly = 2,
    /**For class members a.k.a static members.*/
    static = 3,
    /**For symbols that should no longer be used.*/
    deprecated = 4,
    /**For types and member functions that are abstract.*/
    abstract = 5,
    /**For functions that are marked async.*/
    async = 6,
    /**For variable references where the variable is assigned to.*/
    modification = 7,
    /**For occurrences of symbols in documentation.*/
    documentation = 8,
    /**For symbols that are part of the standard library.*/
    defaultLibrary = 9
}
//# sourceMappingURL=constants.d.ts.map