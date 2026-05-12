import { URI } from 'vscode-uri';
import { IExtendedLogger } from '../logger/logger';
/**
 * Tries to read the file from disk
 * @param uri The vscode uri of the document to retrieve
 * @param logger The logger to report error and information to
 * @returns The contents of the file or undefined when an error occured
 */
export declare function readDocument(uri: URI, logger: IExtendedLogger): string | undefined;
//# sourceMappingURL=io.d.ts.map