import { OffsetWord } from 'bc-vscode-words';
import { Range } from 'vscode-languageserver-textdocument';
import { SemanticTokens } from 'vscode-languageserver/node';
import { TextDocument } from '../../documents/text-document';
import { JsonSemanticTokensBuilder } from '../builders/json';
import { MolangSemanticTokensBuilder } from '../builders/molang';
/**
 *
 * @param document
 * @param range
 * @returns
 */
export declare function provideMolangSemanticTokens(document: TextDocument, range?: Range | undefined): SemanticTokens;
/**
 *
 * @param words
 * @param builder
 */
export declare function ConvertWords(words: OffsetWord[], builder: JsonSemanticTokensBuilder | MolangSemanticTokensBuilder): void;
//# sourceMappingURL=molang.d.ts.map