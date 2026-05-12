import { IIdentifier } from '../interfaces';
/**
 * Texture atlas data from resource packs
 */
export interface TextureAtlas extends IIdentifier {
    id: string;
}
/**
 * Create a new TextureAtlas
 */
export declare function createTextureAtlas(): TextureAtlas;
/**
 * Convert texture atlas file to TextureAtlas objects
 */
export declare function convertTextureAtlas(filepath: string): TextureAtlas[];
//# sourceMappingURL=texture-atlas.d.ts.map