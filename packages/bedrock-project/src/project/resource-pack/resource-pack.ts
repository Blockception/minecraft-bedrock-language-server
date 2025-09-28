import { MCProject } from "bc-minecraft-project";
import { Manifest } from "../../internal/types/manifest";
import { Container, DataSet, Pack, TextDocument } from "../../types";
import { PackType } from "../pack-type";
import { FileType } from "./file-type";

import * as Animation from "./animation";
import * as AnimationController from "./animation-controller";
import * as Attachable from "./attachable";
import * as BlockCulling from "./block-culling";
import * as Entity from "./entity";
import * as Fog from "./fog";
import * as Material from "./material";
import * as Model from "./model";
import * as Particle from "./particle";
import * as RenderController from "./render-controller";
import * as Sound from "./sound";
import * as Texture from "./texture";

type CollectFieldsOfType<T> = {
  [K in keyof T]: T[K] extends DataSet<infer U> ? U : never;
};
type CollectionFieldsDataSet<T> = {
  [K in keyof T]: T[K] extends DataSet<infer U> ? DataSet<U> : never;
};

type FieldKeysDataSet<T> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [K in keyof T]: T[K] extends DataSet<infer _U> ? K : never;
};

type ItemTypes = CollectFieldsOfType<ResourcePack>[keyof ResourcePack];
type DataSetTypes = CollectionFieldsDataSet<ResourcePack>[keyof ResourcePack];

export type ResourcePackKeys = FieldKeysDataSet<ResourcePack>[keyof ResourcePack];

/** */
export class ResourcePack implements Container, Pack {
  readonly type: PackType = PackType.resource_pack;
  readonly folder: string;
  readonly context: MCProject;
  readonly manifest: Manifest;

  /**The collection of  animations*/
  readonly animations: DataSet<Animation.Animation>;
  /**The collection of animations controllers*/
  readonly animation_controllers: DataSet<AnimationController.AnimationController>;
  /**The collection of animations controllers*/
  readonly attachables: DataSet<Attachable.Attachable>;
  /**The collection of blocks culling rules*/
  readonly block_culling_rules: DataSet<BlockCulling.BlockCulling>;
  /**The collection of entities*/
  readonly entities: DataSet<Entity.Entity>;
  /**The collection of fogs*/
  readonly fogs: DataSet<Fog.Fog>;
  /**The collection of materials*/
  readonly materials: DataSet<Material.Material>;
  /**The collection of models*/
  readonly models: DataSet<Model.Model>;
  /**The collection of models*/
  readonly particles: DataSet<Particle.Particle>;
  /**The collection of sounds*/
  readonly sounds: DataSet<Sound.Sound>;
  /**The collection of sounds*/
  readonly render_controllers: DataSet<RenderController.RenderController>;
  /**The collection of textures*/
  readonly textures: DataSet<Texture.Texture>;
  /**The collection of textures from item_texture.json*/
  readonly itemTextures: DataSet<Texture.Texture>;
  /**The collection of textures from terrain_texture.json*/
  readonly terrainTextures: DataSet<Texture.Texture>;

  /**
   * Creates a new instance of ResourcePack
   * @param folder The folder of the behavior
   * @param Context The Mcproject data or the filepath to read from*/
  constructor(folder: string, Context: MCProject | string, manifest: Manifest) {
    this.manifest = manifest;
    this.folder = folder;
    this.context = typeof Context === "object" ? Context : MCProject.loadSync(Context);

    this.animation_controllers = new DataSet();
    this.animations = new DataSet();
    this.attachables = new DataSet();
    this.block_culling_rules = new DataSet();
    this.entities = new DataSet();
    this.fogs = new DataSet();
    this.materials = new DataSet();
    this.models = new DataSet();
    this.particles = new DataSet();
    this.render_controllers = new DataSet();
    this.sounds = new DataSet();
    this.textures = new DataSet();
    this.itemTextures = new DataSet();
    this.terrainTextures = new DataSet();
  }

  /**
   *
   * @param doc
   */
  process(doc: TextDocument): DataSetTypes | undefined {
    this.deleteFile(doc.uri);
    const Type = FileType.detect(doc.uri);

    switch (Type) {
      case FileType.animation:
        return this.animations.set(Animation.process(doc));

      case FileType.animation_controller:
        return this.animation_controllers.set(AnimationController.process(doc));

      case FileType.block_culling_rules:
        return this.block_culling_rules.set(BlockCulling.process(doc));

      case FileType.attachable:
        return this.attachables.set(Attachable.process(doc));

      case FileType.entity:
        return this.entities.set(Entity.process(doc));

      case FileType.fog:
        return this.fogs.set(Fog.process(doc));

      case FileType.material:
        return this.materials.set(Material.process(doc));

      case FileType.model:
        return this.models.set(Model.process(doc));

      case FileType.render_controller:
        return this.render_controllers.set(RenderController.process(doc));

      case FileType.particle:
        return this.particles.set(Particle.process(doc));

      case FileType.sounds_definitions:
        return this.sounds.set(Sound.process(doc));

      case FileType.texture:
        return this.textures.set(Texture.ProcessTextureAtlas(doc));
      case FileType.texture_item_atlas:
        return this.itemTextures.set(Texture.ProcessTextureAtlas(doc));
      case FileType.texture_terrain_atlas:
        return this.terrainTextures.set(Texture.ProcessTextureAtlas(doc));
    }

    return undefined;
  }

  /**
   *
   * @param uri
   * @returns
   */
  getDataset(uri: string): DataSetTypes | undefined {
    const Type = FileType.detect(uri);

    switch (Type) {
      case FileType.animation:
        return this.animations;

      case FileType.animation_controller:
        return this.animation_controllers;

      case FileType.attachable:
        return this.attachables;

      case FileType.block_culling_rules:
        return this.block_culling_rules;

      case FileType.entity:
        return this.entities;

      case FileType.fog:
        return this.fogs;

      case FileType.material:
        return this.materials;

      case FileType.model:
        return this.models;

      case FileType.particle:
        return this.particles;

      case FileType.render_controller:
        return this.particles;

      case FileType.sounds_definitions:
        return this.sounds;

      case FileType.texture:
        return this.itemTextures;
      case FileType.texture_item_atlas:
        return this.itemTextures;
      case FileType.texture_terrain_atlas:
        return this.terrainTextures;

      default:
        return undefined;
    }
  }

  /**
   *
   * @param uri
   */
  deleteFolder(uri: string): boolean {
    let out = false;

    out = this.animations.deleteFolder(uri) || out;
    out = this.animation_controllers.deleteFolder(uri) || out;
    out = this.attachables.deleteFolder(uri) || out;
    out = this.block_culling_rules.deleteFolder(uri) || out;
    out = this.entities.deleteFolder(uri) || out;
    out = this.fogs.deleteFolder(uri) || out;
    out = this.materials.deleteFolder(uri) || out;
    out = this.models.deleteFolder(uri) || out;
    out = this.particles.deleteFolder(uri) || out;
    out = this.sounds.deleteFolder(uri) || out;
    out = this.textures.deleteFolder(uri) || out;
    out = this.itemTextures.deleteFolder(uri) || out;
    out = this.terrainTextures.deleteFolder(uri) || out;

    return out;
  }

  /**
   *
   * @param uri
   * @returns
   */
  deleteFile(uri: string): boolean {
    let out = false;

    out = this.animations.deleteFile(uri) || out;
    out = this.animation_controllers.deleteFile(uri) || out;
    out = this.attachables.deleteFile(uri) || out;
    out = this.block_culling_rules.deleteFile(uri) || out;
    out = this.entities.deleteFile(uri) || out;
    out = this.fogs.deleteFile(uri) || out;
    out = this.materials.deleteFile(uri) || out;
    out = this.models.deleteFile(uri) || out;
    out = this.particles.deleteFile(uri) || out;
    out = this.sounds.deleteFile(uri) || out;
    out = this.textures.deleteFile(uri) || out;
    out = this.itemTextures.deleteFile(uri) || out;
    out = this.terrainTextures.deleteFile(uri) || out;

    return out;
  }

  /**
   *
   * @param predicate
   * @returns
   */
  find(predicate: (value: ItemTypes, key: string) => boolean): ItemTypes | undefined {
    let value = undefined;

    if ((value = this.animation_controllers.find(predicate))) return value;
    if ((value = this.animations.find(predicate))) return value;
    if ((value = this.attachables.find(predicate))) return value;
    if ((value = this.block_culling_rules.find(predicate))) return value;
    if ((value = this.entities.find(predicate))) return value;
    if ((value = this.fogs.find(predicate))) return value;
    if ((value = this.materials.find(predicate))) return value;
    if ((value = this.models.find(predicate))) return value;
    if ((value = this.particles.find(predicate))) return value;
    if ((value = this.render_controllers.find(predicate))) return value;
    if ((value = this.sounds.find(predicate))) return value;
    if ((value = this.itemTextures.find(predicate))) return value;
    if ((value = this.terrainTextures.find(predicate))) return value;
    if ((value = this.textures.find(predicate))) return value;

    return value;
  }

  /**
   *
   * @param predicate
   * @returns
   */
  forEach(callbackfn: (value: ItemTypes) => void): void {
    this.animation_controllers.forEach(callbackfn);
    this.animations.forEach(callbackfn);
    this.attachables.forEach(callbackfn);
    this.entities.forEach(callbackfn);
    this.fogs.forEach(callbackfn);
    this.materials.forEach(callbackfn);
    this.models.forEach(callbackfn);
    this.particles.forEach(callbackfn);
    this.render_controllers.forEach(callbackfn);
    this.sounds.forEach(callbackfn);
    this.textures.forEach(callbackfn);
    this.itemTextures.forEach(callbackfn);
    this.terrainTextures.forEach(callbackfn);
  }
}

/**
 *
 */
export namespace ResourcePack {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is ResourcePack {
    if (typeof value === "object") {
      const temp = <ResourcePack>value;
      //Order is determined buy likely / unlikely it is that it missing
      if (typeof temp.attachables !== "object") return false;
      if (typeof temp.fogs !== "object") return false;
      if (typeof temp.materials !== "object") return false;
      if (typeof temp.models !== "object") return false;
      if (typeof temp.particles !== "object") return false;
      if (typeof temp.render_controllers !== "object") return false;
      if (typeof temp.sounds !== "object") return false;
      if (typeof temp.textures !== "object") return false;

      if (typeof temp.animations !== "object") return false;
      if (typeof temp.animation_controllers !== "object") return false;
      if (typeof temp.block_culling_rules !== "object") return false;
      if (typeof temp.entities !== "object") return false;

      if (typeof temp.context !== "object") return false;
      if (typeof temp.folder !== "string") return false;

      return true;
    }

    return false;
  }
}
