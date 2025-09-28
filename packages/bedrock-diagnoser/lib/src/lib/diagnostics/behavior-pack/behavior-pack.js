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
exports.BehaviorPack = void 0;
const behavior_pack_1 = require("bc-minecraft-bedrock-project/lib/src/project/behavior-pack");
const AnimationController = __importStar(require("./animation-controllers/document"));
const Animation = __importStar(require("./animation/document"));
const Biome = __importStar(require("./biome/document"));
const Block = __importStar(require("./block/document"));
const Entity = __importStar(require("./entity/document"));
const FeatureRule = __importStar(require("./feature-rule/document"));
const Feature = __importStar(require("./feature/document"));
const Tick = __importStar(require("./functions/tick/document"));
const Item = __importStar(require("./item/document"));
const ItemCatalog = __importStar(require("./item-catalog/document"));
const LootTable = __importStar(require("./loot-table/document"));
const Manifest = __importStar(require("./manifest/document"));
const Mcfunction = __importStar(require("./mcfunction/document"));
const Recipe = __importStar(require("./recipe/document"));
const Script = __importStar(require("./script/document"));
const SpawnRule = __importStar(require("./spawn-rule/document"));
const Structure = __importStar(require("./structure/document"));
const Trading = __importStar(require("./trading/document"));
var BehaviorPack;
(function (BehaviorPack) {
    /**
     * Processes and diagnoses the given textdocument
     * @param doc The document to process / diagnose
     * @param diagnoser The diagnoser to report to
     * @returns `true` or `false` whenever or not it was successful*/
    function diagnose_document(diagnoser) {
        //retrieve filter doc type
        const uri = diagnoser.document.uri;
        const type = behavior_pack_1.FileType.detect(uri);
        switch (type) {
            case behavior_pack_1.FileType.animation:
                Animation.diagnose_animation_document(diagnoser);
                break;
            case behavior_pack_1.FileType.animation_controller:
                AnimationController.diagnose_animation_controller_document(diagnoser);
                break;
            case behavior_pack_1.FileType.block:
                Block.diagnose_block_document(diagnoser);
                break;
            case behavior_pack_1.FileType.entity:
                Entity.diagnose_entity_document(diagnoser);
                break;
            case behavior_pack_1.FileType.function:
                if (uri.endsWith("tick.json")) {
                    Tick.diagnose_tick_document(diagnoser);
                }
                else {
                    Mcfunction.diagnose_mcfunction_document(diagnoser);
                }
                break;
            case behavior_pack_1.FileType.item:
                Item.diagnose_item_document(diagnoser);
                break;
            case behavior_pack_1.FileType.loot_table:
                LootTable.diagnose_loot_table_document(diagnoser);
                break;
            case behavior_pack_1.FileType.manifest:
                Manifest.diagnose_manifest(diagnoser);
                break;
            case behavior_pack_1.FileType.script:
                Script.diagnose_script_document(diagnoser);
                break;
            case behavior_pack_1.FileType.spawn_rule:
                SpawnRule.diagnose_spawn_rule_document(diagnoser);
                break;
            case behavior_pack_1.FileType.structure:
                Structure.diagnose_structure_document(diagnoser);
                break;
            case behavior_pack_1.FileType.trading:
                Trading.diagnose_trading_document(diagnoser);
                break;
            case behavior_pack_1.FileType.feature:
                Feature.diagnose_feature_document(diagnoser);
                break;
            case behavior_pack_1.FileType.feature_rule:
                FeatureRule.diagnose_feature_rules_document(diagnoser);
                break;
            case behavior_pack_1.FileType.item_catalog:
                ItemCatalog.diagnose_item_catalog_document(diagnoser);
                break;
            case behavior_pack_1.FileType.recipe:
                Recipe.diagnose_recipe_document(diagnoser);
                break;
            case behavior_pack_1.FileType.biome:
                Biome.diagnose_biome_document(diagnoser);
                break;
            default:
            case behavior_pack_1.FileType.unknown:
                return false;
        }
        return true;
    }
    BehaviorPack.diagnose_document = diagnose_document;
})(BehaviorPack || (exports.BehaviorPack = BehaviorPack = {}));
//# sourceMappingURL=behavior-pack.js.map