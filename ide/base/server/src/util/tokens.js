"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tokens = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
var Tokens;
(function (Tokens) {
    function combine(first, second) {
        return new CombineToken(first, second);
    }
    Tokens.combine = combine;
})(Tokens || (exports.Tokens = Tokens = {}));
class CombineToken {
    first;
    second;
    _onCancellationRequested;
    constructor(first, second) {
        this.first = first;
        this.second = second;
        this.isCancellationRequested = first?.isCancellationRequested || second?.isCancellationRequested || false;
        this._onCancellationRequested = new vscode_languageserver_1.Emitter();
        this.first?.onCancellationRequested(this._onCancellation.bind(this));
        this.second?.onCancellationRequested(this._onCancellation.bind(this));
    }
    isCancellationRequested;
    get onCancellationRequested() {
        return this._onCancellationRequested.event;
    }
    _onCancellation(e) {
        this.isCancellationRequested = this.first?.isCancellationRequested || this.second?.isCancellationRequested || false;
        this._onCancellationRequested.fire(e);
    }
}
//# sourceMappingURL=tokens.js.map