import { IIdentifier } from '../interfaces';
/**
 * Biome data from behavior packs
 */
export interface Biome extends IIdentifier {
    id: string;
    tags: string[];
}
/**
 * Create a new Biome
 */
export declare function createBiome(): Biome;
/**
 * Convert JSON document to Biome objects
 */
export declare function convertBiome(doc: object, receiver: Biome[]): void;
//# sourceMappingURL=biome.d.ts.map