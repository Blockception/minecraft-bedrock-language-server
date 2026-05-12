import { Position } from 'vscode-languageserver-textdocument';
import { SignatureHelp } from 'vscode-languageserver';
import { TextDocument } from '../../documents/text-document';
/**
 * Provides the signature of the command
 * @param doc
 * @param pos
 * @returns
 */
export declare function provideSignature(doc: TextDocument, pos: Position): SignatureHelp | undefined;
//# sourceMappingURL=mcfunctions.d.ts.map