"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateFunctions = void 0;
exports.safeID = safeID;
exports.safeIDWithoutNamespace = safeIDWithoutNamespace;
exports.WithoutNamespace = WithoutNamespace;
const ide_shared_1 = require("@blockception/ide-shared");
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const bc_minecraft_project_1 = require("bc-minecraft-project");
const crypto_1 = require("crypto");
const util_1 = require("../util");
class TemplateFunctions {
    _fcontent;
    _context;
    _version;
    constructor(version, fcontent, context) {
        this._version = version;
        this._fcontent = fcontent;
        this._context = context;
    }
    get(attribute) {
        const callbackfn = this.data[attribute];
        if (typeof callbackfn === 'function') {
            return callbackfn.bind(this);
        }
        return undefined;
    }
    process(template) {
        return template.replace(/\$\{{([^{}]*)}}/gim, (sub, ...args) => {
            const command = args[0].trim();
            let parts = command.split(':');
            if (parts.length > 0) {
                sub = parts[0];
                parts = parts.slice(1).map((item) => item.trim());
            }
            const fn = this.get(sub);
            return fn ? fn(...parts) : '';
        });
    }
    getPack() {
        return this._context.database.ProjectData.get(this._fcontent.pack);
    }
    getProject() {
        return this.getPack()?.context || bc_minecraft_project_1.MCProject.createEmpty();
    }
    getAttribute(attr) {
        return this._fcontent.attributes[attr] || '';
    }
    data = {
        filename: () => this._fcontent.filename,
        filepath: () => util_1.Fs.FromVscode(util_1.Vscode.join(this._fcontent.folder, this._fcontent.filename)),
        folder: () => util_1.Fs.FromVscode(this._fcontent.folder),
        id: () => this.getAttribute('id'),
        'id.safe': () => safeID(this.getAttribute('id')),
        'id.safe.nonamespace': () => safeIDWithoutNamespace(this.getAttribute('id')),
        pack: () => this._fcontent.pack,
        'pack.type': () => bc_minecraft_bedrock_project_1.PackType.toString(this.getPack()?.type),
        'pack.type.short': () => bc_minecraft_bedrock_project_1.PackType.toStringShort(this.getPack()?.type),
        'project.attributes': (attribute) => this.getProject().attributes[attribute],
        'template.id': () => this._fcontent.templateID,
        'time.now': () => new Date().toUTCString(),
        tool: () => ide_shared_1.ToolIdentification,
        'tool.version': () => this._version,
        uuid: () => (0, crypto_1.randomUUID)(),
    };
}
exports.TemplateFunctions = TemplateFunctions;
function safeID(ID, replace = '_') {
    ID = ID.replace(/[:]/gi, replace);
    return ID;
}
function safeIDWithoutNamespace(ID, replace = '_') {
    ID = WithoutNamespace(ID);
    return safeID(ID, replace);
}
function WithoutNamespace(id) {
    const Index = id.indexOf(':');
    if (Index > 0)
        id = id.substring(Index + 1);
    return id;
}
//# sourceMappingURL=functions.js.map