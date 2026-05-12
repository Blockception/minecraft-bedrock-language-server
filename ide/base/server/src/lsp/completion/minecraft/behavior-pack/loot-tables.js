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
exports.provideCompletion = provideCompletion;
exports.provideShortCompletion = provideShortCompletion;
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const constants_1 = require("../../../../constants");
const attributes_1 = require("../../../../project/attributes");
const context_1 = require("../../context");
const utils_1 = require("../utils");
const Items = __importStar(require("./items"));
function provideJsonCompletion(context) {
    const property = context_1.JsonCompletionContext.getProperty(context);
    if (property === undefined)
        return;
    switch (property) {
        case 'name':
            return Items.provideCompletion(context);
    }
}
function provideCompletion(context) {
    generate_items(context);
}
function provideShortCompletion(context) {
    const ncontext = {
        ...context,
        builder: context.builder.withEvents((item) => (item.insertText = short_id(item.label))),
    };
    generate_items(ncontext);
}
function generate_items(context) {
    const builder = context.builder.withDefaults({ kind: constants_1.Kinds.Completion.LootTable });
    const generateDoc = (0, utils_1.createDefinitionDocGenerator)('The defined loot table', 'The loot table definition');
    const generatesDoc = (item) => `The vanilla loot table definition: ${item}`;
    const data = context.document.configuration();
    // Add loot tables from .mcdefinitions
    builder.generate(data.definitions.loot_table?.defined, generateDoc);
    builder.generate(context.database.ProjectData.behaviorPacks.lootTables, generateDoc);
    builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.BehaviorPack.lootTables, generatesDoc);
    //Education data
    if ((0, attributes_1.IsEducationEnabled)(context.document))
        builder.generate(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.BehaviorPack.lootTables, generatesDoc);
}
function short_id(id) {
    if (id.startsWith('loot_tables/')) {
        id = id.slice(12);
    }
    if (id.endsWith('.json')) {
        id = id.slice(0, -5);
    }
    if (id.includes('/') || id.includes('\\')) {
        id = '"' + id + '"';
    }
    return id;
}
//# sourceMappingURL=loot-tables.js.map