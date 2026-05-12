import { Disposable } from 'vscode-languageserver';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
/**
 * The class that holds the base information most service will use
 */
export declare class BaseService {
    disposables: Disposable[];
    logger: IExtendedLogger;
    extension: ExtensionContext;
    /**
     * Creates a new instance of the BaseService class
     * @param logger The logger provided
     */
    constructor(logger: IExtendedLogger, extension: ExtensionContext);
    /** @inheritdoc */
    dispose(): void;
    /**
     * Adds the given objects as disposables and registers them to be disposed.
     * @param toDispose The object or subscription to dispose on server close
     */
    addDisposable(...toDispose: Disposable[]): void;
}
//# sourceMappingURL=base.d.ts.map