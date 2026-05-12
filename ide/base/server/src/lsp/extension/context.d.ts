import { ClientCapabilities, Connection } from 'vscode-languageserver';
import { Database } from '../database/database';
import { IDocumentManager } from '../documents/manager';
import { IExtendedLogger } from '../logger/logger';
import { ServiceManager } from '../services/collection';
import { ExtensionCapabilities } from './capabilities';
import { Settings } from './settings';
import { State } from './state';
import { LSPConfig } from '../config/config';
export interface IExtensionContext {
    capabilities: ExtensionCapabilities;
    connection: Connection;
    config: LSPConfig;
    database: Database;
    documents: IDocumentManager;
    logger: IExtendedLogger;
    state: State;
    settings: Settings;
    services: ServiceManager;
}
export declare class ExtensionContext implements IExtensionContext {
    capabilities: ExtensionCapabilities;
    connection: Connection;
    config: LSPConfig;
    database: Database;
    documents: IDocumentManager;
    logger: IExtendedLogger;
    services: ServiceManager;
    settings: Settings;
    state: State;
    constructor(config: LSPConfig, connection: Connection, services: ServiceManager, logger: IExtendedLogger, documents: IDocumentManager, database: Database);
    parseClientCapabilities(capabilities: ClientCapabilities): void;
}
//# sourceMappingURL=context.d.ts.map