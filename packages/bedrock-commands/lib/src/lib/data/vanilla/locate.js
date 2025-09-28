"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locate = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The locate command */
exports.locate = [
    {
        name: "locate",
        documentation: "Displays the coordinates for the closest structure or biome of a given type.",
        permission_level: 1,
        parameters: [
            { text: "locate", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "biome", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "biome", type: parameter_type_1.ParameterType.biome, required: true },
        ],
    },
    {
        name: "locate",
        documentation: "Displays the coordinates for the closest structure or biome of a given type.",
        permission_level: 1,
        parameters: [
            { text: "locate", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "structure", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "structure", type: parameter_type_1.ParameterType.structure, required: true },
            { text: "use new chunks only", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
];
//# sourceMappingURL=locate.js.map