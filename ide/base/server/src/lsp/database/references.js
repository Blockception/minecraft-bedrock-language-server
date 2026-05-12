"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceBuilder = void 0;
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const bc_minecraft_molang_1 = require("bc-minecraft-molang");
const vscode_languageserver_1 = require("vscode-languageserver");
class ReferenceBuilder {
    locations;
    documents;
    options;
    token;
    constructor(documents, options, token) {
        this.locations = [];
        this.documents = documents;
        this.options = options;
        this.token = token;
    }
    findReference(item, id) {
        if (item.id === id) {
            this.locations.push(item);
        }
        this.inDefinedOrUsage(item, id, item.events);
        this.inDefinedOrUsage(item, id, item.families);
        this.inDefinedOrUsage(item, id, item.groups);
        this.inDefinedOrUsage(item, id, item.bones);
        this.inDefinedOrUsage(item, id, item.events);
        this.inDefinedOrUsage(item, id, item.animations);
        this.inDefinedOrUsage(item, id, item.particles);
        this.inDefinedOrUsage(item, id, item.sounds);
        this.inMolang(item, id, item.molang);
        this.inNamed(item, id, item.properties);
        this.inNamed(item, id, item.states);
    }
    inDefinedOrUsage(holder, id, items) {
        if (this.token?.isCancellationRequested)
            return;
        if (this.options.defined && bc_minecraft_bedrock_project_1.Defined.is(items))
            this.inSet(holder, id, items.defined);
        if (this.options.usage && bc_minecraft_bedrock_project_1.Using.is(items))
            this.inSet(holder, id, items.using);
    }
    inSet(holder, id, items) {
        if (this.token?.isCancellationRequested)
            return;
        items?.forEach((i) => {
            if (i === id)
                return this.add(holder, i);
        });
    }
    inNamed(holder, id, items) {
        if (this.token?.isCancellationRequested)
            return;
        items?.filter((o) => o.name === id).forEach((o) => this.add(holder, o.name));
    }
    inMolang(holder, id, molang) {
        if (this.token?.isCancellationRequested || molang === undefined)
            return;
        molang.using.forEach((i) => this.checkMolang(holder, id, i));
        molang.assigned.forEach((i) => this.checkMolang(holder, id, i));
        molang.functions.forEach((i) => this.checkMolang(holder, id, i));
    }
    checkMolang(holder, id, item) {
        if (!id.startsWith(item.scope))
            return;
        const identifier = bc_minecraft_molang_1.ExpressionNode.getIdentifier(item);
        if (identifier === id) {
            this.addItem(holder, item.position, identifier.length);
        }
    }
    add(holder, item) {
        const doc = this.documents.get(holder.location.uri);
        if (doc === undefined)
            return;
        const r = bc_minecraft_bedrock_shared_1.DocumentLocation.toRange(item, doc, item.length);
        this.locations.push(vscode_languageserver_1.Location.create(doc.uri, r));
    }
    addItem(holder, item, length) {
        const doc = this.documents.get(holder.location.uri);
        if (doc === undefined)
            return;
        const r = bc_minecraft_bedrock_shared_1.DocumentLocation.toRange(item, doc, length);
        this.locations.push(vscode_languageserver_1.Location.create(doc.uri, r));
    }
}
exports.ReferenceBuilder = ReferenceBuilder;
//# sourceMappingURL=references.js.map