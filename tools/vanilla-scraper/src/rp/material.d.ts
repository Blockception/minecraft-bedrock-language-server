import { IIdentifier } from '../interfaces';
/**
 * Material data from resource packs
 */
export interface Material extends IIdentifier {
    id: string;
}
/**
 * Create a new Material
 */
export declare function createMaterial(): Material;
/**
 * Convert pack folder to Material objects
 */
export declare function convertMaterial(pack: string, receiver: Material[]): void;
//# sourceMappingURL=material.d.ts.map