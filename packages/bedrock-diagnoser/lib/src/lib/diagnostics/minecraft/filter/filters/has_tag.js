"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_filter_has_tag = diagnose_filter_has_tag;
const types_1 = require("../../../../types");
const tag_1 = require("../../tag");
function diagnose_filter_has_tag(filter, diagnoser) {
    const tag = filter.value;
    if (!tag) {
        return diagnoser.add("test/has_tag", "Tag is not defined", types_1.DiagnosticSeverity.error, "minecraft.filter.has_tag.type");
    }
    if (typeof tag !== "string") {
        return diagnoser.add(`test/has_tag/${tag}`, "Tag is not defined", types_1.DiagnosticSeverity.error, "minecraft.filter.has_tag.type");
    }
    (0, tag_1.minecraft_tag_diagnose)(tag, diagnoser);
}
//# sourceMappingURL=has_tag.js.map