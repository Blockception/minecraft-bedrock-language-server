"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_events = diagnose_events;
const types_1 = require("../../../types");
function diagnose_events(any, events, diagnoser) {
    if (typeof any !== "object")
        return;
    for (const prop in any) {
        //Found an event property
        const value = any[prop];
        if (prop === "event") {
            const target = any["target"];
            if ((target === "self" || target === undefined) && typeof value === "string") {
                if (!events.includes(value)) {
                    diagnoser.add(value, "Couldn't find event: " + value, types_1.DiagnosticSeverity.error, "event.missing");
                }
            }
        }
        if (typeof value === "object") {
            diagnose_events(value, events, diagnoser);
        }
    }
}
//# sourceMappingURL=diagnose.js.map