import { Range } from 'vscode-languageserver-textdocument';
import { SemanticTokens } from 'vscode-languageserver/node';
import { TextDocument } from '../../documents/text-document';
export declare function provideJsonSemanticTokens(doc: Pick<TextDocument, 'getText' | 'offsetAt' | 'uri' | 'positionAt' | 'configuration'>, range?: Range | undefined): SemanticTokens;
//# sourceMappingURL=json.d.ts.map