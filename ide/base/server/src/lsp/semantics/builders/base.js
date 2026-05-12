"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSemanticTokensBuilder = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const constants_1 = require("../constants");
/**
 *
 */
class BaseSemanticTokensBuilder {
    builder;
    document;
    /**
     *
     * @param doc
     */
    constructor(doc) {
        this.document = doc;
        this.builder = new vscode_languageserver_1.SemanticTokensBuilder();
    }
    /**
     *
     * @returns
     */
    Build() {
        return this.builder.build();
    }
    /**
     *
     * @param offset
     * @returns
     */
    PositionAt(offset) {
        return this.document.positionAt(offset);
    }
    /**
     * Adds the given text locations into the tokens builder
     * @param startIndex
     * @param endIndex
     * @param tokenType
     * @param tokenModifier
     */
    Add(startIndex, endIndex, tokenType, tokenModifier = constants_1.SemanticModifiersEnum.declaration) {
        const p = this.document.positionAt(startIndex);
        const length = endIndex - startIndex;
        this.builder.push(p.line, p.character, length, tokenType, tokenModifier);
        return this;
    }
    /**
     *
     * @param word
     * @param tokenType
     * @param tokenModifier
     */
    AddWord(word, tokenType, tokenModifier = constants_1.SemanticModifiersEnum.declaration) {
        const p = this.document.positionAt(word.offset);
        const length = word.text.length;
        if (length > 0) {
            this.builder.push(p.line, p.character, length, tokenType, tokenModifier);
        }
        return this;
    }
    /**
     *
     * @param line
     * @param char
     * @param length
     * @param tokenType
     * @param tokenModifier
     */
    AddAt(line, char, length, tokenType, tokenModifier = constants_1.SemanticModifiersEnum.declaration) {
        this.builder.push(line, char, length, tokenType, tokenModifier);
        return this;
    }
}
exports.BaseSemanticTokensBuilder = BaseSemanticTokensBuilder;
//# sourceMappingURL=base.js.map