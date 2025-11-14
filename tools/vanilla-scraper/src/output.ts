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
  output.vanilla.behaviorPack.blocks = uniqueById(output.vanilla.behaviorPack.blocks);
  output.vanilla.behaviorPack.entities = uniqueById(output.vanilla.behaviorPack.entities);
  output.vanilla.behaviorPack.items = uniqueById(output.vanilla.behaviorPack.items);
  output.vanilla.behaviorPack.biomes = uniqueById(output.vanilla.behaviorPack.biomes);
  output.vanilla.behaviorPack.lootTables = uniqueById(output.vanilla.behaviorPack.lootTables);
  output.vanilla.behaviorPack.trading = uniqueById(output.vanilla.behaviorPack.trading);

  output.vanilla.resourcePack.animations = uniqueById(output.vanilla.resourcePack.animations);
  output.vanilla.resourcePack.animationControllers = uniqueById(output.vanilla.resourcePack.animationControllers);
  output.vanilla.resourcePack.entities = uniqueById(output.vanilla.resourcePack.entities);
  output.vanilla.resourcePack.fogs = uniqueById(output.vanilla.resourcePack.fogs);
  output.vanilla.resourcePack.models = uniqueById(output.vanilla.resourcePack.models);
  output.vanilla.resourcePack.particles = uniqueById(output.vanilla.resourcePack.particles);
  output.vanilla.resourcePack.renderControllers = uniqueById(output.vanilla.resourcePack.renderControllers);
  output.vanilla.resourcePack.materials = uniqueById(output.vanilla.resourcePack.materials);
  output.vanilla.resourcePack.sounds = uniqueById(output.vanilla.resourcePack.sounds);
  output.vanilla.resourcePack.textures = uniqueById(output.vanilla.resourcePack.textures);
  output.vanilla.resourcePack.textureItems = uniqueById(output.vanilla.resourcePack.textureItems);
  output.vanilla.resourcePack.textureTerrain = uniqueById(output.vanilla.resourcePack.textureTerrain);

  // Clean string arrays
  output.vanilla.behaviorPack.features = uniqueStrings(output.vanilla.behaviorPack.features);
  output.vanilla.resourcePack.soundFiles = uniqueStrings(output.vanilla.resourcePack.soundFiles);

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

  // Do the same for edu
  output.edu.behaviorPack.blocks = uniqueById(output.edu.behaviorPack.blocks);
  output.edu.behaviorPack.entities = uniqueById(output.edu.behaviorPack.entities);
  output.edu.behaviorPack.items = uniqueById(output.edu.behaviorPack.items);
  output.edu.behaviorPack.biomes = uniqueById(output.edu.behaviorPack.biomes);
  output.edu.behaviorPack.lootTables = uniqueById(output.edu.behaviorPack.lootTables);
  output.edu.behaviorPack.trading = uniqueById(output.edu.behaviorPack.trading);
  output.edu.behaviorPack.features = uniqueStrings(output.edu.behaviorPack.features);

  output.edu.resourcePack.animations = uniqueById(output.edu.resourcePack.animations);
  output.edu.resourcePack.animationControllers = uniqueById(output.edu.resourcePack.animationControllers);
  output.edu.resourcePack.entities = uniqueById(output.edu.resourcePack.entities);
  output.edu.resourcePack.fogs = uniqueById(output.edu.resourcePack.fogs);
  output.edu.resourcePack.models = uniqueById(output.edu.resourcePack.models);
  output.edu.resourcePack.particles = uniqueById(output.edu.resourcePack.particles);
  output.edu.resourcePack.renderControllers = uniqueById(output.edu.resourcePack.renderControllers);
  output.edu.resourcePack.materials = uniqueById(output.edu.resourcePack.materials);
  output.edu.resourcePack.sounds = uniqueById(output.edu.resourcePack.sounds);
  output.edu.resourcePack.textures = uniqueById(output.edu.resourcePack.textures);
  output.edu.resourcePack.textureItems = uniqueById(output.edu.resourcePack.textureItems);
  output.edu.resourcePack.textureTerrain = uniqueById(output.edu.resourcePack.textureTerrain);
  output.edu.resourcePack.soundFiles = uniqueStrings(output.edu.resourcePack.soundFiles);
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
  const vanillaFolder = path.join(outputFolder, 'Vanilla');
  const eduFolder = path.join(outputFolder, 'Edu');
  const generalFolder = path.join(outputFolder, 'General');

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

  // Save behavior pack data
  saveTypeScriptFile(
    outputSet.behaviorPack.blocks,
    path.join(bpFolder, 'blocks.ts'),
    'Block',
    '../../types/behaviorpack/block',
    'Blocks'
  );
  saveTypeScriptFile(
    outputSet.behaviorPack.entities,
    path.join(bpFolder, 'entities.ts'),
    'Entity',
    '../../types/behaviorpack/entity',
    'Entities'
  );
  saveTypeScriptFile(
    outputSet.behaviorPack.items,
    path.join(bpFolder, 'items.ts'),
    'Item',
    '../../types/behaviorpack/item',
    'Items'
  );
  saveTypeScriptFile(
    outputSet.behaviorPack.biomes,
    path.join(bpFolder, 'biomes.ts'),
    'Biome',
    '../../types/behaviorpack/biome',
    'Biomes'
  );
  saveTypeScriptFile(
    outputSet.behaviorPack.lootTables,
    path.join(bpFolder, 'loot_tables.ts'),
    'LootTable',
    '../../types/behaviorpack/loot_table',
    'LootTables'
  );
  saveTypeScriptFile(
    outputSet.behaviorPack.trading,
    path.join(bpFolder, 'trading.ts'),
    'Trading',
    '../../types/behaviorpack/trading',
    'Trading'
  );
  saveTypeScriptFile(
    outputSet.behaviorPack.features,
    path.join(bpFolder, 'features.ts'),
    'string',
    null,
    'Features'
  );

  // Save resource pack data
  saveTypeScriptFile(
    outputSet.resourcePack.animations,
    path.join(rpFolder, 'animations.ts'),
    'Animation',
    '../../types/resourcepack/animation',
    'Animations'
  );
  saveTypeScriptFile(
    outputSet.resourcePack.animationControllers,
    path.join(rpFolder, 'animation_controllers.ts'),
    'AnimationController',
    '../../types/resourcepack/animation_controller',
    'AnimationControllers'
  );
  saveTypeScriptFile(
    outputSet.resourcePack.entities,
    path.join(rpFolder, 'entities.ts'),
    'Entity',
    '../../types/resourcepack/entity',
    'Entities'
  );
  saveTypeScriptFile(
    outputSet.resourcePack.fogs,
    path.join(rpFolder, 'fogs.ts'),
    'Fog',
    '../../types/resourcepack/fog',
    'Fogs'
  );
  saveTypeScriptFile(
    outputSet.resourcePack.models,
    path.join(rpFolder, 'models.ts'),
    'Model',
    '../../types/resourcepack/model',
    'Models'
  );
  saveTypeScriptFile(
    outputSet.resourcePack.particles,
    path.join(rpFolder, 'particles.ts'),
    'Particle',
    '../../types/resourcepack/particle',
    'Particles'
  );
  saveTypeScriptFile(
    outputSet.resourcePack.renderControllers,
    path.join(rpFolder, 'render_controllers.ts'),
    'RenderController',
    '../../types/resourcepack/render_controller',
    'RenderControllers'
  );
  saveTypeScriptFile(
    outputSet.resourcePack.materials,
    path.join(rpFolder, 'materials.ts'),
    'Material',
    '../../types/resourcepack/material',
    'Materials'
  );
  saveTypeScriptFile(
    outputSet.resourcePack.sounds,
    path.join(rpFolder, 'sounds.ts'),
    'Sound',
    '../../types/resourcepack/sound',
    'Sounds'
  );
  saveTypeScriptFile(
    outputSet.resourcePack.soundFiles,
    path.join(rpFolder, 'sound_files.ts'),
    'string',
    null,
    'SoundFiles'
  );
  saveTypeScriptFile(
    outputSet.resourcePack.textures,
    path.join(rpFolder, 'textures.ts'),
    'Texture',
    '../../types/resourcepack/texture',
    'Textures'
  );
  saveTypeScriptFile(
    outputSet.resourcePack.textureItems,
    path.join(rpFolder, 'texture_items.ts'),
    'TextureAtlas',
    '../../types/resourcepack/texture_atlas',
    'TextureItems'
  );
  saveTypeScriptFile(
    outputSet.resourcePack.textureTerrain,
    path.join(rpFolder, 'texture_terrain.ts'),
    'TextureAtlas',
    '../../types/resourcepack/texture_atlas',
    'TextureTerrain'
  );
}

function saveGeneral(general: General, folder: string): void {
  saveTypeScriptFile(general.biomes, path.join(folder, 'biomes.ts'), 'string', null, 'Biomes');
  saveTypeScriptFile(general.cameraPresets, path.join(folder, 'camera_presets.ts'), 'string', null, 'CameraPresets');
  saveTypeScriptFile(general.cooldownCategory, path.join(folder, 'cooldown_category.ts'), 'string', null, 'CooldownCategory');
  saveTypeScriptFile(general.dimensions, path.join(folder, 'dimensions.ts'), 'string', null, 'Dimensions');
  saveTypeScriptFile(general.effects, path.join(folder, 'effects.ts'), 'string', null, 'Effects');
  saveTypeScriptFile(general.enchantments, path.join(folder, 'enchantments.ts'), 'string', null, 'Enchantments');
  saveTypeScriptFile(general.features, path.join(folder, 'features.ts'), 'string', null, 'Features');
  saveTypeScriptFile(general.potionEffects, path.join(folder, 'potion_effects.ts'), 'string', null, 'PotionEffects');
  saveTypeScriptFile(general.potionModifiers, path.join(folder, 'potion_modifiers.ts'), 'string', null, 'PotionModifiers');
  saveTypeScriptFile(general.potionTypes, path.join(folder, 'potion_types.ts'), 'string', null, 'PotionTypes');
}

function saveTypeScriptFile<T>(
  data: T,
  filepath: string,
  typeName: string,
  typeLocation: string | null,
  variableName: string
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
