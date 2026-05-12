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
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideJsonCompletion = provideJsonCompletion;
const behavior_pack_1 = require("bc-minecraft-bedrock-project/src/project/behavior-pack");
const Manifests = __importStar(require("../../general/manifests"));
const AnimationControllers = __importStar(require("./animation-controllers"));
const Animations = __importStar(require("./animations"));
const Blocks = __importStar(require("./blocks"));
const Entities = __importStar(require("./entity/main"));
const Items = __importStar(require("./items"));
const LootTables = __importStar(require("./loot-tables"));
const Trading = __importStar(require("./trading"));
function provideJsonCompletion(context) {
    switch (behavior_pack_1.FileType.detect(context.document.uri)) {
        case behavior_pack_1.FileType.animation:
            return Animations.provideJsonCompletion(context);
        case behavior_pack_1.FileType.animation_controller:
            return AnimationControllers.provideJsonCompletion(context);
        case behavior_pack_1.FileType.block:
            return Blocks.provideJsonCompletion(context);
        case behavior_pack_1.FileType.entity:
            return Entities.provideJsonCompletion(context);
        case behavior_pack_1.FileType.item:
            return Items.provideJsonCompletion(context);
        case behavior_pack_1.FileType.loot_table:
            return LootTables.provideJsonCompletion(context);
        case behavior_pack_1.FileType.manifest:
            return Manifests.provideJsonCompletion(context);
        case behavior_pack_1.FileType.trading:
            return Trading.provideCompletion(context);
        // case FileType.function:
        // case FileType.item:
        // case FileType.script:
        // case FileType.spawn_rule:
        // case FileType.structure:
        // case FileType.unknown:
        default:
            return;
    }
}
//# sourceMappingURL=main.js.map