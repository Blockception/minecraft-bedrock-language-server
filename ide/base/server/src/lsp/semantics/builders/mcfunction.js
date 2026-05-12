"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.McfunctionSemanticTokensBuilder = void 0;
const base_1 = require("./base");
/**
 *
 */
class McfunctionSemanticTokensBuilder extends base_1.BaseSemanticTokensBuilder {
    /**
     *
     * @param doc
     */
    constructor(doc) {
        super(doc);
    }
    /**
     *
     * @param Builder
     * @returns
     */
    static FromJson(Builder) {
        const Out = new McfunctionSemanticTokensBuilder(Builder.document);
        Out.builder = Builder.builder;
        return Out;
    }
}
exports.McfunctionSemanticTokensBuilder = McfunctionSemanticTokensBuilder;
//# sourceMappingURL=mcfunction.js.map