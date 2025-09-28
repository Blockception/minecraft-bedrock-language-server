"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enchant = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The enchant command */
exports.enchant = [
    {
        name: "enchant",
        documentation: "Adds an enchantment to a player's selected item.",
        permission_level: 1,
        parameters: [
            { text: "enchant", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "enchantment id", type: parameter_type_1.ParameterType.integer, required: true },
            { text: "level", type: parameter_type_1.ParameterType.integer, required: false },
        ],
    },
    {
        name: "enchant",
        documentation: "Adds an enchantment to a player's selected item.",
        permission_level: 1,
        parameters: [
            { text: "enchant", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "enchantment name", type: parameter_type_1.ParameterType.enchant, required: true },
            { text: "level", type: parameter_type_1.ParameterType.integer, required: false },
        ],
    },
];
//# sourceMappingURL=enchant.js.map