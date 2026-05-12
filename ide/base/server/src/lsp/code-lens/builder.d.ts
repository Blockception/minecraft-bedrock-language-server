import { CancellationToken, CodeLens, CodeLensParams } from 'vscode-languageserver';
/**
 *
 */
export declare class CodeLensBuilder {
    params: CodeLensParams;
    token: CancellationToken;
    out: CodeLens[];
    /**
     *
     * @param params
     */
    constructor(params: CodeLensParams, token: CancellationToken);
    /**
     *
     * @param item
     */
    push(item: CodeLens): void;
}
//# sourceMappingURL=builder.d.ts.map