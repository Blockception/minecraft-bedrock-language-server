/**
 * Data types used by the scraper
 */

export interface Block {
  id: string;
  properties?: string[];
}

export interface Entity {
  id: string;
  events: string[];
  families: string[];
}

export interface Item {
  id: string;
}

export type LootTable = string;

export type Trading = string;

export interface Biome {
  id: string;
  tags: string[];
}

export interface Animation {
  id: string;
  bones: string[];
  particles: string[];
  sounds: string[];
}

export interface AnimationController {
  id: string;
  animations: string[];
  particles: string[];
  sounds: string[];
}

export type Fog = string;

export interface Model {
  id: string;
  bones: string[];
}

export type Particle = string;

export type RenderController = string;

export type Material = string;

export type Sound = string;

export type Texture = string;

export type TextureAtlas = string;

export interface Container<T> {
  items: T[];
}

export interface BehaviorPackContainer {
  blocks: Block[];
  biomes: Biome[];
  entities: Entity[];
  items: Item[];
  lootTables: LootTable[];
  trading: string[];
  features: string[];
}

export interface ResourcePackContainer {
  animations: Animation[];
  animationControllers: AnimationController[];
  entities: Entity[];
  fogs: string[];
  models: Model[];
  particles: string[];
  renderControllers: string[];
  materials: string[];
  sounds: string[];
  soundFiles: string[];
  textures: string[];
  textureItems: string[];
  textureTerrain: string[];
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
