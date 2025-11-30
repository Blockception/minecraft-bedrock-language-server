import { IIdentifier } from '../interfaces';

/**
 * Model data from resource packs
 */
export interface Model extends IIdentifier {
  id: string;
  bones: string[];
}

/**
 * Create a new Model
 */
export function createModel(): Model {
  return {
    id: '',
    bones: [],
  };
}

/**
 * Convert JSON document to Model objects
 */
export function convertModel(doc: object, receiver: Model[]): void {
  const root = doc as Record<string, unknown>;

  // Check for old format (geometry.*)
  for (const [key, value] of Object.entries(root)) {
    if (key.startsWith('geometry.')) {
      convert180(key, value as Record<string, unknown>, receiver);
    }
  }

  // Check for new format (minecraft:geometry)
  if ('minecraft:geometry' in root) {
    convertNew(root, receiver);
  }
}

/**
 * Convert old format (1.8.0) geometry
 */
function convert180(name: string, geo: Record<string, unknown>, receiver: Model[]): void {
  let id = name;
  const colonIndex = id.indexOf(':');
  if (colonIndex >= 0) {
    id = id.substring(0, colonIndex);
  }

  const item = createModel();
  item.id = id;
  receiver.push(item);

  const bones = geo['bones'] as unknown[] | undefined;
  if (bones) {
    harvestBones(bones, item.bones);
  }
}

/**
 * Convert new format geometry
 */
function convertNew(root: Record<string, unknown>, receiver: Model[]): void {
  const geos = root['minecraft:geometry'] as unknown[];

  for (const geo of geos) {
    const geoObj = geo as Record<string, unknown>;
    const desc = geoObj['description'] as Record<string, unknown>;
    if (!desc) continue;

    const identifier = desc['identifier'] as string;
    if (!identifier) continue;

    const item = createModel();
    item.id = identifier;
    receiver.push(item);

    const bones = geoObj['bones'] as unknown[] | undefined;
    if (bones) {
      harvestBones(bones, item.bones);
    }
  }
}

/**
 * Harvest bone names from array
 */
function harvestBones(root: unknown[], bones: string[]): void {
  for (const bone of root) {
    const boneObj = bone as Record<string, unknown>;
    const name = boneObj['name'] as string | undefined;
    if (name && !bones.includes(name)) {
      bones.push(name);
    }
  }
}
