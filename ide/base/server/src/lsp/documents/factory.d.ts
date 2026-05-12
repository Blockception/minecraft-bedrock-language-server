import { DocumentUri, TextDocumentContentChangeEvent, TextDocumentsConfiguration } from 'vscode-languageserver';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { BaseService } from '../services/base';
import { TextDocument } from './text-document';
import * as vscode from 'vscode-languageserver-textdocument';
export declare class TextDocumentFactory extends BaseService implements TextDocumentsConfiguration<TextDocument> {
    readonly name: string;
    constructor(logger: IExtendedLogger, extension: ExtensionContext);
    /**
     * Extends the vscode document into an internal format.
     * @param doc The document to enhance
     * @returns A upgraded version
     */
    extend(doc: vscode.TextDocument): TextDocument;
    /** @inheritdoc */
    create(uri: DocumentUri, languageId: string, version: number, content: string): TextDocument;
    /** @inheritdoc */
    update(document: TextDocument, changes: TextDocumentContentChangeEvent[], version: number): TextDocument;
}
//# sourceMappingURL=factory.d.ts.map