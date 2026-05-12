"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideJsonSemanticTokens = provideJsonSemanticTokens;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const functions_1 = require("../../../minecraft/molang/functions");
const words_1 = require("../../../minecraft/molang/words");
const json_1 = require("../builders/json");
const mcfunction_1 = require("../builders/mcfunction");
const mcfunctions_1 = require("./mcfunctions");
const molang_1 = require("./molang");
function provideJsonSemanticTokens(doc, range) {
    //Not related to minecraft
    const types = bc_minecraft_bedrock_project_1.PackType.detect(doc.uri);
    if (types == bc_minecraft_bedrock_project_1.PackType.unknown)
        return { data: [] };
    const builder = new json_1.JsonSemanticTokensBuilder(doc);
    const text = doc.getText(range);
    const offset = range ? doc.offsetAt(range.start) : 0;
    createTokens(text, offset, builder);
    return builder.Build();
}
/**
 *
 * @param text
 * @param offset
 * @param Builder
 */
function createTokens(text, offset, Builder) {
    let index = 0;
    while (index >= 0) {
        let startIndex = findNext(text, index);
        if (startIndex < 0)
            return;
        const endIndex = findNext(text, startIndex + 1);
        if (endIndex < 0)
            return;
        startIndex++;
        const property = text.substring(startIndex, endIndex);
        index = endIndex + 1;
        const c = text.charAt(endIndex + 1);
        if (c !== ':' && (0, functions_1.IsMolang)(property)) {
            (0, mcfunctions_1.McfunctionLineTokens)(property, offset + startIndex, mcfunction_1.McfunctionSemanticTokensBuilder.FromJson(Builder));
            const Words = (0, words_1.CreateMolangWords)(property, offset + startIndex);
            (0, molang_1.ConvertWords)(Words, Builder);
        }
    }
}
function findNext(text, startIndex) {
    while (startIndex > -1 && startIndex < text.length) {
        startIndex = text.indexOf('"', startIndex);
        if (startIndex < 0)
            break;
        if (text.charAt(startIndex - 1) === '\\' && text.charAt(startIndex - 2) !== '\\') {
            startIndex++;
            continue;
        }
        return startIndex;
    }
    return -1;
}
//# sourceMappingURL=json.js.map