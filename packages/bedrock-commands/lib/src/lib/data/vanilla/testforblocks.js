"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testforblocks = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The testforblocks command */
exports.testforblocks = [
    {
        name: "testforblocks",
        documentation: "Tests whether the blocks in two regions match.",
        permission_level: 1,
        parameters: [
            { text: "testforblocks", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "begin x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "begin y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "begin z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "end x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "end y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "end z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "all", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
    {
        name: "testforblocks",
        documentation: "Tests whether the blocks in two regions match.",
        permission_level: 1,
        parameters: [
            { text: "testforblocks", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "begin x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "begin y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "begin z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "end x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "end y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "end z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "destination z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "masked", type: parameter_type_1.ParameterType.keyword, required: false },
        ],
    },
];
//# sourceMappingURL=testforblocks.js.map