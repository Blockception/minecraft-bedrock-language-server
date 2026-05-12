"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCreate = setupCreate;
const ide_shared_1 = require("@blockception/ide-shared");
const builder_1 = require("../../templates/builder");
const folders_1 = require("../../templates/folders");
const functions_1 = require("./functions");
const Language = __importStar(require("../../templates/language"));
const Project = __importStar(require("./project"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = require("../../../util");
function setupCreate(manager) {
    //General
    manager.add(ide_shared_1.Commands.Create.General.Languages, (context) => createAll(context, Language.create_language_files));
    manager.add(ide_shared_1.Commands.Create.General.Entity, (0, functions_1.createCommand)((context, folders) => {
        const ensured = folders.Ensure();
        return Promise.all([
            (0, functions_1.mustExecute)(ide_shared_1.Commands.Create.Behaviorpack.Entity, context, ensured.BehaviorPack()),
            (0, functions_1.mustExecute)(ide_shared_1.Commands.Create.Resourcepack.Entity, context, ensured.ResourcePack()),
        ]).then(() => { });
    }));
    manager.add(ide_shared_1.Commands.Create.General.Manifests, (0, functions_1.createCommand)((context, folders) => {
        const ensured = folders.Ensure();
        return Promise.all([
            (0, functions_1.mustExecute)(ide_shared_1.Commands.Create.Behaviorpack.Manifests, context, ensured.BehaviorPack()),
            (0, functions_1.mustExecute)(ide_shared_1.Commands.Create.Resourcepack.Manifests, context, ensured.ResourcePack()),
            (0, functions_1.mustExecute)(ide_shared_1.Commands.Create.World.Manifests, context, ensured.WorldFolder()),
        ]).then(() => { });
    }));
    //Project
    manager.add(ide_shared_1.Commands.Create.Project.WorldProject, (params) => FunctionWithID(params, Project.create_world_project));
    manager.add(ide_shared_1.Commands.Create.Project.Resourcepack, (params) => FunctionWithID(params, Project.create_resourcepack));
    manager.add(ide_shared_1.Commands.Create.Project.Behaviorpack, (params) => FunctionWithID(params, Project.create_behaviorpack));
    // Create pack folders (top-level behavior_packs / resource_packs) — return directories to create on client
    manager.add(ide_shared_1.Commands.Create.General.PackFoldersAll, (context) => {
        const ensured = (0, folders_1.getFolders)(context).Ensure();
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
        const dirs = new Set();
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
                const full = dirParts.length > 0 ? util_1.Vscode.join(bpRoot, ...dirParts) : bpRoot;
                dirs.add(full);
            }
            else if (p.startsWith('RP/')) {
                const rest = p.substring(3);
                const parts = rest.split('/');
                if (parts.length <= 1) {
                    dirs.add(rpRoot);
                    continue;
                }
                const dirParts = parts.slice(0, -1).filter((x) => x && x !== '*');
                const full = dirParts.length > 0 ? util_1.Vscode.join(rpRoot, ...dirParts) : rpRoot;
                dirs.add(full);
            }
        }
        return Array.from(dirs);
    });
    // Create regular used pack folders (subset)
    manager.add(ide_shared_1.Commands.Create.General.PackFoldersRegular, (context) => {
        const ensured = (0, folders_1.getFolders)(context).Ensure();
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
        const dirs = new Set();
        for (const p of samplePaths) {
            if (p.startsWith('BP/')) {
                const rest = p.substring(3);
                const parts = rest.split('/');
                if (parts.length <= 1) {
                    dirs.add(bpRoot);
                    continue;
                }
                const dirParts = parts.slice(0, -1).filter((x) => x && x !== '*');
                const full = dirParts.length > 0 ? util_1.Vscode.join(bpRoot, ...dirParts) : bpRoot;
                dirs.add(full);
            }
            else if (p.startsWith('RP/')) {
                const rest = p.substring(3);
                const parts = rest.split('/');
                if (parts.length <= 1) {
                    dirs.add(rpRoot);
                    continue;
                }
                const dirParts = parts.slice(0, -1).filter((x) => x && x !== '*');
                const full = dirParts.length > 0 ? util_1.Vscode.join(rpRoot, ...dirParts) : rpRoot;
                dirs.add(full);
            }
        }
        return Array.from(dirs);
    });
    // Clean empty pack folders (remove directories that are empty)
    manager.add(ide_shared_1.Commands.Create.General.PackFoldersClean, async (context) => {
        const ensured = (0, folders_1.getFolders)(context).Ensure();
        const bpRoot = ensured.BehaviorPack();
        const rpRoot = ensured.ResourcePack();
        const ignoredFiles = new Set(['.gitkeep']);
        function collectDirs(rootUri) {
            const dirs = [];
            let rootFs;
            try {
                rootFs = util_1.Fs.FromVscode(rootUri);
            }
            catch (err) {
                return dirs;
            }
            if (!fs.existsSync(rootFs))
                return dirs;
            function walk(dir) {
                let entries;
                try {
                    entries = fs.readdirSync(dir);
                }
                catch (err) {
                    return;
                }
                for (const e of entries) {
                    const full = path_1.default.join(dir, e);
                    try {
                        if (fs.lstatSync(full).isDirectory()) {
                            dirs.push(full);
                            walk(full);
                        }
                    }
                    catch (err) {
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
        const deletable = new Set();
        for (const dirFs of allDirs) {
            let entries;
            try {
                entries = fs.readdirSync(dirFs);
            }
            catch (err) {
                continue;
            }
            let hasNonDeletable = false;
            for (const e of entries) {
                if (ignoredFiles.has(e))
                    continue;
                const full = path_1.default.join(dirFs, e);
                try {
                    const st = fs.lstatSync(full);
                    if (st.isDirectory()) {
                        if (!deletable.has(full)) {
                            hasNonDeletable = true;
                            break;
                        }
                    }
                    else {
                        hasNonDeletable = true;
                        break;
                    }
                }
                catch (err) {
                    hasNonDeletable = true;
                    break;
                }
            }
            if (!hasNonDeletable) {
                deletable.add(dirFs);
            }
        }
        if (deletable.size === 0)
            return [];
        const deletedUris = [];
        const dirsToDelete = Array.from(deletable).sort((a, b) => b.length - a.length);
        for (const dirFs of dirsToDelete) {
            deletedUris.push(util_1.Vscode.fromFs(dirFs));
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
async function FunctionWithID(context, callback) {
    const folders = (0, folders_1.getFolders)(context);
    const ids = context.arguments;
    if (!ids)
        return;
    if (!folders)
        return;
    const builder = new builder_1.TemplateBuilder(context);
    //Last is reserved for the document
    for (let I = 0; I < ids.length - 1; I++) {
        callback(context, ids[I], folders, builder);
    }
    return builder.send();
}
function createAll(context, callback) {
    const builder = new builder_1.TemplateBuilder(context);
    const pd = context.database.ProjectData;
    pd.behaviorPacks.packs.forEach((pack) => callback(pack, builder));
    pd.resourcePacks.packs.forEach((pack) => callback(pack, builder));
    pd.worlds.packs.forEach((pack) => callback(pack, builder));
    return builder.send();
}
//# sourceMappingURL=templates-specalized.js.map