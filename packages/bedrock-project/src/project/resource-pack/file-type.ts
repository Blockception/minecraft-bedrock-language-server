import path from "path";

/** */
export enum FileType {
  /** */
  animation,
  /** */
  animation_controller,
  /** */
  attachable,
  /** */
  block_culling_rules,
  /**The file biomes_client */
  biomes_client,
  /** */
  block,
  /** */
  entity,
  /** */
  fog,
  /** */
  item,
  /** */
  manifest,
  /** */
  material,
  /** */
  model,
  /** */
  music_definitions,
  /** */
  particle,
  /** */
  render_controller,
  /** */
  sounds,
  /**The file sound_definitions*/
  sounds_definitions,
  /** */
  texture,
  /** */
  texture_flipbook_atlas,
  /**The file texture_item_atlas*/
  texture_item_atlas,
  /**The file terrain_texture.json */
  texture_terrain_atlas,
  /** */
  unknown,
}

/** */
export namespace FileType {
  /**Detects resource pack resource, already assumed the path belongs to a resource pack
   * @param uri the decoded uri, expects slashes to be '/'*/
  export function detect(uri: string): FileType {
    //Folders
    if (/[\\/]animation_controllers[\\/]/.test(uri)) return FileType.animation_controller;
    if (/[\\/]animations[\\/]/.test(uri)) return FileType.animation;
    if (/[\\/]attachables[\\/]/.test(uri)) return FileType.attachable;
    if (/[\\/]block_culling[\\/]/.test(uri)) return FileType.block_culling_rules;
    if (/[\\/]models[\\/]/.test(uri)) return FileType.model;
    if (/[\\/]models[\\/]entities[\\/]/.test(uri)) return FileType.model;
    if (/[\\/]entity[\\/]/.test(uri)) return FileType.entity;
    if (/[\\/]particles[\\/]/.test(uri)) return FileType.particle;
    if (/[\\/]render_controllers[\\/]/.test(uri)) return FileType.render_controller;

    const filename = path.basename(uri);

    switch (filename) {
      case "biomes_client.json":
        return FileType.biomes_client;

      case "blocks.json":
        return FileType.block;

      case "flipbook_textures.json":
        return FileType.texture_flipbook_atlas;

      case "item_texture.json":
        return FileType.texture_item_atlas;

      case "manifest.json":
        return FileType.manifest;

      case "music_definitions.json":
        return FileType.music_definitions;

      case "sound_definitions.json":
        return FileType.sounds_definitions;

      case "sounds.json":
        return FileType.sounds;

      case "terrain_texture.json":
        return FileType.texture_terrain_atlas;
    }

    if (/[\\/]textures[\\/]/.test(uri)) return FileType.texture;

    return FileType.unknown;
  }
}
