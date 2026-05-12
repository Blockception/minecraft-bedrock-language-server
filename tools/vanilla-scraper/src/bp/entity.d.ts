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
export declare function createEntity(): Entity;
/**
 * Convert JSON document to Entity objects
 */
export declare function convertEntity(doc: object, receiver: Entity[]): void;
//# sourceMappingURL=entity.d.ts.map