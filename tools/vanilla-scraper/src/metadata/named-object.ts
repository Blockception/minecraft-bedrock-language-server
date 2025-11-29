import { INamed, IIdentifier } from '../interfaces';

/**
 * Named object from metadata
 */
export interface NamedObject extends INamed, IIdentifier {
  name: string;
  id: string;
}

/**
 * Create a new NamedObject
 */
export function createNamedObject(): NamedObject {
  return {
    name: '',
    id: '',
  };
}

/**
 * Convert NamedObject to string (name)
 */
export function convertNamedObjectToString(obj: NamedObject): string {
  return obj.name;
}

/**
 * Convert NamedObject to BP Entity
 */
export function convertNamedObjectToEntity(obj: NamedObject): { id: string; events: string[]; families: string[] } {
  return {
    id: obj.name,
    events: [],
    families: [],
  };
}
