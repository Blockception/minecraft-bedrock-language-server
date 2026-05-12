"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemanticModifiersEnum = exports.SemanticModifiers = exports.SemanticTokensEnum = exports.SemanticTokens = void 0;
/**KEEP THE ORDER OF THESE

/**
 *
 */
exports.SemanticTokens = [
    /**For identifiers that declare or reference a namespace, module or package.*/
    'namespace',
    /**For identifiers that declare of reference a class type.*/
    'class',
    /**For identifiers that declare of reference an enumeration type.*/
    'enum',
    /**For identifiers that declare of reference an struct type.*/
    'struct',
    /**For identifiers that declare of reference an interface type.*/
    'interface',
    /**For identifiers that declare of reference a type parameter.*/
    'typeParameter',
    /**For identifiers that declare of reference a type that is not covered above.*/
    'type',
    /**For identifiers that declare of reference a function or method parameters.*/
    'parameter',
    /**For identifiers that declare of reference a local or global variable.*/
    'variable',
    /**For identifiers that declare of reference a member property, member field or member variable.*/
    'property',
    /**For identifiers that declare of enumeration property, constant or member.*/
    'enumMember',
    /**For identifiers that declare of enumeration property.*/
    'event',
    /**For identifiers that declare a function.*/
    'function',
    /**For identifiers that declare a member function or method.*/
    'method',
    /**For identifiers that declare a macro.*/
    'macro',
    /**For identifiers that declare a label.*/
    'label',
    /**For tokens that represent a comment.*/
    'comment',
    /**For tokens that represent a string literal.*/
    'string',
    /**For tokens that represent a language keyword.*/
    'keyword',
    /**For tokens that represent a number literal.*/
    'number',
    /**For tokens that represent a regular expression literal.*/
    'regexp',
    /**For tokens that represent an operator.*/
    'operator',
];
/**
 *
 */
var SemanticTokensEnum;
(function (SemanticTokensEnum) {
    /**For identifiers that declare or reference a namespace, module or package.*/
    SemanticTokensEnum[SemanticTokensEnum["namespace"] = 0] = "namespace";
    /**For identifiers that declare of reference a class type.*/
    SemanticTokensEnum[SemanticTokensEnum["class"] = 1] = "class";
    /**For identifiers that declare of reference an enumeration type.*/
    SemanticTokensEnum[SemanticTokensEnum["enum"] = 2] = "enum";
    /**For identifiers that declare of reference an struct type.*/
    SemanticTokensEnum[SemanticTokensEnum["struct"] = 3] = "struct";
    /**For identifiers that declare of reference an interface type.*/
    SemanticTokensEnum[SemanticTokensEnum["interface"] = 4] = "interface";
    /**For identifiers that declare of reference a type parameter.*/
    SemanticTokensEnum[SemanticTokensEnum["typeParameter"] = 5] = "typeParameter";
    /**For identifiers that declare of reference a type that is not covered above.*/
    SemanticTokensEnum[SemanticTokensEnum["type"] = 6] = "type";
    /**For identifiers that declare of reference a function or method parameters.*/
    SemanticTokensEnum[SemanticTokensEnum["parameter"] = 7] = "parameter";
    /**For identifiers that declare of reference a local or global variable.*/
    SemanticTokensEnum[SemanticTokensEnum["variable"] = 8] = "variable";
    /**For identifiers that declare of reference a member property, member field or member variable.*/
    SemanticTokensEnum[SemanticTokensEnum["property"] = 9] = "property";
    /**For identifiers that declare of enumeration property, constant or member.*/
    SemanticTokensEnum[SemanticTokensEnum["enumMember"] = 10] = "enumMember";
    /**For identifiers that declare of enumeration property.*/
    SemanticTokensEnum[SemanticTokensEnum["event"] = 11] = "event";
    /**For identifiers that declare a function.*/
    SemanticTokensEnum[SemanticTokensEnum["function"] = 12] = "function";
    /**For identifiers that declare a member function or method.*/
    SemanticTokensEnum[SemanticTokensEnum["method"] = 13] = "method";
    /**For identifiers that declare a macro.*/
    SemanticTokensEnum[SemanticTokensEnum["macro"] = 14] = "macro";
    /**For identifiers that declare a label.*/
    SemanticTokensEnum[SemanticTokensEnum["label"] = 15] = "label";
    /**For tokens that represent a comment.*/
    SemanticTokensEnum[SemanticTokensEnum["comment"] = 16] = "comment";
    /**For tokens that represent a string literal.*/
    SemanticTokensEnum[SemanticTokensEnum["string"] = 17] = "string";
    /**For tokens that represent a language keyword.*/
    SemanticTokensEnum[SemanticTokensEnum["keyword"] = 18] = "keyword";
    /**For tokens that represent a number literal.*/
    SemanticTokensEnum[SemanticTokensEnum["number"] = 19] = "number";
    /**For tokens that represent a regular expression literal.*/
    SemanticTokensEnum[SemanticTokensEnum["regexp"] = 20] = "regexp";
    /**For tokens that represent an operator.*/
    SemanticTokensEnum[SemanticTokensEnum["operator"] = 21] = "operator";
})(SemanticTokensEnum || (exports.SemanticTokensEnum = SemanticTokensEnum = {}));
/**
 *
 */
exports.SemanticModifiers = [
    /**For declarations of symbols.*/
    'declaration',
    /**For definitions of symbols, e.g. in header files.*/
    'definition',
    /**For readonly variables and member fields a.k.a. constants.*/
    'readonly',
    /**For class members a.k.a static members.*/
    'static',
    /**For symbols that should no longer be used.*/
    'deprecated',
    /**For types and member functions that are abstract.*/
    'abstract',
    /**For functions that are marked async.*/
    'async',
    /**For variable references where the variable is assigned to.*/
    'modification',
    /**For occurrences of symbols in documentation.*/
    'documentation',
    /**For symbols that are part of the standard library.*/
    'defaultLibrary',
];
/**
 *
 */
var SemanticModifiersEnum;
(function (SemanticModifiersEnum) {
    /**For declarations of symbols.*/
    SemanticModifiersEnum[SemanticModifiersEnum["declaration"] = 0] = "declaration";
    /**For definitions of symbols, e.g. in header files.*/
    SemanticModifiersEnum[SemanticModifiersEnum["definition"] = 1] = "definition";
    /**For readonly variables and member fields a.k.a. constants.*/
    SemanticModifiersEnum[SemanticModifiersEnum["readonly"] = 2] = "readonly";
    /**For class members a.k.a static members.*/
    SemanticModifiersEnum[SemanticModifiersEnum["static"] = 3] = "static";
    /**For symbols that should no longer be used.*/
    SemanticModifiersEnum[SemanticModifiersEnum["deprecated"] = 4] = "deprecated";
    /**For types and member functions that are abstract.*/
    SemanticModifiersEnum[SemanticModifiersEnum["abstract"] = 5] = "abstract";
    /**For functions that are marked async.*/
    SemanticModifiersEnum[SemanticModifiersEnum["async"] = 6] = "async";
    /**For variable references where the variable is assigned to.*/
    SemanticModifiersEnum[SemanticModifiersEnum["modification"] = 7] = "modification";
    /**For occurrences of symbols in documentation.*/
    SemanticModifiersEnum[SemanticModifiersEnum["documentation"] = 8] = "documentation";
    /**For symbols that are part of the standard library.*/
    SemanticModifiersEnum[SemanticModifiersEnum["defaultLibrary"] = 9] = "defaultLibrary";
})(SemanticModifiersEnum || (exports.SemanticModifiersEnum = SemanticModifiersEnum = {}));
//# sourceMappingURL=constants.js.map