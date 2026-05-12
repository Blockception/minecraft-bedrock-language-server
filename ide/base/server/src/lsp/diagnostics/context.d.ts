import { DiagnoserContext } from 'bc-minecraft-bedrock-diagnoser';
import { MinecraftData, ProjectData } from 'bc-minecraft-bedrock-project';
import { MCIgnore, MCProject } from 'bc-minecraft-project';
import { IDocumentManager } from '../documents/manager';
import { TextDocument } from '../documents/text-document';
import { IExtendedLogger } from '../logger/logger';
import { InternalDiagnoser } from './diagnoser';
export declare class InternalContext implements DiagnoserContext<TextDocument> {
    private getCacheFn;
    private logger;
    private documents;
    private _onDiagnosingDone;
    private _getFilesCache;
    constructor(logger: IExtendedLogger, documents: IDocumentManager, getCacheFn: () => ProjectData);
    get onDiagnosingFinished(): import("vscode-languageserver").Event<InternalDiagnoser>;
    /**@inheritdoc*/
    getDiagnoser(doc: TextDocument, project: MCProject): InternalDiagnoser | undefined;
    /**@inheritdoc*/
    getDocument(uri: string): TextDocument | undefined;
    /**@inheritdoc*/
    getFiles(folder: string, patterns: string[], ignores: MCIgnore): string[];
    /**@inheritdoc*/
    getProjectData(): MinecraftData;
}
//# sourceMappingURL=context.d.ts.map