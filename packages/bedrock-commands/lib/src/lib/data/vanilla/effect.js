"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.effect = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The effect command */
exports.effect = [
    {
        name: "effect",
        documentation: "Add or remove status effects.",
        permission_level: 1,
        parameters: [
            { text: "effect", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "clear", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "effect", type: parameter_type_1.ParameterType.effect, required: false },
        ],
    },
    {
        name: "effect",
        documentation: "Add or remove status effects.",
        permission_level: 1,
        parameters: [
            { text: "effect", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "effect", type: parameter_type_1.ParameterType.effect, required: true },
            { text: "infinite", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "amplifier", type: parameter_type_1.ParameterType.integer, required: false },
            { text: "hide particles", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "effect",
        documentation: "Add or remove status effects.",
        permission_level: 1,
        parameters: [
            { text: "effect", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "effect", type: parameter_type_1.ParameterType.effect, required: true },
            { text: "seconds", type: parameter_type_1.ParameterType.integer, required: false },
            { text: "amplifier", type: parameter_type_1.ParameterType.integer, required: false },
            { text: "hide particles", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
];
//# sourceMappingURL=effect.js.map