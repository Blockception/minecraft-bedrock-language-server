import { OffsetWord } from 'bc-vscode-words';
import { Position, SignatureHelp } from 'vscode-languageserver';
import { TextDocument } from '../../../documents/text-document';
/**
 *
 * @param doc
 * @param cursor
 * @returns
 */
export declare function provideDocSignature(doc: TextDocument, cursor: Position): SignatureHelp | undefined;
/**
 *
 * @param text
 * @param cursor
 * @param doc
 * @returns
 */
export declare function provideSignature(text: OffsetWord, cursor: number): SignatureHelp | undefined;
/**
 *
 * @param text
 * @returns
 */
export declare function provideWordSignature(text: OffsetWord, cursor: number, parameters: OffsetWord[]): SignatureHelp | undefined;
//# sourceMappingURL=main.d.ts.map