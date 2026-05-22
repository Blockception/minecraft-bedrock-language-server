import { BaseObject } from 'bc-minecraft-bedrock-types';
import { Context } from '../../context/context';
import { CommandContext } from '../context';

export interface WorkspaceEntity {
  id: string;
  sources: ('behaviorPack' | 'resourcePack')[];
}

interface ForEachCollection<T> {
  forEach(callbackfn: (item: T) => void): void;
}

export function collectWorkspaceEntities(
  behaviorPackEntities: ForEachCollection<BaseObject>,
  resourcePackEntities: ForEachCollection<BaseObject>,
): WorkspaceEntity[] {
  const entities = new Map<string, Set<'behaviorPack' | 'resourcePack'>>();

  behaviorPackEntities.forEach((entity) => {
    if (!entities.has(entity.id)) entities.set(entity.id, new Set());
    entities.get(entity.id)?.add('behaviorPack');
  });

  resourcePackEntities.forEach((entity) => {
    if (!entities.has(entity.id)) entities.set(entity.id, new Set());
    entities.get(entity.id)?.add('resourcePack');
  });

  return [...entities.entries()]
    .map(([id, sources]) => ({ id, sources: [...sources].sort() as WorkspaceEntity['sources'] }))
    .sort((a, b) => a.id.localeCompare(b.id));
}

export function getWorkspaceEntities(context: Context<CommandContext>) {
  const entities = collectWorkspaceEntities(
    context.database.ProjectData.behaviorPacks.entities,
    context.database.ProjectData.resourcePacks.entities,
  );

  return {
    total: entities.length,
    entities,
  };
}
