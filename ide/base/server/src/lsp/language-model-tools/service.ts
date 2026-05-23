import { RequestTypes } from '@blockception/ide-shared';
import { Connection } from 'vscode-languageserver';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { BaseService } from '../services/base';
import { IService } from '../services/service';

type CollectionWithIds = {
  forEach(callbackfn: (item: { id?: string }) => void): void;
};

export type WorkspaceResourceType =
  | 'entities'
  | 'items'
  | 'blocks'
  | 'biomes'
  | 'features'
  | 'featureRules'
  | 'functions'
  | 'lootTables'
  | 'recipes'
  | 'trading'
  | 'structures'
  | 'animations'
  | 'animationControllers'
  | 'attachables'
  | 'blockCullingRules'
  | 'fogs'
  | 'materials'
  | 'models'
  | 'particles'
  | 'renderControllers'
  | 'sounds'
  | 'textures'
  | 'itemTextures'
  | 'terrainTextures'
  | 'uiElements'
  | 'customCommands'
  | 'itemGroups'
  | 'fakeEntities'
  | 'objectives'
  | 'tags'
  | 'tickingAreas';

export interface WorkspaceResourcesRequest {
  type?: WorkspaceResourceType;
}

export interface WorkspaceProjectDataCollections {
  behaviorPacks: {
    entities: CollectionWithIds;
    items: CollectionWithIds;
    blocks: CollectionWithIds;
    biomes: CollectionWithIds;
    features: CollectionWithIds;
    featuresRules: CollectionWithIds;
    functions: CollectionWithIds;
    lootTables: CollectionWithIds;
    recipes: CollectionWithIds;
    trading: CollectionWithIds;
    structures: CollectionWithIds;
    animations: CollectionWithIds;
    animationControllers: CollectionWithIds;
    customCommands: CollectionWithIds;
    itemGroups: CollectionWithIds;
  };
  resourcePacks: {
    entities: CollectionWithIds;
    animations: CollectionWithIds;
    animationControllers: CollectionWithIds;
    attachables: CollectionWithIds;
    blockCullingRules: CollectionWithIds;
    fogs: CollectionWithIds;
    materials: CollectionWithIds;
    models: CollectionWithIds;
    particles: CollectionWithIds;
    renderControllers: CollectionWithIds;
    sounds: CollectionWithIds;
    textures: CollectionWithIds;
    itemTextures: CollectionWithIds;
    terrainTextures: CollectionWithIds;
    uiElements: CollectionWithIds;
  };
  general: {
    fakeEntities: CollectionWithIds;
    objectives: CollectionWithIds;
    structures: CollectionWithIds;
    tags: CollectionWithIds;
    tickingAreas: CollectionWithIds;
  };
}

export interface WorkspaceResourceSummary {
  id: string;
  source: 'behaviorPack' | 'resourcePack' | 'general';
  type: WorkspaceResourceType;
}

/** Handles LSP requests backing language model tool invocations. */
export class LanguageModelToolService extends BaseService implements IService {
  readonly name: string = 'language-model-tools';

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix('[language-model-tools]'), extension);
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(
      connection.onRequest(RequestTypes.WorkspaceEntities, (params: WorkspaceResourcesRequest | undefined) =>
        this.onWorkspaceResourcesRequest(params),
      ),
    );
  }

  private onWorkspaceResourcesRequest(params: WorkspaceResourcesRequest | undefined): WorkspaceResourceSummary[] {
    return getWorkspaceResourceSummaries(this.extension.database.ProjectData, params?.type);
  }
}

export function getWorkspaceResourceSummaries(
  projectData: WorkspaceProjectDataCollections,
  type: WorkspaceResourceType = 'entities',
): WorkspaceResourceSummary[] {
  const collections = getCollectionsByType(projectData, type);
  const keys = new Set<string>();
  const result: WorkspaceResourceSummary[] = [];

  const addItems = (items: CollectionWithIds, source: WorkspaceResourceSummary['source']) => {
    items.forEach((item) => {
      if (typeof item.id !== 'string' || item.id.trim() === '') return;

      const key = `${source}:${type}:${item.id}`;
      if (keys.has(key)) return;

      keys.add(key);
      result.push({
        id: item.id,
        source,
        type,
      });
    });
  };

  collections.forEach((entry) => addItems(entry.items, entry.source));

  return result.sort((a, b) => {
    if (a.id === b.id) {
      return a.source.localeCompare(b.source);
    }

    return a.id.localeCompare(b.id);
  });
}

function getCollectionsByType(
  projectData: WorkspaceProjectDataCollections,
  type: WorkspaceResourceType,
): { source: WorkspaceResourceSummary['source']; items: CollectionWithIds }[] {
  switch (type) {
    case 'entities':
      return [
        { source: 'behaviorPack', items: projectData.behaviorPacks.entities },
        { source: 'resourcePack', items: projectData.resourcePacks.entities },
      ];
    case 'items':
      return [{ source: 'behaviorPack', items: projectData.behaviorPacks.items }];
    case 'blocks':
      return [{ source: 'behaviorPack', items: projectData.behaviorPacks.blocks }];
    case 'biomes':
      return [{ source: 'behaviorPack', items: projectData.behaviorPacks.biomes }];
    case 'features':
      return [{ source: 'behaviorPack', items: projectData.behaviorPacks.features }];
    case 'featureRules':
      return [{ source: 'behaviorPack', items: projectData.behaviorPacks.featuresRules }];
    case 'functions':
      return [{ source: 'behaviorPack', items: projectData.behaviorPacks.functions }];
    case 'lootTables':
      return [{ source: 'behaviorPack', items: projectData.behaviorPacks.lootTables }];
    case 'recipes':
      return [{ source: 'behaviorPack', items: projectData.behaviorPacks.recipes }];
    case 'trading':
      return [{ source: 'behaviorPack', items: projectData.behaviorPacks.trading }];
    case 'structures':
      return [
        { source: 'behaviorPack', items: projectData.behaviorPacks.structures },
        { source: 'general', items: projectData.general.structures },
      ];
    case 'animations':
      return [
        { source: 'behaviorPack', items: projectData.behaviorPacks.animations },
        { source: 'resourcePack', items: projectData.resourcePacks.animations },
      ];
    case 'animationControllers':
      return [
        { source: 'behaviorPack', items: projectData.behaviorPacks.animationControllers },
        { source: 'resourcePack', items: projectData.resourcePacks.animationControllers },
      ];
    case 'attachables':
      return [{ source: 'resourcePack', items: projectData.resourcePacks.attachables }];
    case 'blockCullingRules':
      return [{ source: 'resourcePack', items: projectData.resourcePacks.blockCullingRules }];
    case 'fogs':
      return [{ source: 'resourcePack', items: projectData.resourcePacks.fogs }];
    case 'materials':
      return [{ source: 'resourcePack', items: projectData.resourcePacks.materials }];
    case 'models':
      return [{ source: 'resourcePack', items: projectData.resourcePacks.models }];
    case 'particles':
      return [{ source: 'resourcePack', items: projectData.resourcePacks.particles }];
    case 'renderControllers':
      return [{ source: 'resourcePack', items: projectData.resourcePacks.renderControllers }];
    case 'sounds':
      return [{ source: 'resourcePack', items: projectData.resourcePacks.sounds }];
    case 'textures':
      return [{ source: 'resourcePack', items: projectData.resourcePacks.textures }];
    case 'itemTextures':
      return [{ source: 'resourcePack', items: projectData.resourcePacks.itemTextures }];
    case 'terrainTextures':
      return [{ source: 'resourcePack', items: projectData.resourcePacks.terrainTextures }];
    case 'uiElements':
      return [{ source: 'resourcePack', items: projectData.resourcePacks.uiElements }];
    case 'customCommands':
      return [{ source: 'behaviorPack', items: projectData.behaviorPacks.customCommands }];
    case 'itemGroups':
      return [{ source: 'behaviorPack', items: projectData.behaviorPacks.itemGroups }];
    case 'fakeEntities':
      return [{ source: 'general', items: projectData.general.fakeEntities }];
    case 'objectives':
      return [{ source: 'general', items: projectData.general.objectives }];
    case 'tags':
      return [{ source: 'general', items: projectData.general.tags }];
    case 'tickingAreas':
      return [{ source: 'general', items: projectData.general.tickingAreas }];
    default:
      return [];
  }
}
