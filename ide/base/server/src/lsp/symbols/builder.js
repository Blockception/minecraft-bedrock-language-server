"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbolBuilder = void 0;
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const vscode_languageserver_1 = require("vscode-languageserver");
class SymbolBuilder {
    query;
    items;
    kind;
    containerName;
    range;
    token;
    constructor(query = undefined, token) {
        this.token = token;
        if (query === '')
            query = undefined;
        this.query = query;
        this.items = [];
        this.kind = vscode_languageserver_1.SymbolKind.Object;
        this.range = vscode_languageserver_1.Range.create(0, 0, 0, 0);
        this.containerName = undefined;
    }
    push(item) {
        return this.items.push(item);
    }
    new(name, kind, range, uri, containerName) {
        const item = vscode_languageserver_1.SymbolInformation.create(name, kind ?? this.kind, range ?? this.range, uri ?? '', containerName ?? this.containerName);
        this.items.push(item);
        return item;
    }
    add(item) {
        if (this.query && !item.id.includes(this.query))
            return undefined;
        let range = this.range;
        const p = item.location.position;
        if (bc_minecraft_bedrock_shared_1.Position.is(p)) {
            range = vscode_languageserver_1.Range.create(p, { character: p.character + item.id.length, line: p.line });
        }
        return this.new(item.id, this.kind, range, item.location.uri, this.containerName);
    }
    generate(data, kind) {
        if (this.token.isCancellationRequested)
            return;
        this.kind = kind;
        data.forEach((item) => {
            if (this.token.isCancellationRequested)
                return;
            this.add(item);
        });
    }
}
exports.SymbolBuilder = SymbolBuilder;
//# sourceMappingURL=builder.js.map