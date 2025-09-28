import { MCProject } from "bc-minecraft-project";
import { Manifest } from "../../internal/types";
import { DataSetConnector, PackCollection } from "../../types";
import { ResourcePack } from "./resource-pack";
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
/** */
export declare class ResourcePackCollection extends PackCollection<ResourcePack> {
    /**The collection of  animations*/
    readonly animations: DataSetConnector<Animation.Animation, ResourcePack>;
    /**The collection of animations controllers*/
    readonly animation_controllers: DataSetConnector<AnimationController.AnimationController, ResourcePack>;
    /**The collection of animations controllers*/
    readonly attachables: DataSetConnector<Attachable.Attachable, ResourcePack>;
    /**The collection of block_culling_rules*/
    readonly block_culling_rules: DataSetConnector<BlockCulling.BlockCulling, ResourcePack>;
    /**The collection of entities*/
    readonly entities: DataSetConnector<Entity.Entity, ResourcePack>;
    /**The collection of fogs*/
    readonly fogs: DataSetConnector<Fog.Fog, ResourcePack>;
    /**The collection of materials*/
    readonly materials: DataSetConnector<Material.Material, ResourcePack>;
    /**The collection of models*/
    readonly models: DataSetConnector<Model.Model, ResourcePack>;
    /**The collection of models*/
    readonly particles: DataSetConnector<Particle.Particle, ResourcePack>;
    /**The collection of sounds*/
    readonly render_controllers: DataSetConnector<RenderController.RenderController, ResourcePack>;
    /**The collection of sounds*/
    readonly sounds: DataSetConnector<Sound.Sound, ResourcePack>;
    /**The collection of textures*/
    readonly textures: DataSetConnector<Texture.Texture, ResourcePack>;
    /**The collection of textures from item_texture.json*/
    readonly itemTextures: DataSetConnector<Texture.Texture, ResourcePack>;
    /**The collection of textures from terrain_texture.json*/
    readonly terrainTextures: DataSetConnector<Texture.Texture, ResourcePack>;
    /**Creates a new instances of the class*/
    constructor();
    add(folder: string, context: MCProject | string, manifest: Manifest): ResourcePack;
}
