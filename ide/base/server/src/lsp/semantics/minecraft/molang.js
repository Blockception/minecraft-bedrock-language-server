"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideMolangSemanticTokens = provideMolangSemanticTokens;
exports.ConvertWords = ConvertWords;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const float_1 = require("bc-minecraft-bedrock-types/src/general/float");
const words_1 = require("../../../minecraft/molang/words");
const molang_1 = require("../builders/molang");
const constants_1 = require("../constants");
/**
 *
 * @param document
 * @param range
 * @returns
 */
function provideMolangSemanticTokens(document, range) {
    const builder = new molang_1.MolangSemanticTokensBuilder(document);
    const text = document.getText(range);
    const offset = range ? document.offsetAt(range.start) : 0;
    const words = (0, words_1.CreateMolangWords)(text, offset);
    ConvertWords(words, builder);
    return builder.Build();
}
/**
 *
 * @param words
 * @param builder
 */
function ConvertWords(words, builder) {
    for (let I = 0; I < words.length; I++) {
        const word = words[I];
        const text = word.text;
        if ((text.startsWith("'") && text.endsWith("'")) || (text.startsWith('"') && text.endsWith('"'))) {
            builder.AddWord(word, constants_1.SemanticTokensEnum.regexp, constants_1.SemanticModifiersEnum.readonly);
            continue;
        }
        switch (text.toLowerCase()) {
            case 'array':
            case 'geometry':
            case 'material':
            case 'texture':
                builder.AddWord(word, constants_1.SemanticTokensEnum.interface, constants_1.SemanticModifiersEnum.readonly);
                break;
            case 'q':
            case 'v':
            case 't':
            case 'c':
            case 'context':
            case 'math':
            case 'query':
            case 'variable':
            case 'temp':
                builder.AddWord(word, constants_1.SemanticTokensEnum.class, constants_1.SemanticModifiersEnum.static);
                break;
            case 'this':
                builder.AddWord(word, constants_1.SemanticTokensEnum.keyword, constants_1.SemanticModifiersEnum.readonly);
                break;
            case '(':
            case '[':
            case '{':
            case '}':
            case ']':
            case ')':
            case '==':
            case '!=':
            case '&&':
            case '||':
            case '|=':
            case '>=':
            case '<=':
            case '>':
            case '!':
            case '<':
            case '?':
            case ':':
            case ';':
            case '+':
            case '-':
            case '/':
            case '*':
                builder.AddWord(word, constants_1.SemanticTokensEnum.operator);
                break;
            default:
                ConvertWordsDefault(words, I, builder);
        }
    }
}
/**
 *
 * @param words
 * @param index
 * @param builder
 */
function ConvertWordsDefault(words, index, builder) {
    const word = words[index];
    const text = word.text;
    if (float_1.Float.is(text)) {
        builder.AddWord(word, constants_1.SemanticTokensEnum.number);
        return;
    }
    if (bc_minecraft_bedrock_types_1.Minecraft.Selector.Selector.isSelector(text, undefined)) {
        builder.AddWord(word, constants_1.SemanticTokensEnum.variable);
        return;
    }
    if (words[index + 1]?.text === ':') {
        builder.AddWord(word, constants_1.SemanticTokensEnum.namespace);
        return;
    }
    builder.AddWord(word, constants_1.SemanticTokensEnum.method);
}
//# sourceMappingURL=molang.js.map