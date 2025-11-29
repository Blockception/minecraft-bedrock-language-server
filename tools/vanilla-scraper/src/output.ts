import * as fs from 'fs';
import * as path from 'path';
import { Output, OutputSet, BehaviorPackContainer, ResourcePackContainer, General } from './types.js';

/**
 * Create empty output structure
 */
export function createOutput(): Output {
  return {
    vanilla: createOutputSet(),
    edu: createOutputSet(),
    general: createGeneral(),
  };
}

function createOutputSet(): OutputSet {
  return {
    behaviorPack: createBehaviorPackContainer(),
    resourcePack: createResourcePackContainer(),
  };
}

function createBehaviorPackContainer(): BehaviorPackContainer {
  return {
    blocks: [],
    biomes: [],
    entities: [],
    items: [],
    lootTables: [],
    trading: [],
    features: [],
  };
}

function createResourcePackContainer(): ResourcePackContainer {
  return {
    animations: [],
    animationControllers: [],
    entities: [],
    fogs: [],
    models: [],
    particles: [],
    renderControllers: [],
    materials: [],
    sounds: [],
    soundFiles: [],
    textures: [],
    textureItems: [],
    textureTerrain: [],
  };
}

function createGeneral(): General {
  return {
    biomes: [],
    cameraPresets: [],
    cooldownCategory: [],
    dimensions: [],
    effects: [],
    enchantments: [],
    features: [],
    potionEffects: [],
    potionModifiers: [],
    potionTypes: [],
  };
}

/**
 * Load base data from existing files (if they exist)
 */
export function loadBaseData(baseFolder: string): Output {
  const output = createOutput();

  // In the C# version, this loads existing data to merge with new data
  // For simplicity, we'll start fresh each time
  // If needed, we can implement loading logic here

  return output;
}

/**
 * Clean and prune data
 */
export function cleanOutput(output: Output): void {
  // Remove duplicates and sort arrays
  cleanOutputSet(output.vanilla);
  cleanOutputSet(output.edu);

  output.general.biomes = uniqueStrings(output.general.biomes);
  output.general.cameraPresets = uniqueStrings(output.general.cameraPresets);
  output.general.cooldownCategory = uniqueStrings(output.general.cooldownCategory);
  output.general.dimensions = uniqueStrings(output.general.dimensions);
  output.general.effects = uniqueStrings(output.general.effects);
  output.general.enchantments = uniqueStrings(output.general.enchantments);
  output.general.features = uniqueStrings(output.general.features);
  output.general.potionEffects = uniqueStrings(output.general.potionEffects);
  output.general.potionModifiers = uniqueStrings(output.general.potionModifiers);
  output.general.potionTypes = uniqueStrings(output.general.potionTypes);
}

function cleanOutputSet(set: OutputSet) {
  set.behaviorPack.biomes = uniqueById(set.behaviorPack.biomes);
  set.behaviorPack.blocks = uniqueById(set.behaviorPack.blocks);
  set.behaviorPack.entities = uniqueById(set.behaviorPack.entities);
  set.behaviorPack.features = uniqueStrings(set.behaviorPack.features);
  set.behaviorPack.items = uniqueById(set.behaviorPack.items);
  set.behaviorPack.lootTables = uniqueStrings(set.behaviorPack.lootTables);
  set.behaviorPack.trading = uniqueStrings(set.behaviorPack.trading);

  set.resourcePack.animationControllers = uniqueById(set.resourcePack.animationControllers);
  set.resourcePack.animations = uniqueById(set.resourcePack.animations);
  set.resourcePack.entities = uniqueById(set.resourcePack.entities);
  set.resourcePack.fogs = uniqueStrings(set.resourcePack.fogs);
  set.resourcePack.materials = uniqueStrings(set.resourcePack.materials);
  set.resourcePack.models = uniqueById(set.resourcePack.models);
  set.resourcePack.particles = uniqueStrings(set.resourcePack.particles);
  set.resourcePack.renderControllers = uniqueStrings(set.resourcePack.renderControllers);
  set.resourcePack.soundFiles = uniqueStrings(set.resourcePack.soundFiles);
  set.resourcePack.sounds = uniqueStrings(set.resourcePack.sounds);
  set.resourcePack.textureItems = uniqueStrings(set.resourcePack.textureItems);
  set.resourcePack.textures = uniqueStrings(set.resourcePack.textures);
  set.resourcePack.textureTerrain = uniqueStrings(set.resourcePack.textureTerrain);
}

function uniqueById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  const result: T[] = [];

  for (const item of items) {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      result.push(item);
    }
  }

  return result.sort((a, b) => a.id.localeCompare(b.id));
}

function uniqueStrings(items: string[]): string[] {
  return Array.from(new Set(items)).sort();
}

/**
 * Save output to TypeScript files
 */
export function saveOutput(output: Output, outputFolder: string): void {
  // Create output directories
  const vanillaFolder = path.join(outputFolder, 'vanilla');
  const eduFolder = path.join(outputFolder, 'edu');
  const generalFolder = path.join(outputFolder, 'general');

  fs.mkdirSync(vanillaFolder, { recursive: true });
  fs.mkdirSync(eduFolder, { recursive: true });
  fs.mkdirSync(generalFolder, { recursive: true });

  // Save vanilla data
  saveOutputSet(output.vanilla, vanillaFolder, 'vanilla');

  // Save edu data
  saveOutputSet(output.edu, eduFolder, 'edu');

  // Save general data
  saveGeneral(output.general, generalFolder);
}

function saveOutputSet(outputSet: OutputSet, folder: string, name: string): void {
  const bpFolder = path.join(folder, 'behaviorpack');
  const rpFolder = path.join(folder, 'resourcepack');

  fs.mkdirSync(bpFolder, { recursive: true });
  fs.mkdirSync(rpFolder, { recursive: true });

  // Create index files for the folders
  createIndexFile(folder, ['behaviorpack', 'resourcepack']);
  createBPIndexFile(bpFolder);
  createRPIndexFile(rpFolder);

  // Save behavior pack data
  saveTypeScriptFile(
    outputSet.behaviorPack.blocks,
    path.join(bpFolder, 'blocks.ts'),
    'Block',
    '../../types/behaviorpack/block',
    'Blocks',
  );
  saveTypeScriptFile(
    outputSet.behaviorPack.entities,
    path.join(bpFolder, 'entities.ts'),
    'Entity',
    '../../types/behaviorpack/entity',
    'Entities',
  );
  saveTypeScriptFile(
    outputSet.behaviorPack.items,
    path.join(bpFolder, 'items.ts'),
    'Item',
    '../../types/behaviorpack/item',
    'Items',
  );
  saveTypeScriptFile(
    outputSet.behaviorPack.biomes,
    path.join(bpFolder, 'biomes.ts'),
    'Biome',
    '../../types/behaviorpack/biome',
    'Biomes',
  );
  saveTypeScriptFile(
    outputSet.behaviorPack.lootTables,
    path.join(bpFolder, 'loot_tables.ts'),
    'string',
    null,
    'LootTables',
  );
  saveTypeScriptFile(outputSet.behaviorPack.trading, path.join(bpFolder, 'trading.ts'), 'string', null, 'TradingData');
  saveTypeScriptFile(outputSet.behaviorPack.features, path.join(bpFolder, 'features.ts'), 'string', null, 'Features');

  // Save resource pack data
  saveTypeScriptFile(
    outputSet.resourcePack.animations,
    path.join(rpFolder, 'animations.ts'),
    'Animation',
    '../../types/resourcepack/animation',
    'Animations',
  );
  saveTypeScriptFile(
    outputSet.resourcePack.animationControllers,
    path.join(rpFolder, 'animation_controllers.ts'),
    'AnimationController',
    '../../types/resourcepack/animation_controller',
    'AnimationControllers',
  );
  saveTypeScriptFile(
    outputSet.resourcePack.entities,
    path.join(rpFolder, 'entities.ts'),
    'Entity',
    '../../types/resourcepack/entity',
    'Entities',
  );
  saveTypeScriptFile(
    outputSet.resourcePack.fogs,
    path.join(rpFolder, 'fogs.ts'),
    'Fog',
    '../../types/resourcepack/fog',
    'Fogs',
  );
  saveTypeScriptFile(
    outputSet.resourcePack.models,
    path.join(rpFolder, 'models.ts'),
    'Model',
    '../../types/resourcepack/model',
    'Models',
  );
  saveTypeScriptFile(
    outputSet.resourcePack.particles,
    path.join(rpFolder, 'particles.ts'),
    'Particle',
    '../../types/resourcepack/particle',
    'Particles',
  );
  saveTypeScriptFile(
    outputSet.resourcePack.renderControllers,
    path.join(rpFolder, 'render_controllers.ts'),
    'RenderController',
    '../../types/resourcepack/render_controller',
    'RenderControllers',
  );
  saveTypeScriptFile(
    outputSet.resourcePack.materials,
    path.join(rpFolder, 'materials.ts'),
    'string',
    null,
    'Materials',
  );
  saveTypeScriptFile(outputSet.resourcePack.sounds, path.join(rpFolder, 'sounds.ts'), 'string', null, 'Sounds');
  saveTypeScriptFile(
    outputSet.resourcePack.soundFiles,
    path.join(rpFolder, 'sound_files.ts'),
    'string',
    null,
    'SoundFiles',
  );
  saveTypeScriptFile(outputSet.resourcePack.textures, path.join(rpFolder, 'textures.ts'), 'string', null, 'Textures');
  saveTypeScriptFile(
    outputSet.resourcePack.textureItems,
    path.join(rpFolder, 'texture_items.ts'),
    'string',
    null,
    'TextureItems',
  );
  saveTypeScriptFile(
    outputSet.resourcePack.textureTerrain,
    path.join(rpFolder, 'texture_terrain.ts'),
    'string',
    null,
    'TextureTerrain',
  );
}

function saveGeneral(general: General, folder: string): void {
  saveTypeScriptFile(general.biomes, path.join(folder, 'biomes.ts'), 'string', null, 'Biomes');
  saveTypeScriptFile(general.cameraPresets, path.join(folder, 'camera_presets.ts'), 'string', null, 'CameraPresets');
  saveTypeScriptFile(
    general.cooldownCategory,
    path.join(folder, 'cooldown_category.ts'),
    'string',
    null,
    'CooldownCategory',
  );
  saveTypeScriptFile(general.dimensions, path.join(folder, 'dimensions.ts'), 'string', null, 'Dimensions');
  saveTypeScriptFile(general.effects, path.join(folder, 'effects.ts'), 'string', null, 'Effects');
  saveTypeScriptFile(general.enchantments, path.join(folder, 'enchantments.ts'), 'string', null, 'Enchantments');
  saveTypeScriptFile(general.features, path.join(folder, 'features.ts'), 'string', null, 'Features');
  saveTypeScriptFile(general.potionEffects, path.join(folder, 'potion_effects.ts'), 'string', null, 'PotionEffects');
  saveTypeScriptFile(
    general.potionModifiers,
    path.join(folder, 'potion_modifiers.ts'),
    'string',
    null,
    'PotionModifiers',
  );
  saveTypeScriptFile(general.potionTypes, path.join(folder, 'potion_types.ts'), 'string', null, 'PotionTypes');

  createGeneralIndexFile(folder);
}

function createGeneralIndexFile(folder: string): void {
  const lines: string[] = [];
  lines.push('/** Notice: Auto generated file, do not edit */\n');
  lines.push("export * from './biomes';");
  lines.push("export * from './camera_presets';");
  lines.push("export * from './cooldown_category';");
  lines.push("export * from './dimensions';");
  lines.push("export * from './effects';");
  lines.push("export * from './enchantments';");
  lines.push("export * from './features';");
  lines.push("export * from './potion_effects';");
  lines.push("export * from './potion_modifiers';");
  lines.push("export * from './potion_types';");

  fs.writeFileSync(path.join(folder, 'index.ts'), lines.join('\n'), 'utf-8');
}

function saveTypeScriptFile<T>(
  data: T,
  filepath: string,
  typeName: string,
  typeLocation: string | null,
  variableName: string,
): void {
  const lines: string[] = [];

  lines.push('/** Notice: Auto generated file, do not edit */\n');

  if (typeLocation) {
    lines.push(`import { ${typeName} } from '${typeLocation}';\n\n`);
  }

  lines.push(`export const ${variableName}: ${typeName}[] = `);
  lines.push(JSON.stringify(data, null, 2));

  fs.writeFileSync(filepath, lines.join('\n'), 'utf-8');
}

function createIndexFile(folder: string, exports: string[]): void {
  const lines: string[] = [];
  lines.push('/** Notice: Auto generated file, do not edit */\n');

  for (const exp of exports) {
    lines.push(`export * as ${capitalize(exp)} from './${exp}';`);
  }

  fs.writeFileSync(path.join(folder, 'index.ts'), lines.join('\n'), 'utf-8');
}

function createBPIndexFile(folder: string): void {
  const lines: string[] = [];
  lines.push('/** Notice: Auto generated file, do not edit */\n');
  lines.push("export * from './blocks';");
  lines.push("export * from './entities';");
  lines.push("export * from './items';");
  lines.push("export * from './biomes';");
  lines.push("export * from './loot_tables';");
  lines.push("export * from './trading';");
  lines.push("export * from './features';");

  fs.writeFileSync(path.join(folder, 'index.ts'), lines.join('\n'), 'utf-8');
}

function createRPIndexFile(folder: string): void {
  const lines: string[] = [];
  lines.push('/** Notice: Auto generated file, do not edit */\n');
  lines.push("export * from './animations';");
  lines.push("export * from './animation_controllers';");
  lines.push("export * from './entities';");
  lines.push("export * from './fogs';");
  lines.push("export * from './models';");
  lines.push("export * from './particles';");
  lines.push("export * from './render_controllers';");
  lines.push("export * from './materials';");
  lines.push("export * from './sounds';");
  lines.push("export * from './sound_files';");
  lines.push("export * from './textures';");
  lines.push("export * from './texture_items';");
  lines.push("export * from './texture_terrain';");

  fs.writeFileSync(path.join(folder, 'index.ts'), lines.join('\n'), 'utf-8');
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
