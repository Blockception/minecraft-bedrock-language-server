import { getWorkspaceEntitySummaries } from './service';

describe('language-model-tools service', () => {
  it('collects, deduplicates and sorts entities from project data', () => {
    const result = getWorkspaceEntitySummaries({
      behaviorPacks: {
        entities: [{ id: 'example:zombie' }, { id: 'example:bee' }, { id: 'example:zombie' }],
      },
      resourcePacks: {
        entities: [{ id: 'example:bee' }, { id: 'example:creeper' }],
      },
    });

    expect(result).toEqual([
      { id: 'example:bee', source: 'behaviorPack' },
      { id: 'example:bee', source: 'resourcePack' },
      { id: 'example:creeper', source: 'resourcePack' },
      { id: 'example:zombie', source: 'behaviorPack' },
    ]);
  });

  it('ignores invalid entity ids', () => {
    const result = getWorkspaceEntitySummaries({
      behaviorPacks: {
        entities: [{ id: 'example:cat' }, { id: '' }, {}],
      },
      resourcePacks: {
        entities: [{ id: '   ' }],
      },
    });

    expect(result).toEqual([{ id: 'example:cat', source: 'behaviorPack' }]);
  });
});
