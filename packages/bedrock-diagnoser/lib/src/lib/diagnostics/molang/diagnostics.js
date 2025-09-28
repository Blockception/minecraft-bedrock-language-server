"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_molang_implementation = diagnose_molang_implementation;
const types_1 = require("../../types");
/**
 * Diagnoses the given molang sets, the using party checks upon the definer if they have setup properly
 * @param using The set of molang data that is being used
 * @param definer The set of molang data that is defined
 * @param diagnoser The diagnoser to report to
 */
function diagnose_molang_implementation(user, resource, diagnoser) {
    const assigned = new Set();
    getAssignedIds(assigned, resource.molang);
    getAssignedIds(assigned, user.molang);
    for (let res of resource.molang.using.values()) {
        if (res.scope === "this")
            return;
        const identifier = `${res.scope}.${res.names.join(".")}`;
        if (assigned.has(identifier))
            continue;
        diagnoser.add(user.id, `${identifier} is used by, but no definition is found by: ${diagnoser.metadata.userType} with id: ${user.id}`, types_1.DiagnosticSeverity.error, `molang.${res.scope}.undefined`);
    }
}
function getAssignedIds(receiver, data) {
    for (const item of data.assigned.values()) {
        receiver.add(`${item.scope}.${item.names.join(".")}`);
    }
}
//# sourceMappingURL=diagnostics.js.map