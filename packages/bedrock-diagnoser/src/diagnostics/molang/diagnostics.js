"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_molang_implementation = diagnose_molang_implementation;
const bc_minecraft_molang_1 = require("bc-minecraft-molang");
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
    const molangset = bc_minecraft_molang_1.MolangData.get(diagnoser.metadata.userType);
    for (const res of resource.molang.using.values()) {
        if (res.scope === 'this')
            return;
        const identifier = getId(res);
        if (assigned.has(identifier))
            continue;
        // Check if this is a built-in variable/context/temp for this user type
        // Resource references (texture, geometry, material) are never built-in, they must be defined
        const normalizedScope = normalizeVariableScope(res);
        if (!isResourceReference(normalizedScope)) {
            // Only check built-in data for variable scopes (not resources)
            const builtInData = bc_minecraft_molang_1.MolangDataSet.get(molangset, normalizedScope);
            const fnId = getFnId(res);
            if (builtInData?.some((x) => x.id === fnId)) {
                continue;
            }
        }
        diagnoser.add(user.id, `${identifier} is used by, but no definition is found by: ${diagnoser.metadata.userType} with id: ${user.id}`, types_1.DiagnosticSeverity.error, `molang.${res.scope}.undefined`);
    }
}
function isResourceReference(item) {
    switch (item) {
        case 'texture':
        case 'geometry':
        case 'material':
            return true;
    }
    return false;
}
function getId(item) {
    const scope = normalizeVariableScope(item);
    return `${scope}.${item.names.join('.')}`;
}
function getFnId(item) {
    return `${item.names.join('.')}`;
}
function normalizeVariableScope(item) {
    let scope = item.scope;
    switch (scope) {
        case 'c':
            scope = 'context';
            break;
        case 't':
            scope = 'temp';
            break;
        case 'v':
            scope = 'variable';
            break;
    }
    return scope;
}
function getAssignedIds(receiver, data) {
    for (const item of data.assigned.values()) {
        receiver.add(getId(item));
    }
}
//# sourceMappingURL=diagnostics.js.map