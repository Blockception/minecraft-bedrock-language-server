"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The clone command */
exports.clone = [
    {
        name: "clone",
        documentation: "Clones blocks from one region to another.",
        permission_level: 1,
        parameters: [
            { text: "clone", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "begin x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "begin y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "begin z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "end x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "end y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "end z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "filtered", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "clone mode", type: parameter_type_1.ParameterType.cloneMode, required: true },
            { text: "tile name", type: parameter_type_1.ParameterType.block, required: true },
            { text: "block states", type: parameter_type_1.ParameterType.blockStates, required: false },
        ],
    },
    {
        name: "clone",
        documentation: "Clones blocks from one region to another.",
        permission_level: 1,
        parameters: [
            { text: "clone", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "begin x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "begin y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "begin z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "end x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "end y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "end z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "mask mode", type: parameter_type_1.ParameterType.maskMode, required: false },
            { text: "clone mode", type: parameter_type_1.ParameterType.cloneMode, required: false },
        ],
    },
];
//# sourceMappingURL=clone.js.map