import { SignatureHelp } from 'vscode-languageserver';
import { TextDocument } from '../../documents/text-document';
/**
 *
 * @param line
 * @param startOffset
 * @param cursorOffset
 * @param doc
 * @returns
 */
export declare function provideSignature(line: string, startOffset: number, cursorOffset: number, doc: TextDocument): SignatureHelp | undefined;
//# sourceMappingURL=commands.d.ts.map