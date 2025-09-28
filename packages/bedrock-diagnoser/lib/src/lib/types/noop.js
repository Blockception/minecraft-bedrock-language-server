"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoopDiagnoser = void 0;
class NoopDiagnoser {
    constructor(base) {
        this.context = base.context;
        this.project = base.project;
    }
    add() {
        //Do nothing
    }
}
exports.NoopDiagnoser = NoopDiagnoser;
//# sourceMappingURL=noop.js.map