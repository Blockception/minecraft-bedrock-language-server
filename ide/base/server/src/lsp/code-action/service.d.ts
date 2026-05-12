import { Connection, Diagnostic } from 'vscode-languageserver';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { BaseService } from '../services/base';
import { CapabilityBuilder } from '../services/capabilities';
import { IService } from '../services/service';
import { CodeActionBuilder } from './builder';
export declare class CodeActionService extends BaseService implements IService {
    name: string;
    constructor(logger: IExtendedLogger, extension: ExtensionContext);
    onInitialize(capabilities: CapabilityBuilder): void;
    setupHandlers(connection: Connection): void;
    private onCodeActionResolve;
    private onCodeAction;
    findAction(builder: CodeActionBuilder, diag: Diagnostic): Promise<void>;
}
//# sourceMappingURL=service.d.ts.map