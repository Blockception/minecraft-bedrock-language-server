import { Animation } from './animation';
import { AnimationController } from './animation-controller';
import { Entity } from './entity';
import { Fog } from './fog';
import { Material } from './material';
import { Model } from './model';
import { Particle } from './particle';
import { RenderController } from './render-controller';
import { Sound } from './sound';
import { Texture } from './texture';
import { TextureAtlas } from './texture-atlas';
import { Lang } from './lang';
/**
 * Container for resource pack data
 */
export declare class Container {
    animationControllers: AnimationController[];
    animations: Animation[];
    entities: Entity[];
    fogs: Fog[];
    materials: Material[];
    models: Model[];
    particles: Particle[];
    renderControllers: RenderController[];
    sounds: Sound[];
    textures: Texture[];
    textureItems: TextureAtlas[];
    textureTerrain: TextureAtlas[];
    soundFiles: string[];
    langs: Lang[];
    /**
     * Load container from a folder
     */
    static load(folder: string): Container;
    /**
     * Save container to a folder
     */
    save(folder: string): void;
    /**
     * Clean and deduplicate data
     */
    clean(): void;
}
//# sourceMappingURL=container.d.ts.map