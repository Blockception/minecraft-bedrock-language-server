import { IIdentifier } from '../interfaces';
/**
 * Texture data from resource packs
 */
export interface Texture extends IIdentifier {
    id: string;
}
/**
 * Create a new Texture
 */
export declare function createTexture(): Texture;
/**
 * Convert pack folder to Texture objects
 */
export declare function convertTexture(pack: string): Texture[];
//# sourceMappingURL=texture.d.ts.map