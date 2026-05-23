import {
  RequestTypes,
  WorkspaceContextSummary,
  WorkspacePackSummary,
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

type PackEntry = { readonly folder: string };

export interface WorkspaceProjectDataCollections {
  behaviorPacks: {
    packs: ReadonlyArray<PackEntry>;
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
    packs: ReadonlyArray<PackEntry>;
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
      connection.onRequest(RequestTypes.WorkspaceContext, () =>
        getWorkspaceContextSummary(this.extension.database.ProjectData),
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

/** Keys of a type whose values extend CollectionWithIds */
type CollectionKeys<T> = { [K in keyof T]: T[K] extends CollectionWithIds ? K : never }[keyof T];

const behaviorPackCollection = <K extends CollectionKeys<WorkspaceProjectDataCollections['behaviorPacks']>>(
  key: K,
): CollectionSelector => {
  return (projectData) => [{ source: 'behaviorPack', items: projectData.behaviorPacks[key] as CollectionWithIds }];
};

const resourcePackCollection = <K extends CollectionKeys<WorkspaceProjectDataCollections['resourcePacks']>>(
  key: K,
): CollectionSelector => {
  return (projectData) => [{ source: 'resourcePack', items: projectData.resourcePacks[key] as CollectionWithIds }];
};

const generalCollection = <K extends keyof WorkspaceProjectDataCollections['general']>(key: K): CollectionSelector => {
  return (projectData) => [{ source: 'general', items: projectData.general[key] }];
};

const behaviorAndResourceCollection = <
  BK extends CollectionKeys<WorkspaceProjectDataCollections['behaviorPacks']>,
  RK extends CollectionKeys<WorkspaceProjectDataCollections['resourcePacks']>,
>(
  behaviorPackKey: BK,
  resourcePackKey: RK,
): CollectionSelector => {
  return (projectData) => [
    { source: 'behaviorPack', items: projectData.behaviorPacks[behaviorPackKey] as CollectionWithIds },
    { source: 'resourcePack', items: projectData.resourcePacks[resourcePackKey] as CollectionWithIds },
  ];
};

const behaviorAndGeneralCollection = <
  BK extends CollectionKeys<WorkspaceProjectDataCollections['behaviorPacks']>,
  GK extends keyof WorkspaceProjectDataCollections['general'],
>(
  behaviorPackKey: BK,
  generalKey: GK,
): CollectionSelector => {
  return (projectData) => [
    { source: 'behaviorPack', items: projectData.behaviorPacks[behaviorPackKey] as CollectionWithIds },
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

/**
 * Returns a consolidated Bedrock project context summary from loaded project data.
 * Includes pack names, derived namespaces, and entity/block/item identifier lists.
 */
export function getWorkspaceContextSummary(projectData: WorkspaceProjectDataCollections): WorkspaceContextSummary {
  const packs: WorkspacePackSummary[] = [];

  for (const pack of projectData.behaviorPacks.packs) {
    packs.push({ type: 'behaviorPack', name: folderName(pack.folder) });
  }

  for (const pack of projectData.resourcePacks.packs) {
    packs.push({ type: 'resourcePack', name: folderName(pack.folder) });
  }

  const entities = collectUniqueIds(projectData.behaviorPacks.entities, projectData.resourcePacks.entities);
  const blocks = collectUniqueIds(projectData.behaviorPacks.blocks);
  const items = collectUniqueIds(projectData.behaviorPacks.items);

  const namespaceSet = new Set<string>();
  for (const id of [...entities, ...blocks, ...items]) {
    const colon = id.indexOf(':');
    if (colon > 0) {
      const ns = id.substring(0, colon);
      if (ns !== 'minecraft') namespaceSet.add(ns);
    }
  }

  return {
    packs,
    namespaces: Array.from(namespaceSet).sort(),
    entities,
    blocks,
    items,
  };
}

function folderName(folder: string): string {
  return folder.replace(/[/\\]+$/, '').split(/[/\\]/).pop() ?? folder;
}

function collectUniqueIds(...collections: CollectionWithIds[]): string[] {
  const seen = new Set<string>();
  for (const collection of collections) {
    collection.forEach((item) => {
      if (typeof item.id === 'string' && item.id.trim() !== '') seen.add(item.id);
    });
  }
  return Array.from(seen).sort();
}
