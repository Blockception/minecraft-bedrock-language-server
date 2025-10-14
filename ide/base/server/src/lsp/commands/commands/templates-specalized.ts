import { Commands } from '@blockception/ide-shared';
import { Pack } from 'bc-minecraft-bedrock-project';
import { Context } from '../../context/context';
import { IExtensionContext } from '../../extension';
import { TemplateBuilder } from '../../templates/builder';
import { EnsureFolders, Folders, getFolders } from '../../templates/folders';
import { CommandContext } from '../context';
import { CommandManager } from '../manager';
import { createCommand, mustExecute } from './functions';

import * as Language from '../../templates/language';
import * as Project from './project';
import * as fs from 'fs';
import path from 'path';
import { Vscode, Fs } from '../../../util';

export function setupCreate(manager: CommandManager) {
  //General
  manager.add(Commands.Create.General.Languages, (context) => createAll(context, Language.create_language_files));
  manager.add(
    Commands.Create.General.Entity,
    createCommand((context: Context<CommandContext>, folders: EnsureFolders) => {
      const ensured = folders.Ensure();

      return Promise.all([
        mustExecute(Commands.Create.Behaviorpack.Entity, context, ensured.BehaviorPack()),
        mustExecute(Commands.Create.Resourcepack.Entity, context, ensured.ResourcePack()),
      ]).then(() => {});
    }),
  );
  manager.add(
    Commands.Create.General.Manifests,
    createCommand((context: Context<CommandContext>, folders: EnsureFolders) => {
      const ensured = folders.Ensure();

      return Promise.all([
        mustExecute(Commands.Create.Behaviorpack.Manifests, context, ensured.BehaviorPack()),
        mustExecute(Commands.Create.Resourcepack.Manifests, context, ensured.ResourcePack()),
        mustExecute(Commands.Create.World.Manifests, context, ensured.WorldFolder()),
      ]).then(() => {});
    }),
  );

  //Project
  manager.add(Commands.Create.Project.WorldProject, (params) => FunctionWithID(params, Project.create_world_project));
  manager.add(Commands.Create.Project.Resourcepack, (params) => FunctionWithID(params, Project.create_resourcepack));
  manager.add(Commands.Create.Project.Behaviorpack, (params) => FunctionWithID(params, Project.create_behaviorpack));

  // Create pack folders (top-level behavior_packs / resource_packs) — return directories to create on client
  manager.add(Commands.Create.General.PackFoldersAll, (context) => {
    const ensured = getFolders(context).Ensure();
    const bpRoot = ensured.BehaviorPack();
    const rpRoot = ensured.ResourcePack();

    // list of sample paths where the first segment indicates BP or RP
    const samplePaths = [
      'BP/aim_assist/presets/example.json',
      'BP/animation_controllers/example.ac.json',
      'BP/animations/example.animations.json',
      'BP/biomes/example.biome.json',
      'BP/blocks/example.block.json',
      'BP/cameras/presets/example.json',
      'BP/dialogue/example.dialogue.json',
      'BP/entities/example.se.json',
      'BP/feature_rules/example.json',
      'BP/features/example.json',
      'BP/functions/example.mcfunction',
      'BP/functions/tick.json',
      'BP/item_catalog/crafting_item_catalog.json',
      'BP/items/example.item.json',
      'BP/loot_tables/example.loot.json',
      'BP/recipes/example.recipe.json',
      'BP/scripts/example.js',
      'BP/spawn_rules/example.spawn.json',
      'BP/structures/<namespace>/example.mcstructure',
      'BP/texts/languages.json',
      'BP/texts/*.lang',
      'BP/trading/example.json',
      'BP/trading/economy_trades/example.json',
      'BP/worldgen/processors/example.json',
      'BP/worldgen/structure_sets/example.json',
      'BP/worldgen/structures/example.json',
      'BP/worldgen/template_pools/example.json',
      'BP/manifest.json',
      'BP/pack_icon.png',
      'RP/animation_controllers/example.ac.json',
      'RP/animations/example.animations.json',
      'RP/atmospherics/example_atmospherics.json',
      'RP/attachables/example.attachable.json',
      'RP/biomes/example.client_biome.json',
      'RP/block_culling/example.json',
      'RP/color_grading/example_color_grading.json',
      'RP/entity/example.ce.json',
      'RP/fogs/example_fog_setting.json',
      'RP/font/emoticons.json',
      'RP/lighting/example_lighting.json',
      'RP/materials/example.material',
      'RP/models/blocks/example.geo.json',
      'RP/models/entity/example.geo.json',
      'RP/particles/example.particle.json',
      'RP/pbr/global.json',
      'RP/render_controllers/example.rc.json',
      'RP/shadows/global.json',
      'RP/sounds/example.fsb',
      'RP/sounds/sound_definitions.json',
      'RP/texts/languages.json',
      'RP/textures/blocks/example.png',
      'RP/textures/entity/example.png',
      'RP/textures/environment/overworld_cubemap/cubemap_0.png',
      'RP/textures/items/example.png',
      'RP/textures/particle/example.png',
      'RP/textures/flipbook_textures.json',
      'RP/ui/_global_variables.json',
    ];

    const dirs = new Set<string>();

    for (const p of samplePaths) {
      if (p.startsWith('BP/')) {
        const rest = p.substring(3); // after 'BP/'
        const parts = rest.split('/');
        // if only filename, create the bpRoot itself
        if (parts.length <= 1) {
          dirs.add(bpRoot);
          continue;
        }

        const dirParts = parts.slice(0, -1).filter((x) => x && x !== '*');
        const full = dirParts.length > 0 ? Vscode.join(bpRoot, ...dirParts) : bpRoot;
        dirs.add(full);
      } else if (p.startsWith('RP/')) {
        const rest = p.substring(3);
        const parts = rest.split('/');
        if (parts.length <= 1) {
          dirs.add(rpRoot);
          continue;
        }
        const dirParts = parts.slice(0, -1).filter((x) => x && x !== '*');
        const full = dirParts.length > 0 ? Vscode.join(rpRoot, ...dirParts) : rpRoot;
        dirs.add(full);
      }
    }

    return Array.from(dirs);
  });

  // Create regular used pack folders (subset)
  manager.add(Commands.Create.General.PackFoldersRegular, (context) => {
    const ensured = getFolders(context).Ensure();
    const bpRoot = ensured.BehaviorPack();
    const rpRoot = ensured.ResourcePack();

    const samplePaths = [
      'BP/animation_controllers/example.ac.json',
      'BP/animations/example.animations.json',
      'BP/blocks/example.block.json',
      'BP/dialogue/example.dialogue.json',
      'BP/entities/example.se.json',
      'BP/feature_rules/example.json',
      'BP/features/example.json',
      'BP/functions/tick.json',
      'BP/item_catalog/crafting_item_catalog.json',
      'BP/items/example.item.json',
      'BP/loot_tables/example.loot.json',
      'BP/recipes/example.recipe.json',
      'BP/scripts/example.js',
      'BP/spawn_rules/example.spawn.json',
      'BP/structures/<namespace>/example.mcstructure',
      'BP/texts/languages.json',
      'BP/texts/*.lang',
      'BP/manifest.json',
      'BP/pack_icon.png',
      'RP/animation_controllers/example.ac.json',
      'RP/animations/example.animations.json',
      'RP/attachables/example.attachable.json',
      'RP/entity/example.ce.json',
      'RP/models/blocks/example.geo.json',
      'RP/models/entity/example.geo.json',
      'RP/particles/example.particle.json',
      'RP/render_controllers/example.rc.json',
      'RP/sounds/example.fsb',
      'RP/texts/languages.json',
      'RP/textures/flipbook_textures.json',
    ];

    const dirs = new Set<string>();

    for (const p of samplePaths) {
      if (p.startsWith('BP/')) {
        const rest = p.substring(3);
        const parts = rest.split('/');
        if (parts.length <= 1) {
          dirs.add(bpRoot);
          continue;
        }
        const dirParts = parts.slice(0, -1).filter((x) => x && x !== '*');
        const full = dirParts.length > 0 ? Vscode.join(bpRoot, ...dirParts) : bpRoot;
        dirs.add(full);
      } else if (p.startsWith('RP/')) {
        const rest = p.substring(3);
        const parts = rest.split('/');
        if (parts.length <= 1) {
          dirs.add(rpRoot);
          continue;
        }
        const dirParts = parts.slice(0, -1).filter((x) => x && x !== '*');
        const full = dirParts.length > 0 ? Vscode.join(rpRoot, ...dirParts) : rpRoot;
        dirs.add(full);
      }
    }

    return Array.from(dirs);
  });

  // Clean empty pack folders (remove directories that are empty)
  manager.add(Commands.Create.General.PackFoldersClean, async (context) => {
    const ensured = getFolders(context).Ensure();
    const bpRoot = ensured.BehaviorPack();
    const rpRoot = ensured.ResourcePack();

    const ignoredFiles = new Set(['.gitkeep']);

    function collectDirs(rootUri: string): string[] {
      const dirs: string[] = [];
      let rootFs: string;
      try {
        rootFs = Fs.FromVscode(rootUri);
      } catch (err) {
        return dirs;
      }

      if (!fs.existsSync(rootFs)) return dirs;

      function walk(dir: string) {
        let entries: string[] = [];
        try {
          entries = fs.readdirSync(dir);
        } catch (err) {
          return;
        }

        for (const e of entries) {
          const full = path.join(dir, e);
          try {
            if (fs.lstatSync(full).isDirectory()) {
              dirs.push(full);
              walk(full);
            }
          } catch (err) {
            context.logger.debug('error while reading dir entry', full, err);
          }
        }
      }

      dirs.push(rootFs);
      walk(rootFs);

      return dirs;
    }

    const bpDirs = collectDirs(bpRoot);
    const rpDirs = collectDirs(rpRoot);

    const allDirs = [...bpDirs, ...rpDirs];

    // sort descending so children processed before parents
    allDirs.sort((a, b) => b.length - a.length);

    const deletable = new Set<string>();

    for (const dirFs of allDirs) {
      let entries: string[] = [];
      try {
        entries = fs.readdirSync(dirFs);
      } catch (err) {
        continue;
      }

      let hasNonDeletable = false;

      for (const e of entries) {
        if (ignoredFiles.has(e)) continue;

        const full = path.join(dirFs, e);
        try {
          const st = fs.lstatSync(full);
          if (st.isDirectory()) {
            if (!deletable.has(full)) {
              hasNonDeletable = true;
              break;
            }
          } else {
            hasNonDeletable = true;
            break;
          }
        } catch (err) {
          hasNonDeletable = true;
          break;
        }
      }

      if (!hasNonDeletable) {
        deletable.add(dirFs);
      }
    }

    if (deletable.size === 0) return [];

    const deletedUris: string[] = [];
    const dirsToDelete = Array.from(deletable).sort((a, b) => b.length - a.length);

    for (const dirFs of dirsToDelete) {
      deletedUris.push(Vscode.fromFs(dirFs));
    }

    context.logger.info('Identified empty directories for deletion', deletedUris);
    // Do not perform deletion server-side; return candidates to client for deletion via workspace.fs
    return deletedUris;
  });
}

/**
 *
 * @param context
 * @param callback
 */
async function FunctionWithID(
  context: Context<CommandContext>,
  callback: (context: Context<CommandContext>, id: string, folders: Folders, builder: TemplateBuilder) => void,
): Promise<void> {
  const folders = getFolders(context);
  const ids = context.arguments;
  if (!ids) return;
  if (!folders) return;

  const builder = new TemplateBuilder(context);

  //Last is reserved for the document
  for (let I = 0; I < ids.length - 1; I++) {
    callback(context, ids[I], folders, builder);
  }

  return builder.send();
}

function createAll(
  context: IExtensionContext,
  callback: (Folder: Pack, Builder: TemplateBuilder) => void,
): Promise<void> {
  const builder = new TemplateBuilder(context);
  const pd = context.database.ProjectData;

  pd.behaviorPacks.packs.forEach((pack) => callback(pack, builder));
  pd.resourcePacks.packs.forEach((pack) => callback(pack, builder));
  pd.worlds.packs.forEach((pack) => callback(pack, builder));

  return builder.send();
}
