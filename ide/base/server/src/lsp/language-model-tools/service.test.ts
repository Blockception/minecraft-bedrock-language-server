import { getWorkspaceResourceSummaries, WorkspaceProjectDataCollections } from './service';

const emptyCollection: { forEach(callbackfn: (item: { id?: string }) => void): void } = {
  forEach(): void {
    // no-op
  },
};

function createProjectData(): WorkspaceProjectDataCollections {
  return {
    behaviorPacks: {
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
