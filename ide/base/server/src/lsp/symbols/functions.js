"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertResourcePack = convertResourcePack;
exports.convertBehaviorPacks = convertBehaviorPacks;
const util_1 = require("../../util");
const constants_1 = require("../../constants");
function convertResourcePack(pack, builder) {
    const folder = util_1.Fs.FromVscode(pack.folder);
    builder.containerName = (0, util_1.getDirectory)(folder);
    builder.generate(pack.animations, constants_1.Kinds.Symbol.Animation);
    builder.generate(pack.animationControllers, constants_1.Kinds.Symbol.AnimationControllers);
    builder.generate(pack.attachables, constants_1.Kinds.Symbol.Item);
    builder.generate(pack.blockCullingRules, constants_1.Kinds.Symbol.BlockCulling);
    builder.generate(pack.entities, constants_1.Kinds.Symbol.Entity);
    builder.generate(pack.fogs, constants_1.Kinds.Symbol.Fogs);
    builder.generate(pack.materials, constants_1.Kinds.Symbol.Materials);
    builder.generate(pack.models, constants_1.Kinds.Symbol.Models);
    builder.generate(pack.particles, constants_1.Kinds.Symbol.Particle);
    builder.generate(pack.renderControllers, constants_1.Kinds.Symbol.RenderController);
    builder.generate(pack.sounds, constants_1.Kinds.Symbol.Sound);
    builder.generate(pack.textures, constants_1.Kinds.Symbol.Texture);
}
function convertBehaviorPacks(pack, builder) {
    const folder = util_1.Fs.FromVscode(pack.folder);
    builder.containerName = (0, util_1.getDirectory)(folder);
    builder.generate(pack.animations, constants_1.Kinds.Symbol.Animation);
    builder.generate(pack.animationControllers, constants_1.Kinds.Symbol.AnimationControllers);
    builder.generate(pack.blocks, constants_1.Kinds.Symbol.Block);
    builder.generate(pack.entities, constants_1.Kinds.Symbol.Entity);
    builder.generate(pack.items, constants_1.Kinds.Symbol.Item);
    builder.generate(pack.lootTables, constants_1.Kinds.Symbol.LootTable);
    builder.generate(pack.structures, constants_1.Kinds.Symbol.Structure);
    builder.generate(pack.trading, constants_1.Kinds.Symbol.Trading);
}
//# sourceMappingURL=functions.js.map