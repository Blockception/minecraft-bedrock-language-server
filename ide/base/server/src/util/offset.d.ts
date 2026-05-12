import { OffsetWord } from 'bc-vscode-words';
/**
 *
 */
export declare namespace Offset {
    /**
     *
     * @param word
     * @param pos
     */
    function isWithin(word: OffsetWord, pos: number): boolean;
    /**
     *
     * @param word
     * @param pos
     */
    function isAfter(word: OffsetWord, pos: number): boolean;
    function charAt(word: OffsetWord, pos: number): string;
}
//# sourceMappingURL=offset.d.ts.map