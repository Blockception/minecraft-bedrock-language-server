import { Animation } from "./Animation";
import { AnimationController } from "./AnimationController";
import { Entity } from "./Entity";
import { Fog } from "./Fog";
import { Material } from "./Material";
import { Model } from "./Model";
import { Particle } from "./Particle";
import { RenderController } from "./RenderController";
import { Sound } from "./Sound";
import { Texture } from "./Texture";
import { TextureAtlas } from "./TextureAtlas";

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
