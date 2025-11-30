import { IIdentifier } from '../interfaces';

/**
 * Entity data from resource packs
 */
export interface Entity extends IIdentifier {
  id: string;
  animations: string[];
}

/**
 * Create a new Entity
 */
export function createEntity(): Entity {
  return {
    id: '',
    animations: [],
  };
}

/**
 * Convert JSON document to Entity objects
 */
export function convertEntity(doc: object, receiver: Entity[]): void {
  const root = doc as Record<string, unknown>;
  const entity = root['minecraft:client_entity'] as Record<string, unknown>;
  if (!entity) return;

  const desc = entity['description'] as Record<string, unknown>;
  if (!desc) return;

  const id = desc['identifier'] as string;
  if (!id) return;

  const out = createEntity();
  out.id = id;
  receiver.push(out);

  const animations = desc['animations'] as Record<string, unknown> | undefined;
  if (animations) {
    for (const animName of Object.keys(animations)) {
      if (!out.animations.includes(animName)) {
        out.animations.push(animName);
      }
    }
  }
}
