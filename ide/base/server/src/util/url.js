"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fs = exports.Vscode = void 0;
const vscode_uri_1 = require("vscode-uri");
//Format that vscode sends:
//file:///f%3A/folder/behavior_packs/temp-bp/blocks/example.block.json
var Vscode;
(function (Vscode) {
    /**
     *
     * @param path
     * @returns
     */
    function fromFs(path) {
        if (isVscode(path)) {
            return path.replace(/\\/gi, '//');
        }
        return vscode_uri_1.URI.file(path).toString();
    }
    Vscode.fromFs = fromFs;
    function join(path, ...combine) {
        if (path.endsWith('/')) {
            path = path.slice(0, -1);
        }
        for (const c of combine) {
            if (c.startsWith('/')) {
                path += c;
            }
            else {
                path += '/' + c;
            }
        }
        return path;
    }
    Vscode.join = join;
    const vsUri = /^([a-zA-Z-09\-+]+:\/\/)/im;
    /**
     *
     * @param uri
     * @returns
     */
    function isVscode(uri) {
        if (vsUri.test(uri)) {
            return true;
        }
        return false;
    }
    Vscode.isVscode = isVscode;
})(Vscode || (exports.Vscode = Vscode = {}));
var Fs;
(function (Fs) {
    /**From something like file:///
     * @param uri
     * @returns
     */
    function FromVscode(uri) {
        return vscode_uri_1.URI.parse(uri, false).fsPath;
    }
    Fs.FromVscode = FromVscode;
})(Fs || (exports.Fs = Fs = {}));
//# sourceMappingURL=url.js.map