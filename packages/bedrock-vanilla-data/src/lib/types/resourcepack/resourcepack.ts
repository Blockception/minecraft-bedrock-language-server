import { Animation } from "./animation";
import { AnimationController } from "./animation_controller";
import { Entity } from "./entity";
import { Fog } from "./fog";
import { Material } from "./material";
import { Model } from "./model";
import { Particle } from "./particle";
import { RenderController } from "./render_controller";
import { Sound } from "./sound";
import { Texture } from "./texture";
import { TextureAtlas } from "./texture_atlas";

/**The interface that stores vanilla resource pack data*/
export interface ResourcePack {
  /**The collection of animation controllers*/
  readonly animation_controllers: AnimationController[];

  /**The collection of animations*/
  readonly animations: Animation[];

  /**The collection of entities*/
  readonly entities: Entity[];

  /**The collection of fogs*/
  readonly fogs: Fog[];

  /**The collection of materials*/
  readonly materials: Material[];

  /**The collection of models*/
  readonly models: Model[];

  /**The collection of particles*/
  readonly particles: Particle[];

  /**The collection of render controllers*/
  readonly render_controllers: RenderController[];

  /**The collection of sounds*/
  readonly sounds: Sound[];

  /**The collection of sounds files*/
  readonly sound_files: string[];

  /**The collection of textures*/
  readonly textures: Texture[];

  /**The collection of definitions from the texture atlas*/
  readonly texture_atlas_items: TextureAtlas[];

  /**The collection of definitions from the texture atlas*/
  readonly texture_atlas_terrain: TextureAtlas[];
}
