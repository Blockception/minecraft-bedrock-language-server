import {
  RequestTypes,
  WorkspaceResourceSource,
  WorkspaceResourceSummary,
  WorkspaceResourceType,
  WorkspaceResourcesRequest,
} from '@blockception/ide-shared';
import { Connection } from 'vscode-languageserver';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { BaseService } from '../services/base';
import { IService } from '../services/service';

type CollectionWithIds = {
  forEach(callbackfn: (item: { id?: string }) => void): void;
};

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
  const collections = resourceTypeCollections[type](projectData);
  const keys = new Set<string>();
  const result: WorkspaceResourceSummary[] = [];

  const addItems = (items: CollectionWithIds, source: WorkspaceResourceSource) => {
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

type CollectionEntry = { source: WorkspaceResourceSource; items: CollectionWithIds };
type CollectionSelector = (projectData: WorkspaceProjectDataCollections) => CollectionEntry[];

const behaviorPackCollection = <K extends keyof WorkspaceProjectDataCollections['behaviorPacks']>(
  key: K,
): CollectionSelector => {
  return (projectData) => [{ source: 'behaviorPack', items: projectData.behaviorPacks[key] }];
};

const resourcePackCollection = <K extends keyof WorkspaceProjectDataCollections['resourcePacks']>(
  key: K,
): CollectionSelector => {
  return (projectData) => [{ source: 'resourcePack', items: projectData.resourcePacks[key] }];
};

const generalCollection = <K extends keyof WorkspaceProjectDataCollections['general']>(key: K): CollectionSelector => {
  return (projectData) => [{ source: 'general', items: projectData.general[key] }];
};

const behaviorAndResourceCollection = <
  BK extends keyof WorkspaceProjectDataCollections['behaviorPacks'],
  RK extends keyof WorkspaceProjectDataCollections['resourcePacks'],
>(
  behaviorPackKey: BK,
  resourcePackKey: RK,
): CollectionSelector => {
  return (projectData) => [
    { source: 'behaviorPack', items: projectData.behaviorPacks[behaviorPackKey] },
    { source: 'resourcePack', items: projectData.resourcePacks[resourcePackKey] },
  ];
};

const behaviorAndGeneralCollection = <
  BK extends keyof WorkspaceProjectDataCollections['behaviorPacks'],
  GK extends keyof WorkspaceProjectDataCollections['general'],
>(
  behaviorPackKey: BK,
  generalKey: GK,
): CollectionSelector => {
  return (projectData) => [
    { source: 'behaviorPack', items: projectData.behaviorPacks[behaviorPackKey] },
    { source: 'general', items: projectData.general[generalKey] },
  ];
};

const resourceTypeCollections: Record<WorkspaceResourceType, CollectionSelector> = {
  entities: behaviorAndResourceCollection('entities', 'entities'),
  items: behaviorPackCollection('items'),
  blocks: behaviorPackCollection('blocks'),
  biomes: behaviorPackCollection('biomes'),
  features: behaviorPackCollection('features'),
  featureRules: behaviorPackCollection('featuresRules'),
  functions: behaviorPackCollection('functions'),
  lootTables: behaviorPackCollection('lootTables'),
  recipes: behaviorPackCollection('recipes'),
  trading: behaviorPackCollection('trading'),
  structures: behaviorAndGeneralCollection('structures', 'structures'),
  animations: behaviorAndResourceCollection('animations', 'animations'),
  animationControllers: behaviorAndResourceCollection('animationControllers', 'animationControllers'),
  attachables: resourcePackCollection('attachables'),
  blockCullingRules: resourcePackCollection('blockCullingRules'),
  fogs: resourcePackCollection('fogs'),
  materials: resourcePackCollection('materials'),
  models: resourcePackCollection('models'),
  particles: resourcePackCollection('particles'),
  renderControllers: resourcePackCollection('renderControllers'),
  sounds: resourcePackCollection('sounds'),
  textures: resourcePackCollection('textures'),
  itemTextures: resourcePackCollection('itemTextures'),
  terrainTextures: resourcePackCollection('terrainTextures'),
  uiElements: resourcePackCollection('uiElements'),
  customCommands: behaviorPackCollection('customCommands'),
  itemGroups: behaviorPackCollection('itemGroups'),
  fakeEntities: generalCollection('fakeEntities'),
  objectives: generalCollection('objectives'),
  tags: generalCollection('tags'),
  tickingAreas: generalCollection('tickingAreas'),
};
