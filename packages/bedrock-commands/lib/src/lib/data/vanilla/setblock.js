"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setblock = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The setblock command */
exports.setblock = [
    {
        name: "setblock",
        documentation: "Changes a block to another block.",
        permission_level: 1,
        parameters: [
            { text: "setblock", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "position x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "tile name", type: parameter_type_1.ParameterType.block, required: true },
            { text: "block states", type: parameter_type_1.ParameterType.blockStates, required: true },
            { text: "destroy", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "setblock",
        documentation: "Changes a block to another block.",
        permission_level: 1,
        parameters: [
            { text: "setblock", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "position x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "tile name", type: parameter_type_1.ParameterType.block, required: true },
            { text: "block states", type: parameter_type_1.ParameterType.blockStates, required: true },
            { text: "keep", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "setblock",
        documentation: "Changes a block to another block.",
        permission_level: 1,
        parameters: [
            { text: "setblock", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "position x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "tile name", type: parameter_type_1.ParameterType.block, required: true },
            { text: "block states", type: parameter_type_1.ParameterType.blockStates, required: true },
            { text: "replace", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "setblock",
        documentation: "Changes a block to another block.",
        permission_level: 1,
        parameters: [
            { text: "setblock", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "position x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "tile name", type: parameter_type_1.ParameterType.block, required: true },
            { text: "destroy", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "setblock",
        documentation: "Changes a block to another block.",
        permission_level: 1,
        parameters: [
            { text: "setblock", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "position x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "tile name", type: parameter_type_1.ParameterType.block, required: true },
            { text: "keep", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "setblock",
        documentation: "Changes a block to another block.",
        permission_level: 1,
        parameters: [
            { text: "setblock", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "position x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "tile name", type: parameter_type_1.ParameterType.block, required: true },
            { text: "replace", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
];
//# sourceMappingURL=setblock.js.map