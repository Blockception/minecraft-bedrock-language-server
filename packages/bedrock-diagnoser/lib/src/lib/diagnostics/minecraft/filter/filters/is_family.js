"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_filter_is_family = diagnose_filter_is_family;
const types_1 = require("../../../../types");
const family_1 = require("../../family");
function diagnose_filter_is_family(filter, diagnoser) {
    const family = filter.value;
    if (!family) {
        return diagnoser.add("test/is_family", "Family is not defined", types_1.DiagnosticSeverity.error, "minecraft.filter.is_family.type");
    }
    if (typeof family !== "string") {
        return diagnoser.add(`test/is_family/${family}`, "Family is not defined", types_1.DiagnosticSeverity.error, "minecraft.filter.is_family.type");
    }
    (0, family_1.minecraft_family_diagnose)(family, diagnoser);
}
//# sourceMappingURL=is_family.js.map