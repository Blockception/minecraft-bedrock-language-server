"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testforblock = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The testforblock command */
exports.testforblock = [
    {
        name: "testforblock",
        documentation: "Tests whether a certain block is in a specific location.",
        permission_level: 1,
        parameters: [
            { text: "testforblock", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "position x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position y", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "position z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "tile name", type: parameter_type_1.ParameterType.block, required: true },
            { text: "block states", type: parameter_type_1.ParameterType.blockStates, required: false },
        ],
    },
];
//# sourceMappingURL=testforblock.js.map