"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextEditBuilder = void 0;
exports.addAllItems = addAllItems;
exports.generate_bp = generate_bp;
exports.generate_rp = generate_rp;
exports.generate_wp = generate_wp;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const vscode_languageserver_1 = require("vscode-languageserver");
const world_pack_1 = require("bc-minecraft-bedrock-project/src/project/world/world-pack");
async function addAllItems(context) {
    const { logger, arguments: args } = context;
    if (args === undefined) {
        throw new Error('no arguments');
    }
    const uri = args[0];
    if (uri === '' || uri === undefined) {
        throw new Error('no uri given, should be at 0');
    }
    const document = context.documents.get(uri);
    if (document === undefined) {
        throw new Error('document not found: ' + uri);
    }
    const pack = document.pack();
    if (!pack) {
        return logger.info('ignoring command, because document is not associated with a pack');
    }
    const builder = new TextEditBuilder(document);
    if (bc_minecraft_bedrock_project_1.BehaviorPack.BehaviorPack.is(pack)) {
        generate_bp(pack, builder);
    }
    else if (bc_minecraft_bedrock_project_1.ResourcePack.ResourcePack.is(pack)) {
        generate_rp(pack, builder);
    }
    else if (world_pack_1.WorldPack.is(pack)) {
        generate_wp();
    }
    const edit = vscode_languageserver_1.TextEdit.insert(document.positionAt(builder.textdoc.length), builder.out);
    if (builder.out.length > 0) {
        try {
            const check = await context.connection.workspace.applyEdit({
                edit: {
                    documentChanges: [vscode_languageserver_1.TextDocumentEdit.create({ uri: document.uri, version: document.version }, [edit])],
                },
            });
            if (!check.applied)
                logger.error('document edit failed!');
            if (check.failureReason)
                logger.error(check.failureReason);
        }
        catch (e) {
            logger.recordError(e, document);
        }
    }
}
function generate_bp(pack, builder) {
    pack.entities.forEach((entity) => {
        const id = Safe(entity.id);
        builder.Add(`entity.${entity.id}.name`, id, 'Entity: ' + entity.id);
        builder.Add(`item.spawn_egg.entity.${entity.id}.name`, 'Spawn ' + id, 'Spawn egg for entity: ' + entity.id);
    });
    pack.blocks.forEach((data) => builder.Add(`tile.${data.id}.name`, Safe(data.id), 'Block: ' + data.id));
    pack.items.forEach((item) => builder.Add(`item.${item.id}.name`, Safe(item.id), 'Item: ' + item.id));
}
function generate_rp(pack, builder) {
    pack.entities.forEach((entity) => {
        const id = Safe(entity.id);
        builder.Add(`entity.${entity.id}.name`, id, 'Entity: ' + entity.id);
        builder.Add(`item.spawn_egg.entity.${entity.id}.name`, 'Spawn ' + id, 'Spawn egg for entity: ' + entity.id);
    });
}
function generate_wp() { }
function Safe(id) {
    const index = id.indexOf(':');
    if (index > -1) {
        return id.substring(index + 1, id.length).trim();
    }
    return id;
}
class TextEditBuilder {
    out;
    textdoc;
    constructor(doc) {
        this.out = '';
        this.textdoc = doc?.getText() ?? '';
    }
    Add(Key, Value, Comment = undefined) {
        let Temp = Key + '=';
        if (this.textdoc.includes(Temp))
            return;
        Temp += Value;
        if (Comment) {
            Temp += '\t## ' + Comment;
        }
        this.out += Temp + '\n';
    }
}
exports.TextEditBuilder = TextEditBuilder;
//# sourceMappingURL=language.js.map