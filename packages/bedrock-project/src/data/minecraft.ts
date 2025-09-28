import { MinecraftData as VanillaData } from "bc-minecraft-bedrock-vanilla-data";
import { Definition, MCProject } from "bc-minecraft-project";
import { ProjectData } from "../project";
import { ResourcePackCollection } from "../project/resource-pack";
import { BehaviorPackCollection } from "../project/behavior-pack";

export interface ProjectItem<T> {
  item: T;
  type: "project";
}

export namespace ProjectItem {
  export function is<T>(value: any | ProjectItem<T>): value is ProjectItem<T> {
    return value.type === "project";
  }

  export function create<T>(v: T): ProjectItem<T> {
    return {
      item: v,
      type: "project",
    };
  }
}

export interface DefinitionItem<T> {
  item: T;
  type: "definition";
  excluded: boolean;
}

export namespace DefinitionItem {
  export function is<T>(value: any | DefinitionItem<T>): value is DefinitionItem<T> {
    return value.type === "definition";
  }

  export function create<T>(v: T, excluded: boolean): DefinitionItem<T> {
    return {
      item: v,
      type: "definition",
      excluded: excluded,
    };
  }
}

export interface VanillaItem<T> {
  item: T;
  type: "vanilla";
}

export namespace VanillaItem {
  export function is<T>(value: any | VanillaItem<T>): value is VanillaItem<T> {
    return value.type === "vanilla";
  }

  export function create<T>(v: T): VanillaItem<T> {
    return {
      item: v,
      type: "vanilla",
    };
  }
}

export class MinecraftData {
  public projectData: ProjectData;

  constructor(projectData: ProjectData) {
    this.projectData = projectData;
    this.behaviors = new BehaviorData(projectData.behaviorPacks);
    this.resources = new ResourceData(projectData.resourcePacks);
  }

  public behaviors: BehaviorData;
  public resources: ResourceData;
}

export class BehaviorData {
  private _behaviorpacks: BehaviorPackCollection;

  constructor(behaviorpacks: BehaviorPackCollection) {
    this._behaviorpacks = behaviorpacks;
  }

  animations = firstReturn(
    fromDefinition("animation"),
    fromProject(() => this._behaviorpacks.animations)
    // No Vanilla
  );

  animation_controllers = firstReturn(
    fromDefinition("animation_controller"),
    fromProject(() => this._behaviorpacks.animation_controllers)
    // No Vanilla
  );
  biomes = firstReturn(
    fromDefinition("biome"),
    fromProject(() => this._behaviorpacks.biomes),
    fromVanilla(VanillaData.BehaviorPack.getBiome)
  );
  blocks = firstReturn(
    fromDefinition("block"),
    fromProject(() => this._behaviorpacks.blocks),
    fromVanilla(VanillaData.BehaviorPack.getBlock)
  );

  // TODO block states

  entities = firstReturn(
    fromDefinition("entity"),
    fromProject(() => this._behaviorpacks.entities),
    fromVanilla(VanillaData.BehaviorPack.getEntity)
  );
  features = firstReturn(
    fromDefinition("feature"),
    fromProject(() => this._behaviorpacks.features),
    fromVanilla(VanillaData.BehaviorPack.getFeature)
  );
  features_rules = firstReturn(
    fromDefinition("features_rule"),
    fromProject(() => this._behaviorpacks.features_rules)
    // No Vanilla
  );
  functions = firstReturn(
    fromDefinition("function"),
    fromProject(() => this._behaviorpacks.functions)
    // No Vanilla
  );
  items = firstReturn(
    fromDefinition("item"),
    fromProject(() => this._behaviorpacks.items),
    fromVanilla(VanillaData.BehaviorPack.getItem)
  );
  items_groups = firstReturn(
    fromDefinition("item_group"),
    fromProject(() => this._behaviorpacks.items_groups)
    // No Vanilla
  );
  loot_tables = firstReturn(
    fromDefinition("loot_table"),
    fromProject(() => this._behaviorpacks.loot_tables),
    fromVanilla(VanillaData.BehaviorPack.getLootTable)
  );
  structures = firstReturn(
    fromDefinition("structure"),
    fromProject(() => this._behaviorpacks.structures)
    // No Vanilla
  );
  trading = firstReturn(
    fromDefinition("trading"),
    fromProject(() => this._behaviorpacks.trading),
    fromVanilla(VanillaData.BehaviorPack.getTrading)
  );
}

export class ResourceData {
  private _resourcepacks: ResourcePackCollection;

  constructor(resourcepacks: ResourcePackCollection) {
    this._resourcepacks = resourcepacks;
  }

  animations = firstReturn(
    fromDefinition("animation"),
    fromProject(() => this._resourcepacks.animations),
    fromVanilla(VanillaData.ResourcePack.getAnimation)
  );
  animation_controllers = firstReturn(
    fromDefinition("animation_controller"),
    fromProject(() => this._resourcepacks.animation_controllers),
    fromVanilla(VanillaData.ResourcePack.getAnimationController)
  );
  attachables = firstReturn(
    fromDefinition("attachable"),
    fromProject(() => this._resourcepacks.attachables)
    // No Vanilla
  );
  block_culling_rules = firstReturn(
    fromDefinition("block_culling_rule"),
    fromProject(() => this._resourcepacks.block_culling_rules)
    // No Vanilla
  );
  entities = firstReturn(
    fromDefinition("entity"),
    fromProject(() => this._resourcepacks.entities),
    fromVanilla(VanillaData.ResourcePack.getEntity)
  );
  fogs = firstReturn(
    fromDefinition("fog"),
    fromProject(() => this._resourcepacks.fogs),
    fromVanilla(VanillaData.ResourcePack.getFog)
  );
  materials = firstReturn(
    fromDefinition("material"),
    fromProject(() => this._resourcepacks.materials),
    fromVanilla(VanillaData.ResourcePack.getMaterial)
  );
  models = firstReturn(
    fromDefinition("model"),
    fromProject(() => this._resourcepacks.models),
    fromVanilla(VanillaData.ResourcePack.getModel)
  );
  particles = firstReturn(
    fromDefinition("particle"),
    fromProject(() => this._resourcepacks.particles),
    fromVanilla(VanillaData.ResourcePack.getParticle)
  );
  render_controllers = firstReturn(
    fromDefinition("render_controller"),
    fromProject(() => this._resourcepacks.render_controllers),
    fromVanilla(VanillaData.ResourcePack.getRenderController)
  );
  sounds = firstReturn(
    fromDefinition("sound"),
    fromProject(() => this._resourcepacks.sounds),
    fromVanilla(VanillaData.ResourcePack.getSound)
  );
  textures = firstReturn(
    fromDefinition("texture"),
    fromProject(() => this._resourcepacks.textures),
    fromVanilla(VanillaData.ResourcePack.getTexture)
  );
  item_textures = firstReturn(
    fromDefinition("item_texture"),
    fromProject(() => this._resourcepacks.itemTextures)
    // No Vanilla
  );
  terrain_textures = firstReturn(
    fromDefinition("terrain_texture"),
    fromProject(() => this._resourcepacks.terrainTextures)
    // No Vanilla
  );
}

export class DS<A, B, C> {
  private _extractFN: Array<checkfn<A> | checkfn<B> | checkfn<C>>;
  constructor(...extractFN: Array<checkfn<A> | checkfn<B> | checkfn<C>>) {
    this._extractFN = extractFN;
  }

  has(id: string, project: MCProject): boolean {
    return this.get(id, project) !== undefined;
  }

  get(id: string, project: MCProject): A | B | C | undefined {
    for (const fn of this._extractFN) {
      const result = fn(id, project);
      if (result) {
        return result;
      }
    }

    return undefined;
  }
}

type checkfn<T> = (id: string, project: MCProject) => T | undefined;

export function firstReturn<A, B>(first: checkfn<A>, second: checkfn<B>): DS<A, B, never>;
export function firstReturn<A, B, C>(first: checkfn<A>, second: checkfn<B>, thrid: checkfn<C>): DS<A, B, C>;

export function firstReturn<A, B, C>(...checks: Array<checkfn<A> | checkfn<B> | checkfn<C>>): DS<A, B, C> {
  return new DS<A, B, C>(...checks);
}

export function fromProject<T>(dataSet: () => { get(id: string): T | undefined }): checkfn<ProjectItem<T>> {
  return function (id: string) {
    // Check vanilla
    const e = dataSet().get(id);
    if (e) {
      return ProjectItem.create(e);
    }

    return undefined;
  };
}

export function fromVanilla<T>(callfn: (id: string, edu: boolean) => T | undefined): checkfn<VanillaItem<T>> {
  return function (id: string, project: MCProject) {
    if (id === undefined) return;
    const edu = educationEnabled(project);

    if (id.includes("<")) {
      id = id.split("<")[0];
    }

    // Check vanilla
    let e = callfn(id, edu);
    if (e) {
      return VanillaItem.create(e);
    }

    // No namespace?, then we try vanilla
    if (!id.includes(":")) id = "minecraft:" + id;
    e = callfn(id, edu);
    if (e) {
      return VanillaItem.create(e);
    }

    return undefined;
  };
}

export function fromDefinition(containerKey: string): checkfn<DefinitionItem<string>> {
  return function (id: string, project: MCProject) {
    const container = project.definitions[containerKey];
    if (Definition.is(container)) {
      //Is defined
      if (container.defined.includes(id)) return DefinitionItem.create(id, false);
      if (container.excluded.includes(id)) return DefinitionItem.create(id, true);
    }

    return undefined;
  };
}

export function educationEnabled(project: MCProject): boolean {
  return project.attributes["education.enable"] === "true";
}
