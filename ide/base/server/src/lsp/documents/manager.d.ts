import { CancellationToken, Connection, TextDocuments } from 'vscode-languageserver';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { ProgressBar } from '../progress';
import { BaseService } from '../services/base';
import { CapabilityBuilder } from '../services/capabilities';
import { IService } from '../services/service';
import { TextDocument } from './text-document';
import * as vscode from 'vscode-languageserver-textdocument';
export type ContentType = string | vscode.TextDocument | undefined;
export type IDocumentManager = Pick<DocumentManager, 'get' | 'forEach' | 'onDidChangeContent' | 'onDidClose' | 'onDidOpen' | 'onDidSave'>;
export declare class DocumentManager extends BaseService implements IService, Pick<TextDocuments<TextDocument>, 'onDidChangeContent' | 'onDidClose' | 'onDidOpen' | 'onDidSave'> {
    readonly name: string;
    private _documents;
    private _factory;
    constructor(logger: IExtendedLogger, extension: ExtensionContext);
    /** @inheritdoc */
    get onDidOpen(): import("vscode-languageserver").Event<import("vscode-languageserver").TextDocumentChangeEvent<TextDocument>>;
    /** @inheritdoc */
    get onDidChangeContent(): import("vscode-languageserver").Event<import("vscode-languageserver").TextDocumentChangeEvent<TextDocument>>;
    /** @inheritdoc */
    get onDidClose(): import("vscode-languageserver").Event<import("vscode-languageserver").TextDocumentChangeEvent<TextDocument>>;
    /** @inheritdoc */
    get onDidSave(): import("vscode-languageserver").Event<import("vscode-languageserver").TextDocumentChangeEvent<TextDocument>>;
    onInitialize(capabilities: CapabilityBuilder): void;
    setupHandlers(connection: Connection): void;
    get(uri: string): TextDocument | undefined;
    get(uri: string, content: ContentType): TextDocument | undefined;
    get(uri: string, content: ContentType, languageID: string): TextDocument | undefined;
    get(uri: string, content?: ContentType, languageID?: string): TextDocument | undefined;
    /**
     *
     * @param uris
     * @param callback
     * @param reporter
     * @returns
     */
    forEach(uris: string[], callback: (doc: TextDocument) => void, reporter: ProgressBar, token: CancellationToken): void | Promise<void>;
}
//# sourceMappingURL=manager.d.ts.map