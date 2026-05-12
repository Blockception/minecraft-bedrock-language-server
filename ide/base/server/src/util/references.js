"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.References = void 0;
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const vscode_languageserver_1 = require("vscode-languageserver");
var References;
(function (References) {
    /**
     * Converts the given locations or references into resolved locations
     * @param items The items to check or filter or convert
     * @param documents The documents manager to use to lookup documents, and potentially use to lookup references
     * @returns A list of locations
     */
    function convertLocation(items, documents) {
        function mapItem(item) {
            if (vscode_languageserver_1.Location.is(item) || item === undefined)
                return item;
            const document = documents.get(item.location.uri);
            if (!document)
                return;
            const range = bc_minecraft_bedrock_shared_1.DocumentLocation.toRange(item.location.position, document, item.id.length);
            return vscode_languageserver_1.Location.create(document.uri, range);
        }
        return items.map(mapItem).filter((item) => item !== undefined);
    }
    References.convertLocation = convertLocation;
})(References || (exports.References = References = {}));
//# sourceMappingURL=references.js.map