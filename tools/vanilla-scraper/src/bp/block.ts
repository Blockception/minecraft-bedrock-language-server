import { IIdentifier } from '../interfaces';

/**
 * Block state data
 */
export interface BlockState {
  values: string[];
  name: string;
  type: string;
}

/**
 * Block data from behavior packs
 */
export interface Block extends IIdentifier {
  id: string;
  properties: string[];
}

/**
 * Create a new Block
 */
export function createBlock(): Block {
  return {
    id: '',
    properties: [],
  };
}

/**
 * Create a new BlockState
 */
export function createBlockState(): BlockState {
  return {
    values: [],
    name: '',
    type: '',
  };
}

/**
 * Convert JSON document to Block objects
 */
export function convertBlock(doc: object, receiver: Block[]): void {
  const root = doc as Record<string, unknown>;
  const def = root['minecraft:block'] as Record<string, unknown>;
  if (!def) return;

  const desc = def['description'] as Record<string, unknown>;
  if (!desc) return;

  const id = desc['identifier'] as string;
  if (!id || id.trim() === '') return;

  const out = createBlock();
  out.id = id;
  receiver.push(out);

  const properties = desc['properties'] as Record<string, unknown[]> | undefined;
  if (properties) {
    for (const [name, values] of Object.entries(properties)) {
      const state = createBlockState();
      state.name = name;

      for (const value of values) {
        const temp = String(value);
        state.values.push(temp);
      }
    }
  }
}
