import { Pack } from 'bc-minecraft-bedrock-project';
import { CancellationToken, Connection, WorkspaceFolder } from 'vscode-languageserver';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { BaseService } from '../services/base';
import { IService } from '../services/service';
import { PackProcessor } from './pack-processor';
export declare class WorkspaceProcessor extends BaseService implements IService {
    name: string;
    private _packProcessor;
    constructor(logger: IExtendedLogger, extension: ExtensionContext, packProcessor: PackProcessor);
    onInitialize(): void;
    setupHandlers(connection: Connection): void;
    /**
     * Watch for project files being update that might changes settings for the workspace
     * @param e
     * @returns
     */
    private onDocumentChanged;
    /**
     * The event that is called when any workspaces are added / removed
     * @param params
     */
    private onWorkspaceFolderChanged;
    start(token?: CancellationToken): void;
    traverse(token?: CancellationToken): Promise<void>;
    process(workspace: WorkspaceFolder, token?: CancellationToken): Promise<void>;
    remove(workspace: WorkspaceFolder, token?: CancellationToken): Promise<true | void[]>;
    diagnose(workspace: WorkspaceFolder, token?: CancellationToken): Promise<void>;
    packs(workspace: WorkspaceFolder): Promise<Pack[]>;
    /**
     * Retrieves all the workspaces the IDE has open, if an error occurs, an empty [] is returned.
     * @returns
     */
    get(): Promise<WorkspaceFolder[] | null>;
}
//# sourceMappingURL=workspace-processor.d.ts.map