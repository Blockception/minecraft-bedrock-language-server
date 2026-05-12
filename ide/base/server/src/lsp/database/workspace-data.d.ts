import { MCProject } from 'bc-minecraft-project';
import { WorkspaceFolder } from 'vscode-languageserver';
import { Settings } from '../extension';
/**
 *
 */
export declare class WorkspaceData {
    /**<Workspace Uri, Project Data> */
    private _data;
    constructor();
    /**
     *
     * @param uri
     */
    getProject(docUri: string, settings: Settings): MCProject;
    /**Gets the workspace folder that corresponds to the given document
     * @param uri The document uri to compare*/
    getFolder(docUri: string): string | undefined;
    /**
     *
     * @returns
     */
    getFirst(): string | undefined;
    /**
     *
     * @param Folder
     * @param Data
     */
    set(Folder: WorkspaceFolder | string, Data: MCProject): void;
    /**
     *
     * @param Folder
     * @returns
     */
    remove(Folder: WorkspaceFolder | string): boolean;
    /**
     *
     * @param callbackfn
     * @param thisArg
     */
    forEach(callbackfn: (value: MCProject, workspaceUri: string, map: Map<string, MCProject>) => void, thisArg?: any): void;
    clear(): void;
}
//# sourceMappingURL=workspace-data.d.ts.map