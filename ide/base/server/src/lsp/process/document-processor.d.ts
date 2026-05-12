import { Connection } from 'vscode-languageserver';
import { DiagnoserService } from '../diagnostics/service';
import { ContentType } from '../documents/manager';
import { TextDocument } from '../documents/text-document';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { BaseService } from '../services/base';
import { IService } from '../services/service';
export declare class DocumentProcessor extends BaseService implements IService {
    name: string;
    private _diagnoser;
    constructor(logger: IExtendedLogger, extension: ExtensionContext, diagnoser: DiagnoserService);
    onInitialize(): void;
    setupHandlers(connection: Connection): void;
    private onDocumentChanged;
    get(uri: string): TextDocument;
    get(uri: string, content: ContentType): TextDocument;
    get(uri: string, content: ContentType, languageID: string): TextDocument;
    delete(uri: string): void;
    /**
     *
     * @param document
     */
    process(document: TextDocument): void;
    diagnose(doc: TextDocument): void | Promise<void>;
    private onDidDeleteFiles;
    private onDidCreateFiles;
    private onDidRenameFiles;
}
//# sourceMappingURL=document-processor.d.ts.map