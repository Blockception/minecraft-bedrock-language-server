"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalRequest = internalRequest;
const ide_shared_1 = require("@blockception/ide-shared");
const vscode_languageserver_1 = require("vscode-languageserver");
const util_1 = require("../../util");
const builder_1 = require("./builder");
/**
 *
 * @param params
 * @returns
 */
async function internalRequest(context, params) {
    const document = context.documents.get(params.textDocument.uri);
    if (!document)
        return undefined;
    const builder = new builder_1.CodeLensBuilder(params, context.token);
    const pd = context.database.ProjectData;
    const items = config(pd);
    // Queue processor to batch all the data
    await util_1.Processor.forEach(items, (item) => forEach(item, document, builder), context.token, context.workDoneProgress);
    return builder.out;
}
function forEach(config, doc, builder) {
    if (config.regex === undefined) {
        config.regex = defaultRegex;
    }
    const text = doc.getText();
    config.data.forEach((item) => {
        if (builder.token.isCancellationRequested)
            return;
        if (item.location.uri === doc.uri)
            return;
        const regex = config.regex(item.id, doc);
        const matches = regex.exec(text);
        if (!matches)
            return;
        let index = matches.index;
        matches.forEach((match) => {
            index = text.indexOf(match, index);
            if (index < 0)
                return;
            builder.push({ range: createRange(index, doc, match.length), data: item });
            index += match.length;
        });
    });
}
function isJson(doc) {
    return doc.languageId === ide_shared_1.Languages.JsonIdentifier || doc.languageId === ide_shared_1.Languages.JsonCIdentifier;
}
function defaultRegex(id) {
    return new RegExp(`\\b${escapeRegex(id)}\\b`, 'g');
}
function selectorThing(id, doc) {
    return isJson(doc) ? new RegExp(`\\b(${escapeRegex(id)}=|=${escapeRegex(id)})\\b`, 'g') : defaultRegex(id);
}
function escapeRegex(id) {
    return id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function config(pd) {
    return [
        { data: pd.general.fakeEntities, regex: defaultRegex },
        { data: pd.general.objectives, regex: selectorThing },
        { data: pd.general.structures, regex: defaultRegex },
        { data: pd.general.tags, regex: selectorThing },
        { data: pd.general.tickingAreas, regex: defaultRegex },
        { data: pd.behaviorPacks.animationControllers },
        { data: pd.behaviorPacks.animations },
        { data: pd.behaviorPacks.blocks },
        { data: pd.behaviorPacks.entities },
        { data: pd.behaviorPacks.functions, regex: defaultRegex },
        { data: pd.behaviorPacks.items },
        { data: pd.behaviorPacks.lootTables, regex: defaultRegex },
        { data: pd.behaviorPacks.structures },
        { data: pd.behaviorPacks.trading },
        { data: pd.resourcePacks.animationControllers },
        { data: pd.resourcePacks.animations },
        { data: pd.resourcePacks.attachables },
        { data: pd.resourcePacks.blockCullingRules },
        { data: pd.resourcePacks.entities },
        { data: pd.resourcePacks.fogs },
        { data: pd.resourcePacks.materials },
        { data: pd.resourcePacks.models },
        { data: pd.resourcePacks.particles },
        { data: pd.resourcePacks.renderControllers },
        { data: pd.resourcePacks.sounds },
        { data: pd.resourcePacks.textures, regex: defaultRegex },
    ];
}
function createRange(index, doc, length) {
    const p = doc.positionAt(index);
    return vscode_languageserver_1.Range.create(p, vscode_languageserver_1.Position.create(p.line, p.character + length));
}
//# sourceMappingURL=on-request.js.map