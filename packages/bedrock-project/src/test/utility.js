"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextProjectContext = void 0;
const fs_1 = require("fs");
class TextProjectContext {
    getDocument(uri) {
        return {
            getText: () => (0, fs_1.readFileSync)(uri).toString(),
            uri: uri,
        };
    }
    getFiles() {
        return [];
    }
}
exports.TextProjectContext = TextProjectContext;
//# sourceMappingURL=utility.js.map