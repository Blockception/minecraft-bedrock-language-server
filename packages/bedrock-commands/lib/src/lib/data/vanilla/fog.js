"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fog = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The fog command */
exports.fog = [
    {
        name: "fog",
        documentation: "Add or remove fog settings file",
        permission_level: 1,
        parameters: [
            { text: "fog", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "victim", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "pop", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "user provided id", type: parameter_type_1.ParameterType.string, required: true },
        ],
    },
    {
        name: "fog",
        documentation: "Add or remove fog settings file",
        permission_level: 1,
        parameters: [
            { text: "fog", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "victim", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "push", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "fog id", type: parameter_type_1.ParameterType.fog, required: true },
            { text: "user provided id", type: parameter_type_1.ParameterType.string, required: true },
        ],
    },
    {
        name: "fog",
        documentation: "Add or remove fog settings file",
        permission_level: 1,
        parameters: [
            { text: "fog", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "victim", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "remove", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "user provided id", type: parameter_type_1.ParameterType.string, required: true },
        ],
    },
];
//# sourceMappingURL=fog.js.map