import { Connection } from 'vscode-languageserver';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { BaseService } from '../services/base';
import { CapabilityBuilder } from '../services/capabilities';
import { IService } from '../services/service';
export declare class ReferenceService extends BaseService implements IService {
    name: string;
    constructor(logger: IExtendedLogger, extension: ExtensionContext);
    onInitialize(capabilities: CapabilityBuilder): void;
    setupHandlers(connection: Connection): void;
    private onReferences;
}
//# sourceMappingURL=references-service.d.ts.map