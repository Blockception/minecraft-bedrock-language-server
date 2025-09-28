"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MolangSyntaxCache = void 0;
const syntax_1 = require("./syntax");
class MolangSyntaxCache {
    constructor() {
        this._data = new Map();
    }
    build(code) {
        const exp = this._data.get(code.text);
        if (exp === undefined) {
            const r = (0, syntax_1.parseMolang)(code);
            this._data.set(code.text, r);
            return r;
        }
        return exp;
    }
    clear() {
        this._data.clear();
    }
    entries() {
        return this._data.entries();
    }
    syntaxes() {
        return this._data.keys();
    }
    expressions() {
        return this._data.values();
    }
}
exports.MolangSyntaxCache = MolangSyntaxCache;
//# sourceMappingURL=cache.js.map