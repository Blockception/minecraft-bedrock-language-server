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
export declare function createModel(): Model;
/**
 * Convert JSON document to Model objects
 */
export declare function convertModel(doc: object, receiver: Model[]): void;
//# sourceMappingURL=model.d.ts.map