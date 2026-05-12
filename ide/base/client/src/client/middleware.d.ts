import { CancellationToken, CodeLens } from 'vscode';
import { ResolveCodeLensSignature } from 'vscode-languageclient/node';
export declare function resolveCodeLens(codeLens: CodeLens, token: CancellationToken, next: ResolveCodeLensSignature): Thenable<CodeLens>;
//# sourceMappingURL=middleware.d.ts.map