import { ProjectData, TextDocument } from 'bc-minecraft-bedrock-project';
import { Manifest } from 'bc-minecraft-bedrock-project/src/internal/types';
import { MCProject } from 'bc-minecraft-project';
import { DiagnosticsBuilderContent } from '../src/types';
import { MinecraftData } from 'bc-minecraft-bedrock-project';

export namespace TestProjectData {
  export function createTestData(files: Map<string, string> | undefined = undefined): MinecraftData {
    return createContext(files).getProjectData();
  }

  export function createContext<T extends TextDocument = TextDocument>(
    files: Map<string, string> | undefined = undefined,
  ): DiagnosticsBuilderContent<T> {
    const context = new InternalTest<T>(undefined, files);
    const data = context.getProjectData().projectData;

    data.behaviorPacks.add('behavior_pack', MCProject.createEmpty(), {} as Manifest);
    data.resourcePacks.add('resource_pack', MCProject.createEmpty(), {} as Manifest);

    return context;
  }
}

export class InternalTest<T extends TextDocument = TextDocument> implements DiagnosticsBuilderContent<T> {
  public __projectData: MinecraftData | undefined;
  public __files: Map<string, string>;

  constructor(projectData: ProjectData | undefined, files: Map<string, string> | undefined) {
    this.__projectData = new MinecraftData(projectData ?? new ProjectData(this));
    this.__files = files ?? new Map<string, string>();
  }

  getDocument(uri: string): T | undefined {
    const out = this.__files.get(uri);

    if (out) return { uri: uri, getText: () => out } as T;

    return undefined;
  }

  getFiles(): string[] {
    return [];
  }

  getProjectData() {
    if (!this.__projectData) {
      return (this.__projectData = new MinecraftData(new ProjectData(this)));
    }

    return this.__projectData;
  }
}
