import { RequestTypes } from '@blockception/ide-shared';
import { Connection } from 'vscode-languageserver';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { BaseService } from '../services/base';
import { IService } from '../services/service';

export interface WorkspaceEntities {
  behaviorPacks: {
    entities: {
      forEach(callbackfn: (item: { id?: string }) => void): void;
    };
  };
  resourcePacks: {
    entities: {
      forEach(callbackfn: (item: { id?: string }) => void): void;
    };
  };
}

export interface WorkspaceEntitySummary {
  id: string;
  source: 'behaviorPack' | 'resourcePack';
}

/** Handles LSP requests backing language model tool invocations. */
export class LanguageModelToolService extends BaseService implements IService {
  readonly name: string = 'language-model-tools';

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix('[language-model-tools]'), extension);
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(connection.onRequest(RequestTypes.WorkspaceEntities, () => this.onWorkspaceEntitiesRequest()));
  }

  private onWorkspaceEntitiesRequest(): WorkspaceEntitySummary[] {
    return getWorkspaceEntitySummaries(this.extension.database.ProjectData);
  }
}

export function getWorkspaceEntitySummaries(projectData: WorkspaceEntities): WorkspaceEntitySummary[] {
  const keys = new Set<string>();
  const result: WorkspaceEntitySummary[] = [];

  const addItems = (
    items: { forEach(callbackfn: (item: { id?: string }) => void): void },
    source: WorkspaceEntitySummary['source'],
  ) => {
    items.forEach((item) => {
      if (typeof item.id !== 'string' || item.id.trim() === '') return;

      const key = `${source}:${item.id}`;
      if (keys.has(key)) return;

      keys.add(key);
      result.push({
        id: item.id,
        source,
      });
    });
  };

  addItems(projectData.behaviorPacks.entities, 'behaviorPack');
  addItems(projectData.resourcePacks.entities, 'resourcePack');

  return result.sort((a, b) => {
    if (a.id === b.id) {
      return a.source.localeCompare(b.source);
    }

    return a.id.localeCompare(b.id);
  });
}
