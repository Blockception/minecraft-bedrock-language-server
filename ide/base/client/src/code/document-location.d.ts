import { Position, Range, TextDocument } from 'vscode';
/**
 * @param position
 * @param doc
 * @returns
 */
export declare function GetRange(position: string | number | Position, doc: TextDocument): Range;
export declare function GetPosition(position: string | number | Position | OffsetWord, doc: TextDocument): Position;
interface OffsetWord {
    text: string;
    offset: number;
}
declare namespace OffsetWord {
    function is(value: any): value is OffsetWord;
}
export declare function resolveJsonPath(position: string, doc: TextDocument): Range;
export declare function resolve(text: string | {
    getText(): string;
}, path: string): number;
export {};
//# sourceMappingURL=document-location.d.ts.map