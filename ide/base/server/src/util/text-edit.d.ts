import { TextEdit } from 'vscode-languageserver';
/**
 *
 * @param line
 * @param oldText
 * @param newText
 * @param lineIndex
 * @param receiver
 */
export declare function Replace(line: string, oldText: string, newText: string, lineIndex: number, receiver: TextEdit[]): void;
/**
 * Loop through starting character to filters out empty characters and slashes
 * @param line The line to edit
 * @param index The index of the line
 * @param receiver
 * @param toRemove
 */
export declare function TrimStartFromLine(line: string, index: number, receiver: TextEdit[], toRemove: string[]): void;
/**
 *
 * @param line
 * @param index
 * @param receiver
 * @param toRemove*/
export declare function TrimEndFromLine(line: string, index: number, receiver: TextEdit[], toRemove: string[]): void;
//# sourceMappingURL=text-edit.d.ts.map