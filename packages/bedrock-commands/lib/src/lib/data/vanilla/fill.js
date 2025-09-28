"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fill = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The fill command */
exports.fill = [
    {
        name: "fill",
        documentation: "Fills all or parts of a region with a specific block.",
        permission_level: 1,
        parameters: [
            { text: "fill", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "from x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "from y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "from z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "to x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "to y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "to z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "tile name", type: parameter_type_1.ParameterType.block, required: true },
            { text: "block states", type: parameter_type_1.ParameterType.blockStates, required: true },
            { text: "old block handling", type: parameter_type_1.ParameterType.fillMode, required: false },
        ],
    },
    {
        name: "fill",
        documentation: "Fills all or parts of a region with a specific block.",
        permission_level: 1,
        parameters: [
            { text: "fill", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "from x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "from y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "from z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "to x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "to y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "to z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "tile name", type: parameter_type_1.ParameterType.block, required: true },
            { text: "block states", type: parameter_type_1.ParameterType.blockStates, required: true },
            { text: "replace", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "replace tile name", type: parameter_type_1.ParameterType.block, required: false },
            { text: "replace block states", type: parameter_type_1.ParameterType.blockStates, required: false },
        ],
    },
    {
        name: "fill",
        documentation: "Fills all or parts of a region with a specific block.",
        permission_level: 1,
        parameters: [
            { text: "fill", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "from x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "from y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "from z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "to x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "to y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "to z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "tile name", type: parameter_type_1.ParameterType.block, required: true },
            { text: "old block handling", type: parameter_type_1.ParameterType.fillMode, required: false },
        ],
    },
    {
        name: "fill",
        documentation: "Fills all or parts of a region with a specific block.",
        permission_level: 1,
        parameters: [
            { text: "fill", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "from x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "from y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "from z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "to x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "to y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "to z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "tile name", type: parameter_type_1.ParameterType.block, required: true },
            { text: "replace", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "replace tile name", type: parameter_type_1.ParameterType.block, required: false },
            { text: "replace block states", type: parameter_type_1.ParameterType.blockStates, required: false },
        ],
    },
];
//# sourceMappingURL=fill.js.map