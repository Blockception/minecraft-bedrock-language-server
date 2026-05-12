import { BulkRegistration, CancellationToken, Connection, DocumentFormattingParams, DocumentRangeFormattingParams, TextEdit, WorkDoneProgressReporter } from 'vscode-languageserver';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { BaseService } from '../services/base';
import { IService } from '../services/service';
export declare class FormatService extends BaseService implements IService {
    name: string;
    constructor(logger: IExtendedLogger, extension: ExtensionContext);
    dynamicRegister(register: BulkRegistration): void;
    setupHandlers(connection: Connection): void;
    onDocumentFormatting(params: DocumentFormattingParams, token: CancellationToken, workDoneProgress: WorkDoneProgressReporter): Promise<TextEdit[] | undefined | null>;
    onDocumentRangeFormatting(params: DocumentRangeFormattingParams, token: CancellationToken, workDoneProgress: WorkDoneProgressReporter): Promise<TextEdit[] | undefined | null>;
}
//# sourceMappingURL=service.d.ts.map