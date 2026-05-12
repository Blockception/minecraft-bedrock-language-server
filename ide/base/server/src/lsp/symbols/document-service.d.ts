import { CancellationToken, Connection, DocumentSymbol, DocumentSymbolParams, SymbolInformation, WorkDoneProgressReporter } from 'vscode-languageserver';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { BaseService } from '../services/base';
import { CapabilityBuilder } from '../services/capabilities';
import { IService } from '../services/service';
export declare class DocumentSymbolService extends BaseService implements IService {
    readonly name: string;
    constructor(logger: IExtendedLogger, extension: ExtensionContext);
    onInitialize(capabilities: CapabilityBuilder): void;
    setupHandlers(connection: Connection): void;
    onDocumentSymbol(params: DocumentSymbolParams, token: CancellationToken, workDoneProgress: WorkDoneProgressReporter): Promise<SymbolInformation[] | DocumentSymbol[]>;
}
//# sourceMappingURL=document-service.d.ts.map