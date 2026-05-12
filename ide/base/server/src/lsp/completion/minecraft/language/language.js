"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
exports.generate_bp = generate_bp;
exports.generate_rp = generate_rp;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const vscode_languageserver_1 = require("vscode-languageserver");
function provideCompletion(context) {
    const builder = context.builder.withDefaults({ kind: vscode_languageserver_1.CompletionItemKind.Color });
    const cursor = context.position.character;
    //key or comment
    if (context.settings.Completion.Lang.Comments) {
        builder.add({ label: '###', documentation: 'comment', kind: vscode_languageserver_1.CompletionItemKind.Snippet });
        builder.add({
            label: '###region',
            documentation: 'Region',
            kind: vscode_languageserver_1.CompletionItemKind.Snippet,
            insertText: '###region example\n\n###endregion',
        });
    }
    const line = context.document.getLine(context.position.line);
    //in comment
    if (isIn('#', cursor, line)) {
        return;
    }
    if (isIn('=', cursor, line)) {
        return addColors(builder);
    }
    if (cursor > 3) {
        builder.add({ label: '=', documentation: 'Start of the value', kind: vscode_languageserver_1.CompletionItemKind.Snippet });
    }
    const pack = context.document.pack();
    if (!pack)
        return;
    const check_receiver = {
        add(item) {
            if (context.document.getText().includes(item.insertText ?? item.label)) {
                return {};
            }
            return builder.add(item);
        },
    };
    if (!context.settings.Completion.Lang.Dynamic)
        return;
    if (bc_minecraft_bedrock_project_1.BehaviorPack.BehaviorPack.is(pack)) {
        generate_bp(pack, check_receiver);
    }
    else if (bc_minecraft_bedrock_project_1.ResourcePack.ResourcePack.is(pack)) {
        generate_rp(pack, check_receiver);
    }
}
function addColors(receiver) {
    receiver.add({ label: 'Black §0', documentation: 'The colour: Black', insertText: '§0' });
    receiver.add({ label: 'Dark Blue §1', documentation: 'The colour: Dark blue', insertText: '§1' });
    receiver.add({ label: 'Dark Green §2', documentation: 'The colour: Dark green', insertText: '§2' });
    receiver.add({ label: 'Dark Aqua §3', documentation: 'The colour: Dark aqua', insertText: '§3' });
    receiver.add({ label: 'Dark Red §4', documentation: 'The colour: Dark red', insertText: '§4' });
    receiver.add({ label: 'Dark Purple §5', documentation: 'The colour: Dark purple', insertText: '§5' });
    receiver.add({ label: 'Gold §6', documentation: 'The colour: Gold', insertText: '§6' });
    receiver.add({ label: 'Gray §7', documentation: 'The colour: Gray', insertText: '§7' });
    receiver.add({ label: 'Dark Gray §8', documentation: 'The colour: Dark gray', insertText: '§8' });
    receiver.add({ label: 'Blue §9', documentation: 'The colour: Blue', insertText: '§9' });
    receiver.add({ label: 'Green §a', documentation: 'The colour: Green', insertText: '§a' });
    receiver.add({ label: 'Aqua §b', documentation: 'The colour: Aqua', insertText: '§b' });
    receiver.add({ label: 'Red §c', documentation: 'The colour: Red', insertText: '§c' });
    receiver.add({ label: 'Light Purple §d', documentation: 'The colour: Light purple', insertText: '§d' });
    receiver.add({ label: 'Yellow §e', documentation: 'The colour: Yellow', insertText: '§e' });
    receiver.add({ label: 'White §f', documentation: 'The colour: White', insertText: '§f' });
    receiver.add({ label: 'Minecoin Gold §g', documentation: 'The colour: Minecoin Gold', insertText: '§g' });
    receiver.add({ label: 'Material Quartz §', documentation: 'The colour: Material Quartz', insertText: '§h' });
    receiver.add({ label: 'Material Iron §', documentation: 'The colour: Material Iron', insertText: '§i' });
    receiver.add({ label: 'Material Netherite §', documentation: 'The colour: Material Netherite', insertText: '§j' });
    receiver.add({ label: 'Material Redstone §', documentation: 'The colour: Material Redstone', insertText: '§m' });
    receiver.add({ label: 'Material Copper §', documentation: 'The colour: Material Copper', insertText: '§n' });
    receiver.add({ label: 'Material Gold §', documentation: 'The colour: Material Gold', insertText: '§p' });
    receiver.add({ label: 'Material Emerald §', documentation: 'The colour: Material Emerald', insertText: '§q' });
    receiver.add({ label: 'Material Diamond §', documentation: 'The colour: Material Diamond', insertText: '§s' });
    receiver.add({ label: 'Material Lapis §', documentation: 'The colour: Material Lapis', insertText: '§t' });
    receiver.add({ label: 'Material Amethyst §', documentation: 'The colour: Material Amethyst', insertText: '§u' });
    receiver.add({
        label: 'Random Symbols §k',
        documentation: 'Makes the text from this point random symbols',
        insertText: '§k',
    });
    receiver.add({ label: 'Bold §l', documentation: 'Makes the text from this point bold', insertText: '§l' });
    receiver.add({ label: 'Italic §o', documentation: 'Makes the text from this point italic', insertText: '§o' });
    receiver.add({ label: 'Reset §r', documentation: 'Resets the current formatting of text', insertText: '§r' });
}
function generate_bp(pack, receiver) {
    pack.entities.forEach((entity) => {
        const documentation = entity.documentation || `Entity: ${entity.id}`;
        receiver.add({
            label: `entity.${entity.id}.name`,
            documentation,
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            insertText: `entity.${entity.id}.name=`,
        });
        receiver.add({
            label: `item.spawn_egg.entity.${entity.id}.name`,
            documentation,
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            insertText: `item.spawn_egg.entity.${entity.id}.name=`,
        });
    });
    pack.blocks.forEach((block) => receiver.add({
        label: `tile.${block.id}.name`,
        documentation: block.documentation || `Entity: ${block.id}`,
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        insertText: `tile.${block.id}.name=`,
    }));
    pack.items.forEach((item) => receiver.add({
        label: `item.${item.id}.name`,
        documentation: item.documentation || `Entity: ${item.id}`,
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        insertText: `item.${item.id}.name=`,
    }));
}
function generate_rp(pack, receiver) {
    pack.entities.forEach((entity) => {
        const id = safe_id(entity.id);
        receiver.add({
            label: `entity.${id}.name`,
            documentation: entity.documentation || `Entity: ${id}`,
            kind: vscode_languageserver_1.CompletionItemKind.Property,
        });
        receiver.add({
            label: `item.spawn_egg.entity.${entity.id}.name`,
            documentation: entity.documentation || `Entity: ${id}`,
            kind: vscode_languageserver_1.CompletionItemKind.Property,
        });
    });
}
function isIn(text, index, inText) {
    const findIndex = inText.indexOf(text);
    if (findIndex < 0)
        return false;
    if (index > findIndex)
        return true;
    return false;
}
function safe_id(id) {
    const index = id.indexOf(':');
    if (index > -1) {
        return id.substring(index + 1, id.length).trim();
    }
    return id;
}
//# sourceMappingURL=language.js.map