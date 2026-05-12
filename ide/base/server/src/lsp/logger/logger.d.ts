import { RemoteConsole } from 'vscode-languageserver';
export type ILogger = Pick<RemoteConsole, 'error' | 'warn' | 'info' | 'log' | 'debug'>;
export type IExtendedLogger = Pick<ExtendedLogger, keyof ILogger | 'with' | 'withPrefix' | 'recordError'>;
export declare class ExtendedLogger implements IExtendedLogger {
    private logger;
    private prefix;
    private additionals;
    constructor(logger: ILogger, prefix?: string, additionals?: any[]);
    private render;
    /**
     * Logs an error message, with optional additional information
     * @param message The message to log
     * @param additionals Additional information to log
     */
    error(message: string, ...additionals: any[]): void;
    /**
     * Logs a warning message, with optional additional information
     * @param message The message to log
     * @param additionals Additional information to log
     */
    warn(message: string, ...additionals: any[]): void;
    /**
     * Logs an informational message, with optional additional information
     * @param message The message to log
     * @param additionals Additional information to log
     */
    info(message: string, ...additionals: any[]): void;
    /**
     * Logs a message, with optional additional information
     * @param message The message to log
     * @param additionals Additional information to log
     */
    log(message: string, ...additionals: any[]): void;
    /**
     * Logs a debug message, with optional additional information
     * @param message The message to log
     * @param additionals Additional information to log
     */
    debug(message: string, ...additionals: any[]): void;
    /**
     * Adds a prefix to all the logging
     * @param prefix The prefix to add
     * @returns A new logger
     */
    withPrefix(prefix: string): IExtendedLogger;
    /**
     * Adds the given additionals to the logger
     * @param additionals The additional objects to add
     * @returns Returns a new logger
     */
    with(...additionals: any): IExtendedLogger;
    recordError(err: any, doc?: {
        uri: string;
    } | string): void;
}
//# sourceMappingURL=logger.d.ts.map