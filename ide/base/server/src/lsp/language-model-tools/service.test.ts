import { getWorkspaceContextSummary, getWorkspaceResourceSummaries, WorkspaceProjectDataCollections } from './service';

const emptyCollection: { forEach(callbackfn: (item: { id?: string }) => void): void } = {
  forEach(): void {
    // no-op
  },
};

function createProjectData(): WorkspaceProjectDataCollections {
  return {
    behaviorPacks: {
      packs: [],
      entities: emptyCollection,
      items: emptyCollection,
      blocks: emptyCollection,
      biomes: emptyCollection,
      features: emptyCollection,
      featuresRules: emptyCollection,
      functions: emptyCollection,
      lootTables: emptyCollection,
      recipes: emptyCollection,
      trading: emptyCollection,
      structures: emptyCollection,
      animations: emptyCollection,
      animationControllers: emptyCollection,
      customCommands: emptyCollection,
      itemGroups: emptyCollection,
    },
    resourcePacks: {
      packs: [],
      entities: emptyCollection,
      animations: emptyCollection,
      animationControllers: emptyCollection,
      attachables: emptyCollection,
      blockCullingRules: emptyCollection,
      fogs: emptyCollection,
      materials: emptyCollection,
      models: emptyCollection,
      particles: emptyCollection,
      renderControllers: emptyCollection,
      sounds: emptyCollection,
      textures: emptyCollection,
      itemTextures: emptyCollection,
      terrainTextures: emptyCollection,
      uiElements: emptyCollection,
    },
    general: {
      fakeEntities: emptyCollection,
      objectives: emptyCollection,
      structures: emptyCollection,
      tags: emptyCollection,
      tickingAreas: emptyCollection,
    },
  };
}

describe('language-model-tools service', () => {
  it('collects, deduplicates and sorts entities from project data', () => {
    const projectData = createProjectData();
    projectData.behaviorPacks.entities = [{ id: 'example:zombie' }, { id: 'example:bee' }, { id: 'example:zombie' }];
    projectData.resourcePacks.entities = [{ id: 'example:bee' }, { id: 'example:creeper' }];

    const result = getWorkspaceResourceSummaries(projectData, 'entities');

    expect(result).toEqual([
      { id: 'example:bee', source: 'behaviorPack', type: 'entities' },
      { id: 'example:bee', source: 'resourcePack', type: 'entities' },
      { id: 'example:creeper', source: 'resourcePack', type: 'entities' },
      { id: 'example:zombie', source: 'behaviorPack', type: 'entities' },
    ]);
  });

  it('ignores invalid ids', () => {
    const projectData = createProjectData();
    projectData.behaviorPacks.items = [{ id: 'example:cat' }, { id: '' }, {}];

    const result = getWorkspaceResourceSummaries(projectData, 'items');
    expect(result).toEqual([{ id: 'example:cat', source: 'behaviorPack', type: 'items' }]);
  });

  it('supports general-only resource types', () => {
    const projectData = createProjectData();
    projectData.general.objectives = [{ id: 'foo' }, { id: 'bar' }];

    const result = getWorkspaceResourceSummaries(projectData, 'objectives');
    expect(result).toEqual([
      { id: 'bar', source: 'general', type: 'objectives' },
      { id: 'foo', source: 'general', type: 'objectives' },
    ]);
  });
});

describe('getWorkspaceContextSummary', () => {
  it('returns empty collections when project has no data', () => {
    const result = getWorkspaceContextSummary(createProjectData());
    expect(result).toEqual({ packs: [], namespaces: [], entities: [], blocks: [], items: [] });
  });

  it('lists behavior pack and resource pack names from their folders', () => {
    const projectData = createProjectData();
    projectData.behaviorPacks.packs = [{ folder: '/workspace/behavior_packs/my_bp' }];
    projectData.resourcePacks.packs = [{ folder: '/workspace/resource_packs/my_rp' }];

    const result = getWorkspaceContextSummary(projectData);
    expect(result.packs).toEqual([
      { type: 'behaviorPack', name: 'my_bp' },
      { type: 'resourcePack', name: 'my_rp' },
    ]);
  });

  it('derives namespaces from entity, block and item ids excluding "minecraft"', () => {
    const projectData = createProjectData();
    projectData.behaviorPacks.entities = [{ id: 'mymod:zombie' }, { id: 'minecraft:creeper' }];
    projectData.behaviorPacks.blocks = [{ id: 'mymod:custom_block' }];
    projectData.behaviorPacks.items = [{ id: 'othermod:sword' }];

    const result = getWorkspaceContextSummary(projectData);
    expect(result.namespaces).toEqual(['mymod', 'othermod']);
  });

  it('collects and deduplicates entity ids from both bp and rp', () => {
    const projectData = createProjectData();
    projectData.behaviorPacks.entities = [{ id: 'example:zombie' }, { id: 'example:bee' }];
    projectData.resourcePacks.entities = [{ id: 'example:bee' }, { id: 'example:creeper' }];

    const result = getWorkspaceContextSummary(projectData);
    expect(result.entities).toEqual(['example:bee', 'example:creeper', 'example:zombie']);
  });

  it('extracts pack name from Windows-style backslash path', () => {
    const projectData = createProjectData();
    projectData.behaviorPacks.packs = [{ folder: 'C:\\workspace\\behavior_packs\\win_bp' }];

    const result = getWorkspaceContextSummary(projectData);
    expect(result.packs).toEqual([{ type: 'behaviorPack', name: 'win_bp' }]);
  });
});
