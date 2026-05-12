"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSelectorTokens = CreateSelectorTokens;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const json_1 = require("bc-minecraft-bedrock-types/src/minecraft/json");
const bc_vscode_words_1 = require("bc-vscode-words");
const constants_1 = require("../constants");
const functions_1 = require("../functions");
function CreateSelectorTokens(word, builder) {
    if (word.text.startsWith('@')) {
        const sel = bc_minecraft_bedrock_types_1.Minecraft.Selector.Selector.parse(word.text, word.offset);
        if (sel === undefined)
            return;
        builder.Add(word.offset, word.offset + 2, constants_1.SemanticTokensEnum.enumMember, constants_1.SemanticModifiersEnum.static);
        sel.forEach((attr) => {
            ProcessParameters(attr, builder);
        });
    }
    else {
        builder.AddWord(word, constants_1.SemanticTokensEnum.enumMember, constants_1.SemanticModifiersEnum.static);
    }
}
function ProcessParameters(parameter, builder) {
    const key = parameter.key || '';
    const offset = parameter.offset;
    const name = new bc_vscode_words_1.OffsetWord(key, parameter.offset);
    if (json_1.CompactJson.hasKey(parameter)) {
        builder.AddWord(name, constants_1.SemanticTokensEnum.parameter, constants_1.SemanticModifiersEnum.readonly);
        builder.Add(offset, offset + key.length, constants_1.SemanticTokensEnum.parameter, constants_1.SemanticModifiersEnum.readonly);
    }
    if (parameter.isArrayOrObject()) {
        parameter.forEach((attr) => ProcessParameters(attr, builder));
        return;
    }
    if (!parameter.isString()) {
        return;
    }
    const value = json_1.CompactJson.valueToOffsetWord(parameter);
    switch (key) {
        case 'name':
            builder.AddWord(value, constants_1.SemanticTokensEnum.string);
            break;
        case 'tag':
            builder.AddWord(value, constants_1.SemanticTokensEnum.regexp, constants_1.SemanticModifiersEnum.readonly);
            break;
        case 'type':
            (0, functions_1.CreateNamespaced)(value, builder);
            break;
        case 'item':
            builder.AddWord(name, constants_1.SemanticTokensEnum.property, constants_1.SemanticModifiersEnum.readonly);
            (0, functions_1.CreateNamespaced)(value, builder);
            break;
        case 'slot':
        case 'location':
            builder.AddWord(name, constants_1.SemanticTokensEnum.enumMember);
            break;
        case 'data':
        case 'quantity':
        default:
            (0, functions_1.CreateRangeTokensWord)(value, builder);
            break;
    }
}
//# sourceMappingURL=selectors.js.map