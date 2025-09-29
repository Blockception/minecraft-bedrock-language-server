import { DataSetConnector, Pack, ProjectData } from "bc-minecraft-bedrock-project";
import { Types } from "bc-minecraft-bedrock-types";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { Identifiable } from "bc-minecraft-bedrock-vanilla-data/src/lib/types";
import { DiagnosticsBuilder } from "../types";
import { education_enabled } from "../diagnostics";

export type ItemBase = Identifiable & Types.Locatable;

export type PackType = keyof Pick<typeof MinecraftData, "BehaviorPack" | "ResourcePack">;

export type VanillaTypes = {
  BehaviorPack: keyof typeof MinecraftData.BehaviorPack;
  ResourcePack: keyof typeof MinecraftData.ResourcePack;
};

export class Storage {
  public cache: ProjectData;
  public useEducation: boolean;

  constructor(cache: ProjectData, useEducation: boolean = false) {
    this.cache = cache;
    this.useEducation = useEducation;
  }

  private exporter<T extends ItemBase, V, U extends Pack>(
    cache?: DataSetConnector<T, U>,
    vanilla?: (id: string, edu: boolean) => V
  ): Exporter<T, V, U> {
    return new Exporter(cache, vanilla, this.useEducation);
  }

  private singleton<T>(id: string, item: () => T): () => T {
    return () => {
      let out = (this as any)[id];
      if (out === undefined) {
        out = item();
        (this as any)[id] = out;
      }

      return out;
    };
  }

  get behavior_pack() {
    return this.singleton("__bp", () => {
      return {
        animations: this.exporter(this.cache.behaviorPacks.animations),
        animation_controllers: this.exporter(this.cache.behaviorPacks.animation_controllers),
        blocks: this.exporter(this.cache.behaviorPacks.blocks, MinecraftData.BehaviorPack.getBlock),
        entities: this.exporter(this.cache.behaviorPacks.entities, MinecraftData.BehaviorPack.getEntity),
        functions: this.exporter(this.cache.behaviorPacks.functions),
        items: this.exporter(this.cache.behaviorPacks.items, MinecraftData.BehaviorPack.getItem),
        loot_tables: this.exporter(this.cache.behaviorPacks.loot_tables, MinecraftData.BehaviorPack.getLootTable),
        structures: this.exporter(this.cache.behaviorPacks.structures),
        trading: this.exporter(this.cache.behaviorPacks.trading, MinecraftData.BehaviorPack.getTrading),
      };
    });
  }

  get resource_pack() {
    return this.singleton("__rp", () => {
      return {
        animations: this.exporter(this.cache.resourcePacks.animations, MinecraftData.ResourcePack.getAnimation),
        animation_controllers: this.exporter(
          this.cache.resourcePacks.animation_controllers,
          MinecraftData.ResourcePack.getAnimationController
        ),
        attachables: this.exporter(this.cache.resourcePacks.attachables),
        block_culling_rules: this.exporter(this.cache.resourcePacks.block_culling_rules),
        entities: this.exporter(this.cache.resourcePacks.entities, MinecraftData.ResourcePack.getEntity),
        fogs: this.exporter(this.cache.resourcePacks.fogs, MinecraftData.ResourcePack.getFog),
        materials: this.exporter(this.cache.resourcePacks.materials, MinecraftData.ResourcePack.getMaterial),
        models: this.exporter(this.cache.resourcePacks.models, MinecraftData.ResourcePack.getModel),
        particles: this.exporter(this.cache.resourcePacks.particles, MinecraftData.ResourcePack.getParticle),
        render_controllers: this.exporter(
          this.cache.resourcePacks.render_controllers,
          MinecraftData.ResourcePack.getRenderController
        ),
        sounds: this.exporter(this.cache.resourcePacks.sounds, MinecraftData.ResourcePack.getSound),
        textures: this.exporter(this.cache.resourcePacks.textures, MinecraftData.ResourcePack.getTexture),
      };
    });
  }

  static from(diagnoser: DiagnosticsBuilder): Storage {
    return new Storage(diagnoser.context.getProjectData().projectData, education_enabled(diagnoser));
  }
}

export class Exporter<T extends ItemBase, V, U extends Pack> {
  private _cache: Pick<DataSetConnector<T, U>, "get">;
  private _useEducation: boolean;
  private _vanilla: (id: string, edu: boolean) => V | undefined;

  constructor(_cache?: DataSetConnector<T, U>, vanilla?: (id: string, edu: boolean) => V, useEducation?: boolean) {
    function noop() {
      return undefined;
    }

    this._cache = _cache || { get: noop };
    this._vanilla = vanilla || noop;
    this._useEducation = useEducation || false;
  }

  get(id: string): T | V | undefined {
    const item = this._cache.get(id);
    if (item !== undefined) return item;

    return this._vanilla(id, this._useEducation);
  }
}
