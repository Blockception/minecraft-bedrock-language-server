"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRangeTokensWord = CreateRangeTokensWord;
exports.CreateRangeTokens = CreateRangeTokens;
exports.CreateNamespaced = CreateNamespaced;
const bc_vscode_words_1 = require("bc-vscode-words");
const vscode_languageserver_1 = require("vscode-languageserver");
const constants_1 = require("./constants");
/**
 *
 * @param word
 * @param builder
 */
function CreateRangeTokensWord(word, builder) {
    if (bc_vscode_words_1.OffsetWord.is(word)) {
        const range = vscode_languageserver_1.Range.create(builder.document.positionAt(word.offset), builder.document.positionAt(word.offset + word.text.length));
        word = new bc_vscode_words_1.RangedWord(word.text, range);
    }
    else if (bc_vscode_words_1.LocationWord.is(word)) {
        word = new bc_vscode_words_1.RangedWord(word.text, word.location.range);
    }
    CreateRangeTokens(word, builder);
}
/**
 *
 * @param word
 * @param builder
 * @returns
 */
function CreateRangeTokens(word, builder) {
    let value = word.text;
    let start = word.range.start.character;
    if (value.startsWith('~-') || value.startsWith('~+') || value.startsWith('^-') || value.startsWith('^+')) {
        builder.AddAt(word.range.start.line, start, 2, constants_1.SemanticTokensEnum.operator, constants_1.SemanticModifiersEnum.readonly);
        value = value.substring(2);
        start += 2;
    }
    else if (value.startsWith('~') ||
        value.startsWith('^') ||
        value.startsWith('-') ||
        value.startsWith('+') ||
        value.startsWith('+') ||
        value.startsWith('!')) {
        builder.AddAt(word.range.start.line, start, 1, constants_1.SemanticTokensEnum.operator, constants_1.SemanticModifiersEnum.readonly);
        value = value.substring(1);
        start++;
    }
    if (value === '')
        return;
    const range = value.indexOf('..');
    const line = word.range.start.line;
    if (range >= 0) {
        const first = value.substring(0, range);
        const second = value.substring(range + 2);
        //Builder.AddAt(Line, start + Range, 1, SemanticTokensEnum.operator);
        if (first && first !== '') {
            builder.AddAt(line, start + value.indexOf(first), first.length, constants_1.SemanticTokensEnum.number, constants_1.SemanticModifiersEnum.readonly);
        }
        if (second && second !== '') {
            builder.AddAt(line, start + value.indexOf(second), second.length, constants_1.SemanticTokensEnum.number, constants_1.SemanticModifiersEnum.readonly);
        }
    }
    else {
        builder.AddAt(line, start, value.length, constants_1.SemanticTokensEnum.number);
    }
}
/**
 *
 * @param word
 * @param builder
 */
function CreateNamespaced(word, builder) {
    const text = word.text;
    if (text.startsWith('"') || text.endsWith('"')) {
        builder.AddWord(word, constants_1.SemanticTokensEnum.string, constants_1.SemanticModifiersEnum.static);
        return;
    }
    let index = text.indexOf(':');
    if (index >= 0) {
        index += word.offset;
        //namespace
        builder.Add(word.offset, index, constants_1.SemanticTokensEnum.namespace, constants_1.SemanticModifiersEnum.static);
        //Value
        builder.Add(index + 1, word.offset + word.text.length, constants_1.SemanticTokensEnum.method, constants_1.SemanticModifiersEnum.static);
    }
    else {
        builder.AddWord(word, constants_1.SemanticTokensEnum.method, constants_1.SemanticModifiersEnum.readonly);
    }
}
//# sourceMappingURL=functions.js.map