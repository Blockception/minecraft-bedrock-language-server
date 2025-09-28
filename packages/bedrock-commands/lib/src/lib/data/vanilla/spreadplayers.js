"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spreadplayers = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The spreadplayers command */
exports.spreadplayers = [
    {
        name: "spreadplayers",
        documentation: "Teleports entities to random locations.",
        permission_level: 1,
        parameters: [
            { text: "spreadplayers", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "x", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "z", type: parameter_type_1.ParameterType.coordinate, required: true },
            { text: "spread distance", type: parameter_type_1.ParameterType.float, required: true },
            { text: "max range", type: parameter_type_1.ParameterType.float, required: true },
            { text: "victim", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "max height", type: parameter_type_1.ParameterType.rotation, required: false },
        ],
    },
];
//# sourceMappingURL=spreadplayers.js.map