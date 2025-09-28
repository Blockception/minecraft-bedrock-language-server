/***/
export enum FileType {
  /***/
  animation,
  /***/
  animation_controller,
  /***/
  biome,
  /***/
  block,
  /***/
  entity,
  /***/
  feature,
  /***/
  feature_rule,
  /***/
  function,
  /***/
  item,
  /***/
  item_catalog,
  /***/
  loot_table,
  /***/
  manifest,
  /***/
  script,
  /***/
  spawn_rule,
  /***/
  recipe,
  /***/
  structure,
  /***/
  trading,
  /***/
  unknown,
}

export namespace FileType {
  /**Detects behavior pack file type, already assumed the path belongs to a behavior pack
   * @param uri The filepath to examine, expects slashes to be '/'*/
  export function detect(uri: string): FileType {
    if (uri.endsWith(".mcfunction")) return FileType.function;
    if (uri.endsWith(".js")) return FileType.script;

    //Folders
    if (/[\\/]animation_controllers[\\/]/.test(uri)) return FileType.animation_controller;
    if (/[\\/]animations[\\/]/.test(uri)) return FileType.animation;
    if (/[\\/]functions[\\/]/.test(uri)) return FileType.function;
    if (/[\\/]loot_tables[\\/]/.test(uri)) return FileType.loot_table;
    if (/[\\/]scripts[\\/]/.test(uri)) return FileType.script;
    if (/[\\/]spawn_rules[\\/]/.test(uri)) return FileType.spawn_rule;
    if (/[\\/]structures[\\/]/.test(uri)) return FileType.structure;
    if (/[\\/]trading[\\/]/.test(uri)) return FileType.trading;
    if (/[\\/]features[\\/]/.test(uri)) return FileType.feature;
    if (/[\\/]feature_rules[\\/]/.test(uri)) return FileType.feature_rule;
    if (/[\\/]item_catalog[\\/]/.test(uri)) return FileType.item_catalog;
    if (/[\\/]biomes[\\/]/.test(uri)) return FileType.biome;
    if (/[\\/]recipes[\\/]/.test(uri)) return FileType.recipe;
    //These can also be subfolders
    if (/[\\/]blocks[\\/]/.test(uri)) return FileType.block;
    if (/[\\/]entities[\\/]/.test(uri)) return FileType.entity;
    if (/[\\/]items[\\/]/.test(uri)) return FileType.item;

    //Files
    if (uri.endsWith("manifest.json")) return FileType.manifest;

    return FileType.unknown;
  }
}
