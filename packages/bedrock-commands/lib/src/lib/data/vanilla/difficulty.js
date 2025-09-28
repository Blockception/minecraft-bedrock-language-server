"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.difficulty = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The difficulty command */
exports.difficulty = [
    {
        name: "difficulty",
        documentation: "Sets the difficulty level.",
        permission_level: 1,
        parameters: [
            { text: "difficulty", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "difficulty", type: parameter_type_1.ParameterType.difficulty, required: true },
        ],
    },
    {
        name: "difficulty",
        documentation: "Sets the difficulty level.",
        permission_level: 1,
        parameters: [
            { text: "difficulty", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "difficulty", type: parameter_type_1.ParameterType.integer, required: true },
        ],
    },
];
//# sourceMappingURL=difficulty.js.map