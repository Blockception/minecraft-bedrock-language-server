import { MCProject } from "bc-minecraft-project";
import { Manifest } from "../../internal/types/manifest";
import { Container, DataSet, Pack, TextDocument } from "../../types";
import { PackType } from "../pack-type";
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
    [K in keyof T]: T[K] extends DataSet<infer _U> ? K : never;
};
type ItemTypes = CollectFieldsOfType<ResourcePack>[keyof ResourcePack];
type DataSetTypes = CollectionFieldsDataSet<ResourcePack>[keyof ResourcePack];
export type ResourcePackKeys = FieldKeysDataSet<ResourcePack>[keyof ResourcePack];
/** */
export declare class ResourcePack implements Container, Pack {
    readonly type: PackType;
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
    constructor(folder: string, Context: MCProject | string, manifest: Manifest);
    /**
     *
     * @param doc
     */
    process(doc: TextDocument): DataSetTypes | undefined;
    /**
     *
     * @param uri
     * @returns
     */
    getDataset(uri: string): DataSetTypes | undefined;
    /**
     *
     * @param uri
     */
    deleteFolder(uri: string): boolean;
    /**
     *
     * @param uri
     * @returns
     */
    deleteFile(uri: string): boolean;
    /**
     *
     * @param predicate
     * @returns
     */
    find(predicate: (value: ItemTypes, key: string) => boolean): ItemTypes | undefined;
    /**
     *
     * @param predicate
     * @returns
     */
    forEach(callbackfn: (value: ItemTypes) => void): void;
}
/**
 *
 */
export declare namespace ResourcePack {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is ResourcePack;
}
export {};
