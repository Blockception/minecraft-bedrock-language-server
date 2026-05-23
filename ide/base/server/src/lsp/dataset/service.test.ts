import { DataSets } from '@blockception/ide-shared';
import { DataSetService } from './service';
import { WorkspaceProjectDataCollections } from '../language-model-tools/service';

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

function createService(projectData: WorkspaceProjectDataCollections): DataSetService {
  const logger = {
    withPrefix: () => logger,
    debug: () => undefined,
  };

  const extension = {
    database: {
      ProjectData: projectData,
    },
  };

  return new DataSetService(logger as never, extension as never);
}

describe('dataset service MCP endpoints', () => {
  it('returns workspace entities for MCP project endpoint', () => {
    const projectData = createProjectData();
    projectData.behaviorPacks.entities = [{ id: 'example:zombie' }, { id: 'example:bee' }];
    projectData.resourcePacks.entities = [{ id: 'example:bee' }, { id: 'example:creeper' }];

    const service = createService(projectData);
    const result = (service as never as { onDataSetRequest: (params: { datatype: string }) => unknown }).onDataSetRequest({
      datatype: DataSets.MCP.Project.Entities,
    });

    expect(result).toEqual([
      { id: 'example:bee', source: 'behaviorPack', type: 'entities' },
      { id: 'example:bee', source: 'resourcePack', type: 'entities' },
      { id: 'example:creeper', source: 'resourcePack', type: 'entities' },
      { id: 'example:zombie', source: 'behaviorPack', type: 'entities' },
    ]);
  });

  it('supports id filtering for MCP project blocks endpoint', () => {
    const projectData = createProjectData();
    projectData.behaviorPacks.blocks = [{ id: 'example:stone' }, { id: 'example:wood' }];

    const service = createService(projectData);
    const result = (
      service as never as { onDataSetRequest: (params: { datatype: string; id?: string }) => unknown }
    ).onDataSetRequest({
      datatype: DataSets.MCP.Project.Blocks,
      id: 'example:wood',
    });

    expect(result).toEqual([{ id: 'example:wood', source: 'behaviorPack', type: 'blocks' }]);
  });

  it('returns vanilla command ids for MCP commands endpoint', () => {
    const service = createService(createProjectData());
    const result = (
      service as never as { onDataSetRequest: (params: { datatype: string; id?: string }) => unknown }
    ).onDataSetRequest({
      datatype: DataSets.MCP.Vanilla.Commands,
    });

    expect(Array.isArray(result)).toBe(true);
    expect(result).toContain('say');
  });
});
