import { ApplyWorkspaceEditResult, CreateFileOptions } from 'vscode-languageserver';
import { IExtensionContext } from '../extension';
export declare class TemplateBuilder {
    private receiver;
    readonly context: IExtensionContext;
    readonly options: CreateFileOptions;
    constructor(context: IExtensionContext);
    /**Sends the edits to the client*/
    send(): Promise<void>;
    createFile(uri: string, body: string): void;
    handleResponse(response: ApplyWorkspaceEditResult): void;
}
//# sourceMappingURL=builder.d.ts.map