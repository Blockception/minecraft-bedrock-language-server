import { Connection, DeleteFilesParams, Diagnostic } from 'vscode-languageserver';
import { TextDocument } from '../documents';
import { IDocumentManager } from '../documents/manager';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { BaseService } from '../services/base';
import { IService } from '../services/service';
export declare class DiagnoserService extends BaseService implements IService {
    name: string;
    private _context;
    private _diagnoser;
    constructor(logger: IExtendedLogger, extension: ExtensionContext, documents: IDocumentManager);
    setupHandlers(connection: Connection): void;
    diagnose(doc: TextDocument): void;
    set(doc: Pick<TextDocument, 'uri'> & Partial<Pick<TextDocument, 'version'>>, diagnostics: Diagnostic[]): Promise<void>;
    clear(doc: Pick<TextDocument, 'uri'> & Partial<Pick<TextDocument, 'version'>>): Promise<void>;
    onDidDeleteFiles(params: DeleteFilesParams): void;
}
//# sourceMappingURL=service.d.ts.map