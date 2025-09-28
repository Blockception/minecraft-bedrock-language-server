import { ProjectData, TextDocument } from "bc-minecraft-bedrock-project";
import { DiagnosticsBuilderContent } from "../src/lib/types";
import { MinecraftData } from 'bc-minecraft-bedrock-project';
export declare namespace TestProjectData {
    function createTestData(files?: Map<string, string> | undefined): MinecraftData;
    function createContext<T extends TextDocument = TextDocument>(files?: Map<string, string> | undefined): DiagnosticsBuilderContent<T>;
}
export declare class InternalTest<T extends TextDocument = TextDocument> implements DiagnosticsBuilderContent<T> {
    __projectData: MinecraftData | undefined;
    __files: Map<string, string>;
    constructor(projectData: ProjectData | undefined, files: Map<string, string> | undefined);
    getDocument(uri: string): T | undefined;
    getFiles(): string[];
    getProjectData(): MinecraftData;
}
