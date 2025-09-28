"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_entity_properties_definition = diagnose_entity_properties_definition;
exports.diagnose_entity_property_usage = diagnose_entity_property_usage;
const types_1 = require("../../../types");
function diagnose_entity_properties_definition(property, diagnoser, text) {
    for (const prop of property) {
        diagnose_entity_property_definition(prop, diagnoser, text);
    }
    // https://learn.microsoft.com/en-us/minecraft/creator/documents/introductiontoentityproperties#number-of-entity-properties-per-entity-type
    if (property.length > 32) {
        diagnoser.add(`properties`, `Entity has too many properties: ${property.length}, expected 32 or less`, types_1.DiagnosticSeverity.warning, "behaviorpack.entity.property.count");
    }
}
function diagnose_entity_property_definition(property, diagnoser, text) {
    const { name, type } = property;
    switch (type) {
        case "bool":
            return diagnose_entity_bool_property_definition(property, diagnoser);
        case "float":
            return diagnose_entity_float_property_definition(property, diagnoser, text);
        case "int":
            return diagnose_entity_int_property_definition(property, diagnoser);
        case "enum":
            return diagnose_entity_enum_property_definition(property, diagnoser);
    }
    diagnoser.add(`properties/${name}`, `Unknown property type: ${type}`, types_1.DiagnosticSeverity.error, "behaviorpack.entity.property.unknown");
}
function diagnose_entity_bool_property_definition(property, diagnoser) {
    const { name, default: def } = property;
    if (typeof def === "boolean" || typeof def === "string")
        return;
    diagnoser.add(`properties/${name}/${def}`, `Default value is not a boolean: ${def}`, types_1.DiagnosticSeverity.error, "behaviorpack.entity.property.bool.default");
}
function diagnose_entity_float_property_definition(property, diagnoser, text) {
    var _a;
    const { name, default: def } = property;
    // Default value needs to be a number and within the range
    if (def === undefined)
        return;
    if (Array.isArray(property.range) && typeof def === "number") {
        if (def < property.range[0] || def > property.range[1]) {
            diagnoser.add(`properties/${name}/${def}`, `Default value is not within the range: ${def}`, types_1.DiagnosticSeverity.error, "behaviorpack.entity.property.float.default");
        }
    }
    if ((typeof def === "number" && !Number.isInteger(def)) || typeof def === "string")
        return;
    const regexMatch = (_a = text.match(new RegExp(`"${name}"\\s*:\\s*\\{[^{}]*\\}`, "gm"))) === null || _a === void 0 ? void 0 : _a[0];
    if (regexMatch && regexMatch.match(new RegExp(`"default"\\s*:\\s*${def}\\.[0-9]`)))
        return;
    diagnoser.add(`properties/${name}/${def}`, `Default value is not a float: ${def}`, types_1.DiagnosticSeverity.error, "behaviorpack.entity.property.float.default");
}
function diagnose_entity_int_property_definition(property, diagnoser) {
    const { name, default: def } = property;
    // Default value needs to be a number and within the range
    if (def === undefined)
        return;
    // Default value needs to be a number and within the range
    if (Array.isArray(property.range) && typeof def === "number") {
        if (def < property.range[0] || def > property.range[1]) {
            diagnoser.add(`properties/${name}/${def}`, `Default value is not within the range: ${def}`, types_1.DiagnosticSeverity.error, "behaviorpack.entity.property.int.default");
        }
    }
    if ((typeof def === "number" && Number.isInteger(def)) || typeof def === "string" || Number.isNaN(def))
        return;
    diagnoser.add(`properties/${name}/${def}`, `Default value is not an integer: ${def}`, types_1.DiagnosticSeverity.error, "behaviorpack.entity.property.int.default");
}
function diagnose_entity_enum_property_definition(property, diagnoser) {
    var _a, _b;
    const { name, default: def } = property;
    //https://learn.microsoft.com/en-us/minecraft/creator/documents/introductiontoentityproperties#enum-property-restrictions
    // default needs to be in the list
    if (def !== undefined) {
        if (((_a = property.values) === null || _a === void 0 ? void 0 : _a.indexOf(def)) === -1 &&
            !(def.includes("q.") ||
                def.includes("query.") ||
                def.includes("math.") ||
                def.includes("v.") ||
                def.includes("variable.") ||
                def.includes("c.") ||
                def.includes("context."))) {
            diagnoser.add(`properties/${name}/${def}`, `Default value is not in the list of values: ${def}`, types_1.DiagnosticSeverity.error, "behaviorpack.entity.property.enum.default");
        }
    }
    if (property.values !== undefined) {
        // Maximum 16 entries
        if (property.values.length > 16) {
            diagnoser.add(`properties/${name}`, `Entity has too many values: ${(_b = property.values) === null || _b === void 0 ? void 0 : _b.length}, expected 16 or less`, types_1.DiagnosticSeverity.error, "behaviorpack.entity.property.enum.values.count");
        }
        // Each entry needs to be a string of length 1 to 32
        for (const value of property.values) {
            if (typeof value !== "string") {
                diagnoser.add(`properties/${name}/${value}`, `Value is not a string: ${value}`, types_1.DiagnosticSeverity.error, "behaviorpack.entity.property.enum.values.type");
            }
            else {
                if (value.length > 32 || value.length < 1) {
                    diagnoser.add(`properties/${name}/${value}`, `Value is not a string of length 1 to 32: ${value}`, types_1.DiagnosticSeverity.error, "behaviorpack.entity.property.enum.values.length");
                }
                if (/[^a-zA-Z0-9_]/.test(value)) {
                    diagnoser.add(`properties/${name}/${value}`, `Entity property value "${value}" can only contain alphanumeric characters and underscores.`, types_1.DiagnosticSeverity.error, "behaviorpack.entity.property.enum.values.special_character");
                }
            }
        }
    }
}
/**
 * Checks if the property is used correctly
 * @param definitions The definitions to check against
 * @param name The property name to check
 * @param value The value to check
 * @param parent The parent of the property
 * @param diagnoser The diagnoser to report to
 */
function diagnose_entity_property_usage(definitions, name, value, parent, diagnoser) {
    const names = definitions.map((def) => def.name);
    if (!names.includes(name)) {
        diagnoser.add(`${parent}/${name}`, `Entity property definition for "${name}" not found`, types_1.DiagnosticSeverity.error, "behaviorpack.entity.property.unknown_property");
    }
    for (const def of definitions) {
        if (def.name === name) {
            check_entity_property_usage(def, name, value, parent, diagnoser);
        }
    }
}
function check_entity_property_usage(definition, name, value, parent, diagnoser) {
    var _a, _b;
    switch (definition.type) {
        case "bool":
            value = value !== null && value !== void 0 ? value : false;
            if (typeof value === "boolean" || typeof value === "string")
                return;
            diagnoser.add(`${parent}/${name}/${value}`, `Property value is not a boolean: ${value}`, types_1.DiagnosticSeverity.error, "behaviorpack.entity.property.bool.value");
            break;
        case "int":
            if ((typeof value === "number" && Number.isInteger(value)) || typeof value === "string")
                return;
            diagnoser.add(`${parent}/${name}/${value}`, `Property value is not a integer: ${value}`, types_1.DiagnosticSeverity.error, `behaviorpack.entity.property.${definition.type}.value`);
            break;
        case "float":
            if ((typeof value === "number" && !Number.isInteger(value)) || typeof value === "string")
                return;
            diagnoser.add(`${parent}/${name}/${value}`, `Property value is not a float: ${value}`, types_1.DiagnosticSeverity.error, `behaviorpack.entity.property.${definition.type}.value`);
            break;
        case "enum":
            if (typeof value !== "string") {
                diagnoser.add(`${parent}/${name}/${value}`, `Property value is not a string: ${value}`, types_1.DiagnosticSeverity.error, "behaviorpack.entity.property.enum.value");
                break;
            }
            // Value needs to be in the list
            if (((_a = definition.values) === null || _a === void 0 ? void 0 : _a.indexOf(value)) === -1) {
                diagnoser.add(`${parent}/${name}/${value}`, `Property value is not in the list of enum values: ${value}, expecting ${(_b = definition.values) === null || _b === void 0 ? void 0 : _b.join(", ")}`, types_1.DiagnosticSeverity.error, "behaviorpack.entity.property.enum.value");
            }
            break;
    }
}
//# sourceMappingURL=properties.js.map