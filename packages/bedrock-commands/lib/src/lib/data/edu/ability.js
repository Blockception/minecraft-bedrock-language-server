"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ability = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The ability command */
exports.ability = [
    {
        name: "ability",
        documentation: "Grants or revokes a player ability.",
        permission_level: 1,
        parameters: [{ text: "ability", type: parameter_type_1.ParameterType.keyword, required: true }],
    },
    {
        name: "ability",
        documentation: "Returns a list of abilities assigned to the specified player",
        permission_level: 1,
        parameters: [
            { text: "ability", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
        ],
    },
    {
        name: "ability",
        documentation: "Grants or revokes a player ability to fly",
        permission_level: 1,
        parameters: [
            { text: "ability", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "mayfly", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "ability",
        documentation: "Grants or revokes a player ability to speak",
        permission_level: 1,
        parameters: [
            { text: "ability", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "mute", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "ability",
        documentation: "Grants or revokes a player ability to build",
        permission_level: 1,
        parameters: [
            { text: "ability", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "worldbuilder", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
];
//# sourceMappingURL=ability.js.map