"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifyDocument = identifyDocument;
const ide_shared_1 = require("@blockception/ide-shared");
const bc_minecraft_project_1 = require("bc-minecraft-project");
const vscode_uri_1 = require("vscode-uri");
/**
 * Returns the language ID based upon the uri
 * @param uri The documents uri
 */
function identifyDocument(uri) {
    const ext = vscode_uri_1.Utils.extname(uri).toLowerCase();
    switch (ext) {
        case '.lang':
            return ide_shared_1.Languages.McLanguageIdentifier;
        case '.json':
            return ide_shared_1.Languages.JsonIdentifier;
        case '.mcfunction':
            return ide_shared_1.Languages.McFunctionIdentifier;
        case '.molang':
            return ide_shared_1.Languages.McMolangIdentifier;
    }
    const filename = vscode_uri_1.Utils.basename(uri);
    switch (filename) {
        case bc_minecraft_project_1.MCDefinition.filename:
        case bc_minecraft_project_1.MCAttributes.filename:
        case bc_minecraft_project_1.MCIgnore.filename:
            return ide_shared_1.Languages.McProjectIdentifier;
    }
    return ide_shared_1.Languages.McOtherIdentifier;
}
//# sourceMappingURL=languageId.js.map