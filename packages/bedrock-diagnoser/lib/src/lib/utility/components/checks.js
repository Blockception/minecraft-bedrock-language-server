"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.component_error = component_error;
exports.component_warning = component_warning;
exports.components_check = components_check;
const types_1 = require("../../types");
function component_error(message, code) {
    return (name, _component, _context, diagnoser) => {
        diagnoser.add(name, message, types_1.DiagnosticSeverity.error, code);
    };
}
function component_warning(message, code) {
    return (name, _component, _context, diagnoser) => {
        diagnoser.add(name, message, types_1.DiagnosticSeverity.warning, code);
    };
}
function components_check(data, context, diagnoser, component_test) {
    var _a;
    if (data === undefined)
        return;
    comp_container_check(data.components, context, diagnoser, component_test);
    comp_container_check(data, context, diagnoser, component_test);
    if (data.component_groups) {
        (_a = Object.entries(data.component_groups)) === null || _a === void 0 ? void 0 : _a.forEach(([, group]) => {
            comp_container_check(group, context, diagnoser, component_test);
        });
    }
}
function comp_container_check(container, context, diagnoser, component_test) {
    var _a;
    if (container === undefined)
        return;
    (_a = Object.keys(container)) === null || _a === void 0 ? void 0 : _a.forEach((key) => {
        const callbackfn = component_test[key];
        if (callbackfn) {
            try {
                callbackfn(key, container[key], context, diagnoser);
            }
            catch (err) {
                diagnoser.add(key, `the diagnoser encountered an error checking the '${key}' component: ${JSON.stringify({ message: err.message, stack: err.stack, ...err }, undefined, 2)}`, types_1.DiagnosticSeverity.error, "diagnostics.components.internal.error");
            }
        }
    });
}
//# sourceMappingURL=checks.js.map