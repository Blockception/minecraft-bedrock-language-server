import { Pack } from 'bc-minecraft-bedrock-project';
import { CancellationToken } from 'vscode-languageserver';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { BaseService } from '../services/base';
import { DocumentProcessor } from './document-processor';
export declare class PackProcessor extends BaseService {
    name: string;
    private _documentProcessor;
    constructor(logger: IExtendedLogger, extension: ExtensionContext, documentProcessor: DocumentProcessor);
    process(pack: Pack, token?: CancellationToken): Promise<void>;
    remove(pack: Pack): void;
    private removePack;
    diagnose(pack: Pack, token?: CancellationToken): Promise<void>;
    /**
     *
     * @param folder The vscode uri of the base folder to start explorer from
     * @returns
     */
    discover(folder: string): Promise<Pack[]>;
    /**
     *
     * @param folder The vscode uri of the base folder to start explorer from
     * @returns
     */
    get(): Pack[];
    files(pack: Pack): string[];
}
//# sourceMappingURL=pack-processor.d.ts.map