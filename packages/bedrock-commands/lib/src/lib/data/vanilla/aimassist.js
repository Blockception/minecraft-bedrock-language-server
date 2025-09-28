"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aimassist = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The aimassist command */
exports.aimassist = [
    {
        name: "aimassist",
        documentation: "Enable Aim Assist",
        permission_level: 1,
        parameters: [
            { text: "aimassist", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "players", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "clear", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "aimassist",
        documentation: "Enable Aim Assist",
        permission_level: 1,
        parameters: [
            { text: "aimassist", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "players", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "set", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "x angle", type: parameter_type_1.ParameterType.float, required: false, options: { minimum: 10, maximum: 90 } },
            { text: "y angle", type: parameter_type_1.ParameterType.float, required: false, options: { minimum: 10, maximum: 90 } },
            { text: "max distance", type: parameter_type_1.ParameterType.float, required: false, options: { minimum: 1, maximum: 16 } },
            { text: "angle", type: parameter_type_1.ParameterType.keyword, required: false },
            { text: "preset id", type: parameter_type_1.ParameterType.string, required: false },
        ],
    },
    {
        name: "aimassist",
        documentation: "Enable Aim Assist",
        permission_level: 1,
        parameters: [
            { text: "aimassist", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "players", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "set", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "x angle", type: parameter_type_1.ParameterType.float, required: false, options: { minimum: 10, maximum: 90 } },
            { text: "y angle", type: parameter_type_1.ParameterType.float, required: false, options: { minimum: 10, maximum: 90 } },
            { text: "max distance", type: parameter_type_1.ParameterType.float, required: false, options: { minimum: 1, maximum: 16 } },
            { text: "distance", type: parameter_type_1.ParameterType.keyword, required: false },
            { text: "preset id", type: parameter_type_1.ParameterType.string, required: false },
        ],
    },
];
//# sourceMappingURL=aimassist.js.map