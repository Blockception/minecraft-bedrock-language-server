import { IIdentifier } from '../interfaces';
/**
 * Item data from behavior packs
 */
export interface Item extends IIdentifier {
    id: string;
    maxDamage: number;
}
/**
 * Create a new Item
 */
export declare function createItem(): Item;
/**
 * Convert JSON document to Item objects
 */
export declare function convertItem(doc: object, receiver: Item[]): void;
//# sourceMappingURL=item.d.ts.map