"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controlscheme = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The controlscheme command */
exports.controlscheme = [
    {
        name: "controlscheme",
        documentation: "Sets or clears control scheme.",
        permission_level: 1,
        parameters: [
            { text: "controlscheme", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "players", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "clear", type: parameter_type_1.ParameterType.unknown, required: true },
        ],
    },
    {
        name: "controlscheme",
        documentation: "Sets or clears control scheme.",
        permission_level: 1,
        parameters: [
            { text: "controlscheme", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "players", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "set", type: parameter_type_1.ParameterType.unknown, required: true },
            { text: "control scheme", type: parameter_type_1.ParameterType.unknown, required: true },
        ],
    },
];
//# sourceMappingURL=controlscheme.js.map