import { load } from '../static/json';

/**
 * Vanilla module data structure
 */
export interface VanillaModule<T> {
  name: string;
  module_type: string;
  minecraft_version: string;
  vanilla_data_type: string;
  data_items: T[];
}

/**
 * Create a new VanillaModule
 */
export function createVanillaModule<T>(): VanillaModule<T> {
  return {
    name: '',
    module_type: '',
    minecraft_version: '',
    vanilla_data_type: '',
    data_items: [],
  };
}

/**
 * Convert vanilla module items using a mapping function
 */
export function convertVanillaModule<T, U>(
  filepath: string,
  receiver: U[],
  mapFn: (item: T) => U
): void {
  console.log('Loading file: ' + filepath);
  const obj = load<VanillaModule<T>>(filepath);
  if (!obj) return;

  const items = obj.data_items.map(mapFn);
  receiver.push(...items);
}

/**
 * Convert vanilla module items using a mapping function that returns arrays
 */
export function convertVanillaModuleFlat<T, U>(
  filepath: string,
  receiver: U[],
  mapFn: (item: T) => U[]
): void {
  console.log('Loading file: ' + filepath);
  const obj = load<VanillaModule<T>>(filepath);
  if (!obj) return;

  for (const item of obj.data_items) {
    const items = mapFn(item);
    receiver.push(...items);
  }
}
