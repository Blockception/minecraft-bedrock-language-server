import { collectWorkspaceEntities } from './project-data';

function entity(id: string): any {
  return { id };
}

describe('collectWorkspaceEntities', () => {
  it('merges behavior and resource entities by id', () => {
    const result = collectWorkspaceEntities(
      [entity('demo:pig'), entity('demo:zebra')],
      [entity('demo:pig'), entity('demo:cat')],
    );

    expect(result).toEqual([
      { id: 'demo:cat', sources: ['resourcePack'] },
      { id: 'demo:pig', sources: ['behaviorPack', 'resourcePack'] },
      { id: 'demo:zebra', sources: ['behaviorPack'] },
    ]);
  });
});
