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
exports.provideCompletion = provideCompletion;
exports.provideJsonCompletion = provideJsonCompletion;
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const constants_1 = require("../../../../../constants");
const attributes_1 = require("../../../../../project/attributes");
const json_path_1 = require("../../../builder/json-path");
const utils_1 = require("../../utils");
const Sounds = __importStar(require("../../resource-pack/sounds"));
const AnimationControllers = __importStar(require("../animation-controllers"));
const Animations = __importStar(require("../animations"));
const Blocks = __importStar(require("../blocks"));
const Families = __importStar(require("../families"));
const Item = __importStar(require("../items"));
const LootTables = __importStar(require("../loot-tables"));
const Trading = __importStar(require("../trading"));
const EntityComponentGroups = __importStar(require("./component-groups"));
const EntityEvents = __importStar(require("./event"));
function provideCompletion(context) {
    const generateDoc = (0, utils_1.createDefinitionDocGenerator)('The defined entity', 'The entity definition');
    const builder = context.builder.withDefaults({ kind: constants_1.Kinds.Completion.Entity });
    const data = context.document.configuration();
    // Add entities from .mcdefinitions
    builder.generate(data.definitions.entity?.defined, generateDoc);
    builder.generate(context.database.ProjectData.behaviorPacks.entities, generateDoc);
    builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.BehaviorPack.entities, generateDoc);
    //Education data
    if ((0, attributes_1.IsEducationEnabled)(context.document)) {
        builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.BehaviorPack.entities, generateDoc);
    }
}
function provideJsonCompletion(context) {
    return entityJsonCompletion.onCompletion(context);
}
const entityJsonCompletion = new json_path_1.JsonPathCompletion({
    match: /throw_sound|hit_sound|spawn_sound$/,
    onCompletion: Sounds.provideCompletion,
}, {
    match: 'minecraft:ambient_sound_interval/event_name',
    onCompletion: Sounds.provideCompletion,
}, {
    match: 'event',
    onCompletion: EntityEvents.provideCompletion,
}, {
    match: 'block/name',
    onCompletion: Blocks.provideCompletion,
}, {
    match: 'minecraft:loot/table',
    onCompletion: LootTables.provideCompletion,
}, {
    match: 'minecraft:trade_table/table',
    onCompletion: Trading.provideCompletion,
}, {
    match: /item|items|feed_items|spawn_item$/,
    onCompletion: Item.provideCompletion,
}, {
    match: 'family',
    onCompletion: Families.provideCompletion,
}, {
    match: (path) => path.includes('minecraft:entity/description/animations/'),
    onCompletion: (c) => {
        Animations.provideCompletion(c);
        AnimationControllers.provideCompletion(c);
    },
}, {
    match: /\/component_groups\/(\d+)$/,
    onCompletion: EntityComponentGroups.provideCompletion,
}, {
    match: /breeds_with\/(mate_type|baby_type)$/,
    onCompletion: provideCompletion,
});
//# sourceMappingURL=main.js.map