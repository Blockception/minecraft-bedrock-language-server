import { BulkRegistration, CancellationToken, Connection, InitializeParams, WorkDoneProgressReporter } from 'vscode-languageserver';
import { IExtendedLogger } from '../logger/logger';
import { CapabilityBuilder } from './capabilities';
import { IService } from './service';
/**
 * Represents a collection of services
 */
export declare class ServiceManager implements IService {
    /** @inheritdoc */
    readonly name: string;
    private logger;
    services: IService[];
    constructor(logger: IExtendedLogger);
    /**
     * Adds a service to the collection
     * @param service The service to add
     */
    add(...services: IService[]): this;
    /** @inheritdoc */
    dispose(): void;
    /** @inheritdoc */
    onInitialize(capabilities: CapabilityBuilder, params: InitializeParams, token?: CancellationToken, workDoneProgress?: WorkDoneProgressReporter): void;
    /** @inheritdoc */
    setupHandlers(connection: Connection): void;
    /** @inheritdoc */
    dynamicRegister(register: BulkRegistration): void;
    /** @inheritdoc */
    start(): Promise<void>;
    /** @inheritdoc */
    stop(): void;
    service<T>(constructor: new (...args: any[]) => T): T | undefined;
}
//# sourceMappingURL=collection.d.ts.map