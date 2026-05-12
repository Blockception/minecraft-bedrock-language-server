import { Range } from 'vscode-languageserver';
import { Position } from 'vscode-languageserver-textdocument';
import { ExtensionContext } from '../extension';
import { WrappedTextDocument } from './text-document';
import * as vscode from 'vscode-languageserver-textdocument';
/** A class that help */
export declare class JsonDocument extends WrappedTextDocument {
    /**
     *
     */
    private object;
    /**
     *
     * @param doc
     */
    constructor(document: vscode.TextDocument, extension: ExtensionContext);
    /**
     * Retrieves the json object from the given contents. if failed a null or undefined is returned
     * @returns The object as T or any
     */
    getObject<T = any>(): T | undefined | null;
    /**
     * Retrieves the json object from the given contents. if failed a the error is returned
     * @returns The object as T or any
     */
    getObjectError(): {
        value: any | undefined | null;
        error: any;
    };
    /**
     * Tries to find the range of the given text.
     * @param name The name of the property to find,
     * @param value The value of the property to find
     */
    getRange(name: string, value: string): Range | undefined;
    /**
     * Tries to find the rangeOf the given value in the text
     * @param value The value to look for
     * @returns
     */
    rangeOf(value: string): Range | undefined;
    /**
     * Tries to find the range of the given property
     * @param Name The name of the property to find
     */
    getRangeOfObject(Name: string): Range | undefined;
    /**
     *
     * @param Name
     * @returns
     */
    getStartOfObject(Name: string): Position | undefined;
    /**
     *
     * @param value
     * @returns
     */
    getPositionOf(value: string): Position | undefined;
}
//# sourceMappingURL=json-document.d.ts.map