import { McpEndpoints } from '@blockception/ide-shared';
import type { ProjectData } from 'bc-minecraft-bedrock-project';
import { collectUniqueIds, getMcpEndpointData } from './service';

function createDataSet(ids: unknown[]) {
  return {
    forEach(callbackfn: (value: { id?: unknown }) => void): void {
      ids.forEach((id) => callbackfn({ id }));
    },
  };
}

function createProjectDataMock() {
  return {
    behaviorPacks: {
      entities: createDataSet(['bp:entity', 'shared:entity']),
      blocks: createDataSet(['bp:block']),
    },
    resourcePacks: {
      entities: createDataSet(['rp:entity', 'shared:entity']),
    },
  } as unknown as ProjectData;
}

describe('dataset service mcp endpoints', () => {
  test('collectUniqueIds keeps first-seen unique ids', () => {
    const result = collectUniqueIds(createDataSet(['a', 'b', '', 12]), createDataSet(['b', 'c']));
    expect(result).toEqual(['a', 'b', 'c']);
  });

  test('project entity endpoint returns merged behavior/resource entities', () => {
    const result = getMcpEndpointData(McpEndpoints.ProjectEntities, createProjectDataMock());
    expect(result).toEqual(['bp:entity', 'shared:entity', 'rp:entity']);
  });

  test('project block endpoint returns behavior blocks', () => {
    const result = getMcpEndpointData(McpEndpoints.ProjectBlocks, createProjectDataMock());
    expect(result).toEqual(['bp:block']);
  });

  test('vanilla command endpoint returns known command names', () => {
    const result = getMcpEndpointData(McpEndpoints.VanillaCommands, createProjectDataMock());
    expect(Array.isArray(result)).toBe(true);
    expect(result).toContain('say');
  });

  test('unknown endpoint returns undefined', () => {
    const result = getMcpEndpointData('bedrock://missing', createProjectDataMock());
    expect(result).toBeUndefined();
  });
});
