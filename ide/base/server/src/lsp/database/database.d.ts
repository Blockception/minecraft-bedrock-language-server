import { ParameterType } from 'bc-minecraft-bedrock-command';
import { ProjectData } from 'bc-minecraft-bedrock-project';
import { BaseObject } from 'bc-minecraft-bedrock-types';
import { CancellationToken, Location, WorkDoneProgressReporter } from 'vscode-languageserver';
import { InternalContext } from '../diagnostics/context';
import { IDocumentManager } from '../documents/manager';
import { IExtendedLogger } from '../logger/logger';
import { IService } from '../services/service';
import { Options } from './references';
import { WorkspaceData } from './workspace-data';
export interface forEachfn<T extends BaseObject> {
    forEach(callbackfn: (value: T) => void): void;
}
export declare class Database implements IService {
    readonly name: string;
    logger: IExtendedLogger;
    ProjectData: ProjectData;
    WorkspaceData: WorkspaceData;
    context: InternalContext;
    constructor(logger: IExtendedLogger, documents: IDocumentManager);
    /**
     *
     */
    clear(): void;
    getPacks(): any[];
    /**
     *
     * @param id
     * @param callbackfn
     */
    findReference(id: string, documents: IDocumentManager, options?: Options, token?: CancellationToken, workDoneProgress?: WorkDoneProgressReporter): Promise<Location[]>;
    /**
     *
     * @param id
     * @param callbackfn
     */
    findReferences(id: string, types?: ParameterType[] | undefined, token?: CancellationToken, workDoneProgress?: WorkDoneProgressReporter): Promise<BaseObject[]>;
    private internalSearchAll;
    private internalTypeSearch;
    forEach(callbackfn: (item: BaseObject) => void, token?: CancellationToken, workDoneProgress?: WorkDoneProgressReporter): Promise<void> | void;
}
//# sourceMappingURL=database.d.ts.map