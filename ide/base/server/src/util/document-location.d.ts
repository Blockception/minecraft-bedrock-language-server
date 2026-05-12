import { DocumentLocation } from 'bc-minecraft-bedrock-shared';
import { Range } from 'vscode-languageserver';
import * as vstd from 'vscode-languageserver-textdocument';
/**
 *
 * @param position
 * @param doc
 * @returns
 */
export declare function GetRange(position: DocumentLocation, doc: vstd.TextDocument): Range;
export declare function GetPosition(position: DocumentLocation, doc: vstd.TextDocument): vstd.Position;
/**Resolves a json path to a range
 * @param path The json path to resolve
 * @param doc The document that the path is in
 * @returns A range of where the object is*/
export declare function resolveJsonPath(path: string, doc: vstd.TextDocument): Range;
//# sourceMappingURL=document-location.d.ts.map