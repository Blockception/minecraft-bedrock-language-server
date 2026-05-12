import { BulkRegistration, Connection, DidChangeConfigurationParams } from 'vscode-languageserver';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { BaseService } from '../services/base';
import { IService } from '../services/service';
export declare class ConfigurationService extends BaseService implements IService {
    name: string;
    constructor(logger: IExtendedLogger, extension: ExtensionContext);
    setupHandlers(connection: Connection): void;
    dynamicRegister(register: BulkRegistration): void;
    updateSettings(params?: DidChangeConfigurationParams): Promise<void>;
    start(): void;
}
//# sourceMappingURL=service.d.ts.map