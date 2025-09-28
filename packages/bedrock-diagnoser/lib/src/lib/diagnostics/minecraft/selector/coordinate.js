"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectorattribute_coordinate = selectorattribute_coordinate;
const types_1 = require("../../../types");
const coordinate_1 = require("../coordinate");
/**
 *
 * @param name
 * @param selector
 * @param receiver
 */
function selectorattribute_coordinate(value, diagnoser) {
    if (value.text.startsWith("^")) {
        diagnoser.add(value, "Selector attribute coordinate cannot be local coordinates types, only relative or absolute", types_1.DiagnosticSeverity.error, "minecraft.selector.coordinate.invalid");
        return false;
    }
    return (0, coordinate_1.minecraft_coordinate_diagnose)(value, diagnoser);
}
//# sourceMappingURL=coordinate.js.map