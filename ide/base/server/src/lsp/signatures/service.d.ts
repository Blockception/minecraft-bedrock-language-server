import { Connection, SignatureHelp, SignatureHelpParams } from 'vscode-languageserver';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { BaseService } from '../services/base';
import { CapabilityBuilder } from '../services/capabilities';
import { IService } from '../services/service';
export declare class SignatureService extends BaseService implements IService {
    readonly name: string;
    constructor(logger: IExtendedLogger, extension: ExtensionContext);
    onInitialize(capabilities: CapabilityBuilder): void;
    setupHandlers(connection: Connection): void;
    onSignatureHelp(params: SignatureHelpParams): Promise<SignatureHelp | undefined>;
}
//# sourceMappingURL=service.d.ts.map