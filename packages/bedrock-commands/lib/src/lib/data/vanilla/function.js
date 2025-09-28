"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Function = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The function command */
exports.Function = [
    {
        name: "function",
        documentation: "Runs commands found in the corresponding function file.",
        permission_level: 1,
        parameters: [
            { text: "function", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "name", type: parameter_type_1.ParameterType.function, required: true },
        ],
    },
];
//# sourceMappingURL=function.js.map