"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.missing = missing;
const types_1 = require("../../types");
/**
 *
 * @param pack
 * @param subtype
 * @param id
 * @param diagnoser
 * @returns
 */
function missing(pack, subtype, id, diagnoser, location) {
    let p;
    switch (pack) {
        case "behaviors":
            p = "behaviorpack";
            break;
        case "resources":
            p = "resourcepack";
            break;
        default:
            p = pack;
    }
    if (typeof id === "string" && !id.includes("/")) {
        id = `"${id}"`;
    }
    diagnoser.add(location !== null && location !== void 0 ? location : id, `Cannot find ${p} ${String(subtype)} definition: ${id}`, types_1.DiagnosticSeverity.error, `${p}.${String(subtype)}.missing`);
}
//# sourceMappingURL=missing.js.map