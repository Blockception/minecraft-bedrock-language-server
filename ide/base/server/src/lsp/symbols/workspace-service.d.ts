import { CancellationToken, Connection, SymbolInformation, WorkDoneProgressReporter, WorkspaceSymbolParams } from 'vscode-languageserver';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { BaseService } from '../services/base';
import { CapabilityBuilder } from '../services/capabilities';
import { IService } from '../services/service';
export declare class WorkspaceSymbolService extends BaseService implements IService {
    readonly name: string;
    constructor(logger: IExtendedLogger, extension: ExtensionContext);
    onInitialize(capabilities: CapabilityBuilder): void;
    setupHandlers(connection: Connection): void;
    onWorkspaceSymbol(params: WorkspaceSymbolParams, token: CancellationToken, workDoneProgress: WorkDoneProgressReporter): Promise<SymbolInformation[]>;
}
//# sourceMappingURL=workspace-service.d.ts.map