import { MCProject } from 'bc-minecraft-project';
import { Range } from 'vscode-languageserver';
import { MCProjectprovider } from '../../project/interfaces';
import { ExtensionContext } from '../extension/context';
import * as mcbe from 'bc-minecraft-bedrock-project';
import * as vscode from 'vscode-languageserver-textdocument';
/**
 * The extended text document to give additional code for documents
 */
export interface TextDocument extends vscode.TextDocument, mcbe.TextDocument, MCProjectprovider {
    /**
     * Returns the text at the given text line
     * @param lineIndex The index of the line to retrieve
     */
    getLine(lineIndex: number): string;
    /**
     * Returns the configuration of the text document
     */
    configuration(): MCProject;
    /**
     * Returns the associated pack to the file
     */
    pack(): mcbe.Pack | undefined;
    /**
     * Returns the filename of the document being worked on
     */
    filename(): string;
    /**
     * Returns the extension context
     */
    extension(): ExtensionContext;
}
export declare class WrappedTextDocument implements TextDocument, MCProjectprovider {
    protected _document: vscode.TextDocument;
    /**A hidden field that helps with storing the cache */
    protected _pack: mcbe.Pack | null | undefined;
    protected _extension: ExtensionContext;
    constructor(document: vscode.TextDocument, extension: ExtensionContext);
    get base(): vscode.TextDocument;
    /** @inheritdoc */
    get uri(): string;
    /** @inheritdoc */
    get languageId(): string;
    /** @inheritdoc */
    get version(): number;
    /** @inheritdoc */
    get lineCount(): number;
    /** @inheritdoc */
    getText(range?: Range): string;
    /** @inheritdoc */
    positionAt(offset: number): vscode.Position;
    /** @inheritdoc */
    offsetAt(position: vscode.Position): number;
    /** @inheritdoc */
    pack(): mcbe.Pack | undefined;
    /** @inheritdoc */
    configuration(): MCProject;
    /** @inheritdoc */
    filename(): string;
    /** @inheritdoc */
    extension(): ExtensionContext;
    /** @inheritdoc */
    getLine(lineIndex: number): string;
}
//# sourceMappingURL=text-document.d.ts.map