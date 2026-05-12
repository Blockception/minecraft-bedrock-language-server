import { CreateFileOptions, ApplyWorkspaceEditResult, Connection } from 'vscode-languageserver';
import { IExtendedLogger } from '../lsp/logger/logger';
/**
 *
 */
export declare class FileBuilder {
    private _connection;
    private _logger;
    private _receiver;
    options: CreateFileOptions;
    constructor(connection: Connection, logger: IExtendedLogger);
    /**
     * Sends the edits to the client
     * @returns
     */
    send(): Promise<void>;
    /**
     *
     * @param uri
     * @param content
     * @returns
     */
    create(uri: string, content: string): void;
    /**
     * Delete a file or folder via workspace edit
     * @param uri vscode uri
     */
    delete(uri: string, recursive?: boolean): void;
    /**
     *
     * @param response
     * @returns
     */
    response(response: ApplyWorkspaceEditResult): void;
}
//# sourceMappingURL=file-builder.d.ts.map