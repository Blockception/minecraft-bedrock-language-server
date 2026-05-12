"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const bc_minecraft_project_1 = require("bc-minecraft-project");
const vscode_languageserver_1 = require("vscode-languageserver");
const templates_1 = require("../../../commands/commands/templates");
const general_1 = require("../../general");
function provideCompletion(context) {
    const filename = context.document.filename();
    switch (filename) {
        case bc_minecraft_project_1.MCAttributes.filename:
            provideAttributes(context);
            break;
        case bc_minecraft_project_1.MCDefinition.filename:
            provideDefinitions(context);
            break;
        case bc_minecraft_project_1.MCIgnore.filename:
            break;
    }
}
/**
 *
 * @param context
 * @param pos
 * @returns
 */
function provideAttributes(context) {
    const { builder, document, position } = context;
    const line = document.getLine(position.line);
    const index = line.indexOf('=');
    if (index > -1 && index < position.character) {
        general_1.Boolean.provideCompletion(context);
        return;
    }
    builder.add({ label: '## ', documentation: 'Comment', kind: vscode_languageserver_1.CompletionItemKind.Snippet });
    builder.add({
        label: 'education.enable',
        documentation: 'Disable or enable education edition for this project',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        insertText: 'education.enable=',
    });
    builder.add({
        label: 'diagnostic.enable',
        documentation: 'Disable or enable diagnostics for this project',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        insertText: 'diagnostic.enable=',
    });
    builder.add({
        label: 'diagnostic.json',
        documentation: 'Disable or enable diagnostics for json in this project',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        insertText: 'diagnostic.json=',
    });
    builder.add({
        label: 'diagnostic.lang',
        documentation: 'Disable or enable diagnostics for language in this project',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        insertText: 'diagnostic.lang=',
    });
    builder.add({
        label: 'diagnostic.mcfunction',
        documentation: 'Disable or enable diagnostics for mcfunction in this project',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        insertText: 'diagnostic.mcfunction=',
    });
    builder.add({
        label: 'diagnostic.objective',
        documentation: 'Disable or enable diagnostics for objectives in this project',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        insertText: 'diagnostic.objective=',
    });
    builder.add({
        label: 'diagnostic.tag',
        documentation: 'Disable or enable diagnostics for tags in this project',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        insertText: 'diagnostic.tag=',
    });
    const templates = templates_1.TemplateCommands.map((v) => v.templateId());
    templates.forEach((temp) => {
        temp = temp.replace('-', '.');
        builder.add({
            label: `template.${temp}.filename`,
            documentation: 'The filename of the template',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            insertText: `template.${temp}.filename=`,
        });
        builder.add({
            label: `template.${temp}.file`,
            documentation: 'The file of the content of the file',
            kind: vscode_languageserver_1.CompletionItemKind.File,
            insertText: `template.${temp}.file=`,
        });
    });
}
/**
 *
 * @param context
 * @param pos
 * @returns
 */
function provideDefinitions(context) {
    const { builder, document, position, database } = context;
    const projectData = database.ProjectData;
    const line = document.getLine(position.line);
    const index = line.indexOf('=');
    if (index > -1 && index < position.character) {
        const definition = line.substring(0, index);
        switch (definition) {
            case 'block':
                return projectData.behaviorPacks.blocks.forEach((block) => add(context, block));
            case 'entity':
                return projectData.behaviorPacks.entities.forEach((entity) => add(context, entity));
            case 'family':
                return projectData.behaviorPacks.entities.forEach((entity) => entity.families.defined.forEach((family) => add(context, family)));
            case 'function':
                return projectData.behaviorPacks.functions.forEach((funct) => add(context, funct));
            case 'item':
                return projectData.behaviorPacks.items.forEach((item) => add(context, item));
            case 'loot_table':
                return projectData.behaviorPacks.lootTables.forEach((loot_table) => add(context, loot_table));
            case 'name':
                return projectData.general.fakeEntities.forEach((entity) => add(context, entity));
            case 'objective':
                return projectData.general.objectives.forEach((obj) => add(context, obj));
            case 'structure':
                return projectData.behaviorPacks.structures.forEach((structure) => add(context, structure));
            case 'tag':
                return projectData.general.tags.forEach((tag) => add(context, tag));
            case 'tickingarea':
                return projectData.general.tickingAreas.forEach((tickingarea) => add(context, tickingarea));
        }
        return;
    }
    builder.add({ label: '## ', documentation: 'Comment', kind: vscode_languageserver_1.CompletionItemKind.Snippet });
    builder.add({
        label: 'block',
        documentation: 'Include or excluded a block definition',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        insertText: 'block=',
    });
    builder.add({
        label: 'entity',
        documentation: 'Include or excluded a entity definition',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        insertText: 'entity=',
    });
    builder.add({
        label: 'family',
        documentation: 'Include or excluded a family definition',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        insertText: 'family=',
    });
    builder.add({
        label: 'function',
        documentation: 'Include or excluded a function definition',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        insertText: 'function=',
    });
    builder.add({
        label: 'item',
        documentation: 'Include or excluded a item definition',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        insertText: 'item=',
    });
    builder.add({
        label: 'loot_table',
        documentation: 'Include or excluded a loot_table definition',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        insertText: 'loot_table=',
    });
    builder.add({
        label: 'name',
        documentation: 'Include or excluded a name definition',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        insertText: 'name=',
    });
    builder.add({
        label: 'objective',
        documentation: 'Include or excluded a objective definition',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        insertText: 'objective=',
    });
    builder.add({
        label: 'structure',
        documentation: 'Include or excluded a structure definition',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        insertText: 'structure=',
    });
    builder.add({
        label: 'tag',
        documentation: 'Include or excluded a tag definition',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        insertText: 'tag=',
    });
    builder.add({
        label: 'tickingarea',
        documentation: 'Include or excluded a tickingarea definition',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        insertText: 'tickingarea=',
    });
}
function add(context, value) {
    let label;
    const documentation = { kind: 'markdown', value: '' };
    if (typeof value === 'string') {
        label = value;
        documentation.value = value;
    }
    else {
        label = value.id;
        documentation.value = value.documentation ?? '';
    }
    context.builder.add({ label: label, documentation, kind: vscode_languageserver_1.CompletionItemKind.Value }).sortText = label;
    context.builder.add({ label: '!' + label, documentation, kind: vscode_languageserver_1.CompletionItemKind.Value }).sortText = `${label}2`;
}
//# sourceMappingURL=mcproject.js.map