"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const bc_minecraft_molang_1 = require("bc-minecraft-molang");
const vscode_languageserver_1 = require("vscode-languageserver");
const constants_1 = require("../../../../constants");
const commands_1 = require("../../../../minecraft/commands");
const attributes_1 = require("../../../../project/attributes");
const attribute_values_1 = require("../selectors/attribute-values");
function provideCompletion(context) {
    const block = (0, commands_1.GetPossibleBlockID)(context.command, context.parameterIndex);
    const edu = (0, attributes_1.IsEducationEnabled)(context.document);
    if (!(context.current?.text.startsWith('[') ?? false)) {
        if (block) {
            let b;
            if ((b = context.database.ProjectData.behaviorPacks.blocks.get(block)))
                provideDefaultCompletion(b, context);
            if ((b = vanillaBlockToBlock(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.BehaviorPack.getBlock(block, edu))))
                provideDefaultCompletion(b, context);
        }
        context.builder.add({ label: '[]', documentation: 'Block states', kind: vscode_languageserver_1.CompletionItemKind.Snippet });
        return;
    }
    if (block) {
        provideBlockCompletion(context.database.ProjectData.behaviorPacks.blocks.get(block), context);
        return provideBlockCompletion(vanillaBlockToBlock(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.BehaviorPack.getBlock(block, edu)), context);
    }
    //return all
    context.database.ProjectData.behaviorPacks.blocks.forEach((block) => provideStateCompletion(block.states, context));
    provideStateCompletion(bc_minecraft_bedrock_vanilla_data_1.MinecraftData.General.Blocks.block_states, context);
}
function provideDefaultCompletion(b, context) {
    const pars = b.states.map((state) => `"${state.name}"=${stateValue(state, state.values[0])}`);
    context.builder.add({
        label: `[${pars.join(',')}]`,
        documentation: `Default blockstates for: ${b.id}`,
        kind: constants_1.Kinds.Completion.Block,
    });
}
function provideBlockCompletion(b, context) {
    if (!b)
        return;
    provideStateCompletion(b.states, context);
}
function provideStateCompletion(states, context) {
    const inValue = context.current ? (0, attribute_values_1.IsEditingValue)(context.current, context.cursor) : false;
    if (inValue) {
        const stateName = GetCurrentStateName(context.current, context.cursor);
        const state = states.find((s) => s.name === stateName);
        if (state) {
            const values = state.values.map((value) => String(stateValue(state, value)));
            context.builder.generate(values, () => `value for block state ${stateName}`, vscode_languageserver_1.CompletionItemKind.Value);
        }
        return;
    }
    // Output all state
    for (const state of states) {
        const name = `"${state.name}"`;
        const values = state.values.map((value) => stateValue(state, value));
        const items = values.map((value) => `${name}=${value}`);
        context.builder.generate(items, (item) => `block state ${item}`, vscode_languageserver_1.CompletionItemKind.Property);
    }
}
function GetCurrentStateName(current, pos) {
    let startIndex = pos - current.offset;
    while (startIndex > 1) {
        const character = current.text.charAt(startIndex);
        if (character === ',' || character === '[') {
            break;
        }
        startIndex--;
    }
    startIndex++;
    let endIndex = current.text.indexOf('=', startIndex);
    if (endIndex < 0)
        endIndex = current.text.length;
    const name = current.text.slice(startIndex, endIndex).trim();
    // Remove quotes if present
    if (name.startsWith('"') && name.endsWith('"')) {
        return name.slice(1, name.length - 1);
    }
    return name;
}
function vanillaBlockToBlock(block) {
    if (!block)
        return undefined;
    const states = [];
    for (const prop of block.properties) {
        const state = bc_minecraft_bedrock_vanilla_data_1.MinecraftData.BehaviorPack.getBlockState(prop);
        if (state) {
            states.push(state);
        }
    }
    return {
        id: block.id,
        location: bc_minecraft_bedrock_shared_1.Location.empty(),
        molang: new bc_minecraft_molang_1.MolangSet(),
        states: states,
    };
}
function stateValue(state, value) {
    if (state.type === 'string')
        return `"${value}"`;
    return value;
}
//# sourceMappingURL=block-states.js.map