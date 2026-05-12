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
export declare function createNamedObject(): NamedObject;
/**
 * Convert NamedObject to string (name)
 */
export declare function convertNamedObjectToString(obj: NamedObject): string;
/**
 * Convert NamedObject to BP Entity
 */
export declare function convertNamedObjectToEntity(obj: NamedObject): {
    id: string;
    events: string[];
    families: string[];
};
//# sourceMappingURL=named-object.d.ts.map