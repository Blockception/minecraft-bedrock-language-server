import { LocationWord, OffsetWord, RangedWord } from 'bc-vscode-words';
import { McfunctionSemanticTokensBuilder } from './builders/mcfunction';
/**
 *
 * @param word
 * @param builder
 */
export declare function CreateRangeTokensWord(word: LocationWord | RangedWord | OffsetWord, builder: McfunctionSemanticTokensBuilder): void;
/**
 *
 * @param word
 * @param builder
 * @returns
 */
export declare function CreateRangeTokens(word: RangedWord, builder: McfunctionSemanticTokensBuilder): void;
/**
 *
 * @param word
 * @param builder
 */
export declare function CreateNamespaced(word: OffsetWord, builder: McfunctionSemanticTokensBuilder): void;
//# sourceMappingURL=functions.d.ts.map