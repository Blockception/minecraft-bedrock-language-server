import { IIdentifier } from '../interfaces';

/**
 * Entity data from behavior packs
 */
export interface Entity extends IIdentifier {
  id: string;
  events: string[];
  families: string[];
}

/**
 * Create a new Entity
 */
export function createEntity(): Entity {
  return {
    id: '',
    events: [],
    families: [],
  };
}

/**
 * Convert JSON document to Entity objects
 */
export function convertEntity(doc: object, receiver: Entity[]): void {
  const root = doc as Record<string, unknown>;
  const def = root['minecraft:entity'] as Record<string, unknown>;
  if (!def) return;

  const desc = def['description'] as Record<string, unknown>;
  if (!desc) return;

  const id = desc['identifier'] as string;
  if (!id) return;

  const out = createEntity();
  out.id = id;
  receiver.push(out);

  const events = def['events'] as Record<string, unknown> | undefined;
  if (events) {
    for (const eventName of Object.keys(events)) {
      out.events.push(eventName);
    }
  }

  // Check components
  const comps = def['components'] as Record<string, unknown> | undefined;
  if (comps) {
    checkComponents(comps, out);
  }

  const groups = def['component_groups'] as Record<string, Record<string, unknown>> | undefined;
  if (groups) {
    for (const group of Object.values(groups)) {
      checkComponents(group, out);
    }
  }
}

/**
 * Check components for family types
 */
function checkComponents(comps: Record<string, unknown>, receiver: Entity): void {
  const families = comps['minecraft:type_family'] as Record<string, unknown> | undefined;
  if (!families) return;

  const familyArray = families['family'] as unknown[] | undefined;
  if (!familyArray) return;

  for (const f of familyArray) {
    const fStr = f as string;
    if (fStr && fStr.trim() !== '' && !receiver.families.includes(fStr)) {
      receiver.families.push(fStr);
    }
  }
}
