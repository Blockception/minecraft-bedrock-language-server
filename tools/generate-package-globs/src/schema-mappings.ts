/**
 * Typed configuration for the jsonValidation glob patterns in ide/vscode/package.json.
 *
 * Edit this file to add, remove, or modify schema mappings. Run the generator
 * (`npm run generate -w generate-package-globs`) to apply changes.
 *
 * There are two kinds of entries:
 *
 * - `simple`: a static list of fileMatch patterns copied verbatim.
 * - `pack`: expands a folder path into the full set of RP or BP prefix patterns.
 *   For each pack type the generator emits up to ten patterns:
 *   five "shallow" variants (`*`) and, when `deepPath` is provided, five "deep"
 *   variants (`**\/*`). Optional `extra` patterns are appended after all pack
 *   patterns; optional `negate` patterns are appended last.
 */

/** Resource-pack or behavior-pack identifier. */
export type PackType = 'rp' | 'bp';

/** A static entry whose fileMatch patterns are used verbatim. */
export interface SimpleEntry {
  readonly type: 'simple';
  readonly url: string;
  readonly fileMatch: readonly string[];
}

/**
 * An entry whose fileMatch array is generated from a folder path and a pack
 * type.
 *
 * The five pack-prefix variants for `rp` are:
 *   `resource_packs/*`, `*resource*pack*`, `*Resource*Pack*`, `*RP*`, `*rp*`
 *
 * For `bp`:
 *   `behavior_packs/*`, `*behavior*pack*`, `*Behavior*Pack*`, `*BP*`, `*bp*`
 *
 * When `packSubfolder` is `false` the first prefix loses the `/*` wildcard
 * subfolder (e.g. `behavior_packs` instead of `behavior_packs/*`). This is
 * used for `functions/tick.json` which lives directly under `behavior_packs/`.
 */
export interface PackEntry {
  readonly type: 'pack';
  readonly url: string;
  readonly pack: PackType;
  /**
   * Path appended after each pack prefix for the "shallow" patterns, e.g.
   * `animation_controllers/*.{json,jsonc,json5}`.
   */
  readonly shallowPath: string;
  /**
   * Path appended after each pack prefix for the "deep" (recursive) patterns,
   * e.g. `animation_controllers/**\/*.{json,jsonc,json5}`. Omit to skip deep
   * pattern generation.
   */
  readonly deepPath?: string;
  /**
   * When `false`, the very first pack prefix (`resource_packs/*` /
   * `behavior_packs/*`) is used without the `/*` subfolder wildcard, becoming
   * `resource_packs` / `behavior_packs`. Defaults to `true`.
   */
  readonly packSubfolder?: boolean;
  /**
   * Extra patterns appended verbatim after all generated pack patterns, e.g.
   * extension-based aliases like `*.{animation_controller.rp,...}.json`.
   */
  readonly extra?: readonly string[];
  /**
   * Negation patterns appended last, e.g. `!models/entity/**\/*.json`.
   */
  readonly negate?: readonly string[];
}

export type SchemaMappingEntry = SimpleEntry | PackEntry;

/** All schema mappings in the order they appear in jsonValidation. */
export const SCHEMA_MAPPINGS: readonly SchemaMappingEntry[] = [
  // ── General ────────────────────────────────────────────────────────────────
  {
    type: 'simple',
    url: './minecraft-bedrock-schemas/skinpacks/skins.json',
    fileMatch: ['skin_pack/skins.{json,jsonc,json5}'],
  },
  {
    type: 'simple',
    url: './minecraft-bedrock-schemas/language/language_names.json',
    fileMatch: ['language_names.{json,jsonc,json5}'],
  },
  {
    type: 'simple',
    url: './minecraft-bedrock-schemas/language/languages.json',
    fileMatch: ['languages.{json,jsonc,json5}'],
  },
  {
    type: 'simple',
    url: './minecraft-bedrock-schemas/general/manifest.json',
    fileMatch: ['manifest.{json,jsonc,json5}'],
  },
  {
    type: 'simple',
    url: './minecraft-bedrock-schemas/general/world_x_packs.json',
    fileMatch: ['world_behavior_packs.{json,jsonc,json5}', 'world_resource_packs.{json,jsonc,json5}'],
  },

  // ── Resource pack ───────────────────────────────────────────────────────────
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/resource/animation_controllers/animation_controller.json',
    pack: 'rp',
    shallowPath: 'animation_controllers/*.{json,jsonc,json5}',
    deepPath: 'animation_controllers/**/*.{json,jsonc,json5}',
    extra: ['*.{animation_controller.rp,rpac,ac.rp,rp_ac}.{json,jsonc,json5}'],
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/resource/animations/actor_animation.json',
    pack: 'rp',
    shallowPath: 'animations/*.{json,jsonc,json5}',
    deepPath: 'animations/**/*.{json,jsonc,json5}',
    extra: ['*.{animation.rp,anim.rp,a.rp,rpa}.{json,jsonc,json5}'],
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/resource/block_culling/block_culling.json',
    pack: 'rp',
    shallowPath: 'block_culling/*.{json,jsonc,json5}',
    deepPath: 'block_culling/**/*.{json,jsonc,json5}',
    extra: ['*.{cull}.{json,jsonc,json5}'],
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/resource/attachables/attachables.json',
    pack: 'rp',
    shallowPath: 'attachables/*.{json,jsonc,json5}',
    deepPath: 'attachables/**/*.{json,jsonc,json5}',
    extra: ['*.{attachable,attach,at}.{json,jsonc,json5}'],
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/resource/biomes/biomes.json',
    pack: 'rp',
    shallowPath: 'biomes/*.{json,jsonc,json5}',
    deepPath: 'biomes/**/*.{json,jsonc,json5}',
    extra: ['*.{client_biome}.{json,jsonc,json5}'],
  },
  {
    type: 'simple',
    url: './minecraft-bedrock-schemas/resource/biomes_client.json',
    fileMatch: ['biomes_client.{json,jsonc,json5}'],
  },
  {
    type: 'simple',
    url: './minecraft-bedrock-schemas/resource/blocks.json',
    fileMatch: ['blocks.{json,jsonc,json5}'],
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/resource/entity/entity.json',
    pack: 'rp',
    shallowPath: 'entity/*.{json,jsonc,json5}',
    deepPath: 'entity/**/*.{json,jsonc,json5}',
    extra: ['*.{entity.rp,e.rp,ce,rpe,actor,entity}.{json,jsonc,json5}'],
    negate: ['!models/entity/**/*.{json,jsonc,json5}', '!models/entity/*.{json,jsonc,json5}'],
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/resource/fog/fog.json',
    pack: 'rp',
    shallowPath: 'fogs/*.{json,jsonc,json5}',
    deepPath: 'fogs/**/*.{json,jsonc,json5}',
    extra: ['*.fog.{json,jsonc,json5}'],
  },
  {
    type: 'simple',
    url: './minecraft-bedrock-schemas/resource/textures/flipbook_textures.json',
    fileMatch: ['flipbook_textures.{json,jsonc,json5}'],
  },
  {
    type: 'simple',
    url: './minecraft-bedrock-schemas/resource/textures/item_texture.json',
    fileMatch: ['item_texture.{json,jsonc,json5}'],
  },
  {
    type: 'simple',
    url: './minecraft-bedrock-schemas/resource/textures/textures_list.json',
    fileMatch: ['textures_list.{json,jsonc,json5}'],
  },
  {
    type: 'simple',
    url: './minecraft-bedrock-schemas/resource/textures/texture_set.json',
    fileMatch: ['*.texture_set.{json,jsonc,json5}'],
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/resource/items/items.json',
    pack: 'rp',
    shallowPath: 'items/*.{json,jsonc,json5}',
    deepPath: 'items/**/*.{json,jsonc,json5}',
    extra: ['*.{item.rp,i.rp,rpi,rp_item}.{json,jsonc,json5}'],
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/resource/models/entity/model_entity.json',
    pack: 'rp',
    shallowPath: 'models/*.{json,jsonc,json5}',
    deepPath: 'models/**/*.{json,jsonc,json5}',
    extra: ['*.{geo,geometry,model,g}.{json,jsonc,json5}'],
  },
  {
    type: 'simple',
    url: './minecraft-bedrock-schemas/resource/materials/materials.json',
    fileMatch: ['materials/*.material'],
  },
  {
    type: 'simple',
    url: './minecraft-bedrock-schemas/resource/sounds/music_definitions.json',
    fileMatch: ['music_definitions.json'],
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/resource/particles/particles.json',
    pack: 'rp',
    shallowPath: 'particles/*.{json,jsonc,json5}',
    deepPath: 'particles/**/*.{json,jsonc,json5}',
    extra: ['*.{particle,p}.{json,jsonc,json5}'],
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/resource/render_controllers/render_controllers.json',
    pack: 'rp',
    shallowPath: 'render_controllers/*.{json,jsonc,json5}',
    deepPath: 'render_controllers/**/*.{json,jsonc,json5}',
    extra: ['*.{render,render_controller,rc}.{json,jsonc,json5}'],
  },
  {
    type: 'simple',
    url: './minecraft-bedrock-schemas/resource/sounds/sound_definitions.json',
    fileMatch: ['sound_definitions.{json,jsonc,json5}'],
  },
  {
    type: 'simple',
    url: './minecraft-bedrock-schemas/resource/sounds.json',
    fileMatch: ['sounds.{json,jsonc,json5}'],
  },
  {
    type: 'simple',
    url: './minecraft-bedrock-schemas/resource/textures/terrain_texture.json',
    fileMatch: ['terrain_texture.{json,jsonc,json5}'],
  },
  // _ui_defs: shallow pack patterns only (specific file, no recursive depth), plus a
  // bare ui/_ui_defs path to catch packs not following the naming convention.
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/resource/ui/_ui_defs.json',
    pack: 'rp',
    shallowPath: 'ui/_ui_defs.{json,jsonc,json5}',
    extra: ['ui/_ui_defs.{json,jsonc,json5}'],
  },
  // _global_variables: same pattern as _ui_defs above.
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/resource/ui/_global_variables.json',
    pack: 'rp',
    shallowPath: 'ui/_global_variables.{json,jsonc,json5}',
    extra: ['ui/_global_variables.{json,jsonc,json5}'],
  },
  // ui: all ui files except _ui_defs and _global_variables (excluded via negate).
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/resource/ui/ui.json',
    pack: 'rp',
    shallowPath: 'ui/*.{json,jsonc,json5}',
    deepPath: 'ui/**/*.{json,jsonc,json5}',
    negate: [
      '!resource_packs/*/ui/_ui_defs.{json,jsonc,json5}',
      '!*resource*pack*/ui/_ui_defs.{json,jsonc,json5}',
      '!*Resource*Pack*/ui/_ui_defs.{json,jsonc,json5}',
      '!*RP*/ui/_ui_defs.{json,jsonc,json5}',
      '!*rp*/ui/_ui_defs.{json,jsonc,json5}',
      '!ui/_ui_defs.{json,jsonc,json5}',
      '!resource_packs/*/ui/_global_variables.{json,jsonc,json5}',
      '!*resource*pack*/ui/_global_variables.{json,jsonc,json5}',
      '!*Resource*Pack*/ui/_global_variables.{json,jsonc,json5}',
      '!*RP*/ui/_global_variables.{json,jsonc,json5}',
      '!*rp*/ui/_global_variables.{json,jsonc,json5}',
      '!ui/_global_variables.{json,jsonc,json5}',
    ],
  },

  // ── Behavior pack ───────────────────────────────────────────────────────────
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/behavior/animation_controllers/animation_controller.json',
    pack: 'bp',
    shallowPath: 'animation_controllers/*.{json,jsonc,json5}',
    deepPath: 'animation_controllers/**/*.{json,jsonc,json5}',
    extra: ['*.{animation_controller.bp,bpac,ac.bp,bp_ac}.{json,jsonc,json5}'],
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/behavior/animations/animations.json',
    pack: 'bp',
    shallowPath: 'animations/*.{json,jsonc,json5}',
    deepPath: 'animations/**/*.{json,jsonc,json5}',
    extra: ['*.{animation.bp,anim.bp,a.bp,bpa,bp_anim}.{json,jsonc,json5}'],
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/behavior/biomes/biomes.json',
    pack: 'bp',
    shallowPath: 'biomes/*.{json,jsonc,json5}',
    deepPath: 'biomes/**/*.{json,jsonc,json5}',
    extra: ['*.biome.{json,jsonc,json5}'],
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/behavior/blocks/blocks.json',
    pack: 'bp',
    shallowPath: 'blocks/*.{json,jsonc,json5}',
    deepPath: 'blocks/**/*.{json,jsonc,json5}',
    extra: ['*.{block,b}.{json,jsonc,json5}'],
  },
  {
    type: 'simple',
    url: './minecraft-bedrock-schemas/behavior/cameras/presets/cameras.json',
    fileMatch: ['cameras/presets/*.{json,jsonc,json5}'],
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/behavior/dialogue/dialogue.json',
    pack: 'bp',
    shallowPath: 'dialogue/*.{json,jsonc,json5}',
    deepPath: 'dialogue/**/*.{json,jsonc,json5}',
    extra: ['*.{diag,dialogue,dialog,d}.{json,jsonc,json5}'],
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/behavior/entities/entities.json',
    pack: 'bp',
    shallowPath: 'entities/*.{json,jsonc,json5}',
    deepPath: 'entities/**/*.{json,jsonc,json5}',
    extra: ['*.{entity.bp,e.bp,se,e.bp,bpe,behavior}.{json,jsonc,json5}'],
    negate: ['!*loot_tables*'],
  },
  // functions/tick.json lives directly under behavior_packs/ (not inside a
  // named pack subfolder), so packSubfolder is set to false.
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/behavior/functions/tick.json',
    pack: 'bp',
    packSubfolder: false,
    shallowPath: 'functions/tick.{json,jsonc,json5}',
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/behavior/features/features.json',
    pack: 'bp',
    shallowPath: 'features/*.{json,jsonc,json5}',
    deepPath: 'features/**/*.{json,jsonc,json5}',
    extra: ['*.{feature,f}.{json,jsonc,json5}'],
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/behavior/feature_rules/feature_rules.json',
    pack: 'bp',
    shallowPath: 'feature_rules/*.{json,jsonc,json5}',
    deepPath: 'feature_rules/**/*.{json,jsonc,json5}',
    extra: ['*.{feature_rule,fr}.{json,jsonc,json5}'],
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/behavior/items/items.json',
    pack: 'bp',
    shallowPath: 'items/*.{json,jsonc,json5}',
    deepPath: 'items/**/*.{json,jsonc,json5}',
    extra: ['*.{item.bp,i.bp,bpi,bp_item}.{json,jsonc,json5}'],
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/behavior/recipes/recipes.json',
    pack: 'bp',
    shallowPath: 'recipes/*.{json,jsonc,json5}',
    deepPath: 'recipes/**/*.{json,jsonc,json5}',
    extra: ['*.{recipe,crafting_recipe,cr,r}.{json,jsonc,json5}'],
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/behavior/loot_tables/loot_tables.json',
    pack: 'bp',
    shallowPath: 'loot_tables/*.{json,jsonc,json5}',
    deepPath: 'loot_tables/**/*.{json,jsonc,json5}',
    extra: ['*.{loot,loot_table,lt}.{json,jsonc,json5}'],
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/behavior/spawn_rules/spawn_rules.json',
    pack: 'bp',
    shallowPath: 'spawn_rules/*.{json,jsonc,json5}',
    deepPath: 'spawn_rules/**/*.{json,jsonc,json5}',
    extra: ['*.{spawn,sr,spawn_rule}.{json,jsonc,json5}'],
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/behavior/trading/trading.json',
    pack: 'bp',
    shallowPath: 'trading/*.{json,jsonc,json5}',
    deepPath: 'trading/**/*.{json,jsonc,json5}',
    extra: ['*.{trade,trade_table.tt}.{json,jsonc,json5}'],
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/behavior/voxel_shapes/voxel_shape.json',
    pack: 'bp',
    shallowPath: 'voxel_shapes/*.{json,jsonc,json5}',
    deepPath: 'voxel_shapes/**/*.{json,jsonc,json5}',
    extra: ['*.{vshape}.{json,jsonc,json5}'],
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/behavior/worldgen/jigsaw_structures/jigsaw.json',
    pack: 'bp',
    shallowPath: 'worldgen/{structures,jigsaw_structures}/*.{json,jsonc,json5}',
    deepPath: 'worldgen/{structures,jigsaw_structures}/**/*.{json,jsonc,json5}',
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/behavior/worldgen/processors/processor_list.json',
    pack: 'bp',
    shallowPath: 'worldgen/processors/*.{json,jsonc,json5}',
    deepPath: 'worldgen/processors/**/*.{json,jsonc,json5}',
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/behavior/worldgen/structure_sets/structure_set.json',
    pack: 'bp',
    shallowPath: 'worldgen/structure_sets/*.{json,jsonc,json5}',
    deepPath: 'worldgen/structure_sets/**/*.{json,jsonc,json5}',
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/behavior/worldgen/template_pools/template_pool.json',
    pack: 'bp',
    shallowPath: 'worldgen/template_pools/*.{json,jsonc,json5}',
    deepPath: 'worldgen/template_pools/**/*.{json,jsonc,json5}',
  },
  // textures sub-folder schemas: the path already includes a wildcard subfolder
  // level (`textures/*/`) so shallowPath and deepPath carry that nesting.
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/resource/textures/ui_texture_definition.json',
    pack: 'rp',
    shallowPath: 'textures/*/!(*.texture_set).{json,jsonc,json5}',
    deepPath: 'textures/*/**/!(*.texture_set).{json,jsonc,json5}',
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/behavior/item_catalog/crafting_item_catalog.json',
    pack: 'bp',
    shallowPath: 'item_catalog/*.{json,jsonc,json5}',
    deepPath: 'item_catalog/**/*.{json,jsonc,json5}',
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/resource/atmospherics/atmospherics.json',
    pack: 'rp',
    shallowPath: 'atmospherics/*.{json,jsonc,json5}',
    deepPath: 'atmospherics/**/*.{json,jsonc,json5}',
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/resource/color_grading/color_grading.json',
    pack: 'rp',
    shallowPath: 'color_grading/*.{json,jsonc,json5}',
    deepPath: 'color_grading/**/*.{json,jsonc,json5}',
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/resource/lighting/lighting.json',
    pack: 'rp',
    shallowPath: 'lighting/*.{json,jsonc,json5}',
    deepPath: 'lighting/**/*.{json,jsonc,json5}',
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/resource/water/water.json',
    pack: 'rp',
    shallowPath: 'water/*.{json,jsonc,json5}',
    deepPath: 'water/**/*.{json,jsonc,json5}',
  },
  // Specific-file pack schemas (shallow only, no recursive depth).
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/resource/pbr/pbr.json',
    pack: 'rp',
    shallowPath: 'pbr/global.{json,jsonc,json5}',
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/resource/point_lights/point_lights.json',
    pack: 'rp',
    shallowPath: 'point_lights/global.{json,jsonc,json5}',
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/resource/local_lighting/local_lighting.json',
    pack: 'rp',
    shallowPath: 'local_lighting/local_lighting.{json,jsonc,json5}',
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/resource/shadows/shadows.json',
    pack: 'rp',
    shallowPath: 'shadows/global.{json,jsonc,json5}',
  },
  {
    type: 'pack',
    url: './minecraft-bedrock-schemas/resource/cubemaps/cubemaps.json',
    pack: 'rp',
    shallowPath: 'cubemaps/*.{json,jsonc,json5}',
    deepPath: 'cubemaps/**/*.{json,jsonc,json5}',
  },
];
