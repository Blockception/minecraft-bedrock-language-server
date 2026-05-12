import { Range, SemanticTokens } from 'vscode-languageserver';
import { TextDocument } from '../../documents/text-document';
import { McfunctionSemanticTokensBuilder } from '../builders/mcfunction';
export declare function provideSemanticToken(doc: TextDocument, range?: Range | undefined): SemanticTokens;
export declare function McfunctionLineTokens(line: string, offset: number, Builder: McfunctionSemanticTokensBuilder): void;
//# sourceMappingURL=mcfunctions.d.ts.map