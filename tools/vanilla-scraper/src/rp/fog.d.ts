import { IIdentifier } from '../interfaces';
/**
 * Fog data from resource packs
 */
export interface Fog extends IIdentifier {
    id: string;
}
/**
 * Create a new Fog
 */
export declare function createFog(): Fog;
/**
 * Convert JSON document to Fog objects
 */
export declare function convertFog(doc: object, receiver: Fog[]): void;
//# sourceMappingURL=fog.d.ts.map