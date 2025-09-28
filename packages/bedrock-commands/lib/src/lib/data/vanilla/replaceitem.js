"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceitem = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The replaceitem command */
exports.replaceitem = [
    {
        name: "replaceitem",
        documentation: "Replaces items in inventories.",
        permission_level: 1,
        parameters: [
            { text: "replaceitem", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "block", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "position x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "slot.container", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "slot id", type: parameter_type_1.ParameterType.integer, required: true },
            { text: "item name", type: parameter_type_1.ParameterType.item, required: true },
            { text: "amount", type: parameter_type_1.ParameterType.integer, required: false },
            { text: "data", type: parameter_type_1.ParameterType.integer, required: false },
            { text: "components", type: parameter_type_1.ParameterType.jsonItem, required: false },
        ],
    },
    {
        name: "replaceitem",
        documentation: "Replaces items in inventories.",
        permission_level: 1,
        parameters: [
            { text: "replaceitem", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "block", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "position x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "slot.container", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "slot id", type: parameter_type_1.ParameterType.integer, required: true },
            { text: "old item handling", type: parameter_type_1.ParameterType.replaceMode, required: true },
            { text: "item name", type: parameter_type_1.ParameterType.item, required: true },
            { text: "amount", type: parameter_type_1.ParameterType.integer, required: false },
            { text: "data", type: parameter_type_1.ParameterType.integer, required: false },
            { text: "components", type: parameter_type_1.ParameterType.jsonItem, required: false },
        ],
    },
    {
        name: "replaceitem",
        documentation: "Replaces items in inventories.",
        permission_level: 1,
        parameters: [
            { text: "replaceitem", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "entity", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "slot type", type: parameter_type_1.ParameterType.slotType, required: true },
            { text: "slot id", type: parameter_type_1.ParameterType.integer, required: true },
            { text: "item name", type: parameter_type_1.ParameterType.item, required: true },
            { text: "amount", type: parameter_type_1.ParameterType.integer, required: false },
            { text: "data", type: parameter_type_1.ParameterType.integer, required: false },
            { text: "components", type: parameter_type_1.ParameterType.jsonItem, required: false },
        ],
    },
    {
        name: "replaceitem",
        documentation: "Replaces items in inventories.",
        permission_level: 1,
        parameters: [
            { text: "replaceitem", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "entity", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "slot type", type: parameter_type_1.ParameterType.slotType, required: true },
            { text: "slot id", type: parameter_type_1.ParameterType.integer, required: true },
            { text: "old item handling", type: parameter_type_1.ParameterType.replaceMode, required: true },
            { text: "item name", type: parameter_type_1.ParameterType.item, required: true },
            { text: "amount", type: parameter_type_1.ParameterType.integer, required: false },
            { text: "data", type: parameter_type_1.ParameterType.integer, required: false },
            { text: "components", type: parameter_type_1.ParameterType.jsonItem, required: false },
        ],
    },
];
//# sourceMappingURL=replaceitem.js.map