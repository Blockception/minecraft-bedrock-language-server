/** */
export enum PackType {
  /** */
  resource_pack,
  /** */
  behavior_pack,
  /** */
  skin_pack,
  /** */
  world,
  /** */
  unknown,
}

/** Detects the type of general data from the given uri
 * @param uri The filepath to examine, expects slashes to be '/'*/
export namespace PackType {
  /** */
  export const BehaviorPackMatch: RegExp = /[/\\].*(behav(ior|iour)([ _-]|)pack|behav(ior|iour)|bp).*[/\\]/i;
  /** */
  export const ResourcePackMatch: RegExp = /[/\\].*(resource([ _-]|)pack|resource|rp).*[/\\]/i;
  /** */
  export const WorldMatch: RegExp = /[/\\].*(world([ _-]|)template|world|wp|db).*[/\\]/i;
  /** */
  export const SkinPack: RegExp = /[/\\].*(skin([ _-]|)pack).*[/\\]/i;

  /**
   *
   * @param uri
   */
  export function detect(uri: string): PackType {
    if (BehaviorPackMatch.test(uri)) return PackType.behavior_pack;
    if (ResourcePackMatch.test(uri)) return PackType.resource_pack;
    if (WorldMatch.test(uri)) return PackType.world;
    if (SkinPack.test(uri)) return PackType.skin_pack;

    return PackType.unknown;
  }

  /**
   *
   * @param pack
   * @returns
   */
  export function toString(pack?: PackType): string {
    switch (pack) {
      case PackType.behavior_pack:
        return "behavior";
      case PackType.resource_pack:
        return "resource";
      case PackType.skin_pack:
        return "skin";
      case PackType.world:
        return "world";
      case PackType.unknown:
      default:
        return "unknown";
    }
  }

  /**
   *
   * @param pack
   * @returns
   */
  export function toStringShort(pack?: PackType): string {
    switch (pack) {
      case PackType.behavior_pack:
        return "bp";
      case PackType.resource_pack:
        return "rp";
      case PackType.skin_pack:
        return "sp";
      case PackType.world:
        return "wp";
      case PackType.unknown:
      default:
        return "unknown";
    }
  }
}
