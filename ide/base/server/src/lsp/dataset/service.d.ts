import { Connection } from 'vscode-languageserver';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { BaseService } from '../services/base';
import { IService } from '../services/service';
/** Parameters for a dataset request */
export interface DataSetRequestParams {
    /** The type of dataset to retrieve (e.g. 'vanilla/behavior_pack/blocks') */
    datatype: string;
    /** Optional identifier to filter results to a single entry within the dataset */
    id?: string;
}
/** The service that handles dataset requests from the client */
export declare class DataSetService extends BaseService implements IService {
    readonly name: string;
    constructor(logger: IExtendedLogger, extension: ExtensionContext);
    setupHandlers(connection: Connection): void;
    private onDataSetRequest;
}
//# sourceMappingURL=service.d.ts.map