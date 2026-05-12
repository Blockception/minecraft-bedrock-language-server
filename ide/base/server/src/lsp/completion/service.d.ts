import { CancellationToken, CompletionItem, CompletionList, CompletionParams, Connection, ResponseError, WorkDoneProgressReporter } from 'vscode-languageserver';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { BaseService } from '../services/base';
import { CapabilityBuilder } from '../services/capabilities';
import { IService } from '../services/service';
export declare class CompletionService extends BaseService implements IService {
    readonly name: string;
    constructor(logger: IExtendedLogger, extension: ExtensionContext);
    onInitialize(capabilities: CapabilityBuilder): void;
    setupHandlers(connection: Connection): void;
    onCompletionResolve(params: CompletionItem): CompletionItem;
    onCompletion(params: CompletionParams, token: CancellationToken, workDoneProgress: WorkDoneProgressReporter): ResponseError<void> | CompletionItem[] | CompletionList | undefined | null;
}
//# sourceMappingURL=service.d.ts.map