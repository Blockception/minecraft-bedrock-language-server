import { OffsetWord } from 'bc-vscode-words';
import { SemanticTokens, SemanticTokensBuilder } from 'vscode-languageserver';
import { Position } from 'vscode-languageserver-textdocument';
import { TextDocument } from '../../documents/text-document';
import { SemanticModifiersEnum, SemanticTokensEnum } from '../constants';
/**
 *
 */
export declare class BaseSemanticTokensBuilder {
    builder: SemanticTokensBuilder;
    document: Pick<TextDocument, "positionAt" | "configuration">;
    /**
     *
     * @param doc
     */
    constructor(doc: Pick<TextDocument, "positionAt" | "configuration">);
    /**
     *
     * @returns
     */
    Build(): SemanticTokens;
    /**
     *
     * @param offset
     * @returns
     */
    PositionAt(offset: number): Position;
    /**
     * Adds the given text locations into the tokens builder
     * @param startIndex
     * @param endIndex
     * @param tokenType
     * @param tokenModifier
     */
    Add(startIndex: number, endIndex: number, tokenType: SemanticTokensEnum, tokenModifier?: SemanticModifiersEnum): this;
    /**
     *
     * @param word
     * @param tokenType
     * @param tokenModifier
     */
    AddWord(word: OffsetWord, tokenType: SemanticTokensEnum, tokenModifier?: SemanticModifiersEnum): this;
    /**
     *
     * @param line
     * @param char
     * @param length
     * @param tokenType
     * @param tokenModifier
     */
    AddAt(line: number, char: number, length: number, tokenType: SemanticTokensEnum, tokenModifier?: SemanticModifiersEnum): this;
}
//# sourceMappingURL=base.d.ts.map