"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeLensBuilder = void 0;
/**
 *
 */
class CodeLensBuilder {
    params;
    token;
    out;
    /**
     *
     * @param params
     */
    constructor(params, token) {
        this.params = params;
        this.out = [];
        this.token = token;
    }
    /**
     *
     * @param item
     */
    push(item) {
        if (item) {
            this.out.push(item);
        }
    }
}
exports.CodeLensBuilder = CodeLensBuilder;
//# sourceMappingURL=builder.js.map