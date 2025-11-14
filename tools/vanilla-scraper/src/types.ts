/**
 * Data types used by the scraper
 */

export interface Block {
  id: string;
  properties?: string[];
}

export interface Entity {
  id: string;
}

export interface Item {
  id: string;
}

export interface LootTable {
  id: string;
}

export interface Trading {
  id: string;
}

export interface Biome {
  id: string;
}

export interface Animation {
  id: string;
}

export interface AnimationController {
  id: string;
}

export interface Fog {
  id: string;
}

export interface Model {
  id: string;
}

export interface Particle {
  id: string;
}

export interface RenderController {
  id: string;
}

export interface Material {
  id: string;
}

export interface Sound {
  id: string;
}

export interface Texture {
  id: string;
}

export interface TextureAtlas {
  id: string;
  texture?: string;
}

export interface Container<T> {
  items: T[];
}

export interface BehaviorPackContainer {
  blocks: Block[];
  biomes: Biome[];
  entities: Entity[];
  items: Item[];
  lootTables: LootTable[];
  trading: Trading[];
  features: string[];
}

export interface ResourcePackContainer {
  animations: Animation[];
  animationControllers: AnimationController[];
  entities: Entity[];
  fogs: Fog[];
  models: Model[];
  particles: Particle[];
  renderControllers: RenderController[];
  materials: Material[];
  sounds: Sound[];
  soundFiles: string[];
  textures: Texture[];
  textureItems: TextureAtlas[];
  textureTerrain: TextureAtlas[];
}

export interface General {
  biomes: string[];
  cameraPresets: string[];
  cooldownCategory: string[];
  dimensions: string[];
  effects: string[];
  enchantments: string[];
  features: string[];
  potionEffects: string[];
  potionModifiers: string[];
  potionTypes: string[];
}

export interface OutputSet {
  behaviorPack: BehaviorPackContainer;
  resourcePack: ResourcePackContainer;
}

export interface Output {
  vanilla: OutputSet;
  edu: OutputSet;
  general: General;
}
