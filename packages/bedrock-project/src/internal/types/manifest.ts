import { PackType } from "../../project/pack-type";
import { TextDocument } from "../../types";
import { Json } from "../json";

/**
 *
 */
export interface Manifest {
  /**
   *
   */
  format_version: string;
  /**
   *
   */
  header: ManifestHeader;
  /**
   *
   */
  modules?: ManifestModule[];
  /**
   *
   */
  metadata?: ManifestMetadata;
}

/**
 *
 */
export interface ManifestHeader {
  /**This is the name of the pack as it appears within Minecraft. This is a required field.*/
  name: string;
  /**This is a short description of the pack. It will appear in the game below the name of the pack. We recommend keeping it to 1-2 lines.*/
  description: string;
  /**This is a special type of identifier that uniquely identifies this pack from any other pack. UUIDs are written in the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx where each x is a hexadecimal value (0-9 or a-f). We recommend using an online service to generate this and guarantee their uniqueness,*/
  uuid: string;
  /**This is the version of your pack in the format [majorVersion, minorVersion, revision]. The version number is used when importing a pack that has been imported before. The new pack will replace the old one if the version is higher, and ignored if it's the same or lower.*/
  version: number[];
  /**This option is required for any world templates. This will lock the player from modifying the options of the world.*/
  lock_template_options?: boolean;
  /**This is the version of the base game your world template requires, specified as [majorVersion, minorVersion, revision]. We use this to determine what version of the base game resource and behavior packs to apply when your content is used.*/
  base_game_version?: number[];
  /**This is the minimum version of the game that this pack was written for. This is a required field for resource and behavior packs. This helps the game identify whether any backwards compatibility is needed for your pack. You should always use the highest version currently available when creating packs.*/
  min_engine_version?: number[];
}

/** */
export interface ManifestModule {
  /** */
  module_name?: string;
  /** */
  type?: string;
  /** */
  uuid?: string;
  /** */
  version: number[];
}

/** */
export namespace ManifestModule {
  /** */
  export const TypeResource = "resources";
  /** */
  export const TypeData = "data";
  /** */
  export const TypeWorld = "world_template";
  /** */
  export const TypeSkinPack = "skin_pack";
}

/** */
export interface ManifestMetadata {
  /** */
  authors?: string[];
  license?: string;
  url?: string;
  generated_with?: {
    [tool_name: string]: string[];
  };
}

/** */
export namespace Manifest {
  export function is(value: any): value is Manifest {
    if (typeof value === "object") {
      if (typeof value.format_version !== "number") return false;
      if (typeof value.header !== "object") return false;

      return true;
    }

    return false;
  }

  /**
   *
   * @param m
   * @returns
   */
  export function isWorldManifest(m: Manifest): boolean {
    const modules = m.modules;
    if (modules === undefined) return false;

    for (let index = 0; index < modules.length; index++) {
      const mod = modules[index];

      if (mod.type === ManifestModule.TypeWorld) return true;
    }

    return false;
  }

  /**
   *
   * @param m
   * @returns
   */
  export function isResourceManifest(m: Manifest): boolean {
    const modules = m.modules;
    if (modules === undefined) return false;

    for (let index = 0; index < modules.length; index++) {
      const mod = modules[index];

      if (mod.type === ManifestModule.TypeResource) return true;
    }

    return false;
  }

  /**
   *
   * @param m
   * @returns
   */
  export function isBehaviorManifest(m: Manifest): boolean {
    const modules = m.modules;
    if (modules === undefined) return false;

    for (let index = 0; index < modules.length; index++) {
      const mod = modules[index];

      if (mod.type === ManifestModule.TypeData) return true;
    }

    return false;
  }

  /**
   *
   * @param m
   * @returns
   */
  export function isSkinpackManifest(m: Manifest): boolean {
    const modules = m.modules;
    if (modules === undefined) return false;

    for (let index = 0; index < modules.length; index++) {
      const mod = modules[index];

      if (mod.type === ManifestModule.TypeSkinPack) return true;
    }

    return false;
  }

  /**
   *
   * @param m
   * @returns
   */
  export function detectType(m: Manifest): PackType {
    if (!m.modules) return PackType.unknown;

    for (let I = 0; I < m.modules.length; I++) {
      const mod = m.modules[I];

      switch (mod.type) {
        case ManifestModule.TypeData:
          return PackType.behavior_pack;

        case ManifestModule.TypeResource:
          return PackType.resource_pack;

        case ManifestModule.TypeWorld:
          return PackType.world;

        case ManifestModule.TypeSkinPack:
          return PackType.skin_pack;
      }
    }

    return PackType.unknown;
  }

  /**
   *
   * @param uri
   * @returns
   */
  export function getManifest(
    uri: string,
    getDocument: (uri: string) => TextDocument | undefined
  ): Manifest | undefined {
    const doc = getDocument(uri);
    if (doc) return Json.To<Manifest>(doc);

    return undefined;
  }

  export function detectTypeUri(manifestUri: string, manifest: Manifest): PackType {
    const type = PackType.detect(manifestUri);

    switch (type) {
      case PackType.behavior_pack:
      case PackType.resource_pack:
      case PackType.skin_pack:
      case PackType.world:
        return type;

      case PackType.unknown:
      default:
        const SubType = Manifest.detectType(manifest);
        return SubType;
    }

    return PackType.unknown;
  }
}
