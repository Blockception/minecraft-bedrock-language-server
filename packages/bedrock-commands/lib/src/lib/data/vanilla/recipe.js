"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipe = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The recipe command */
exports.recipe = [
    {
        name: "recipe",
        documentation: "Unlocks recipe in the recipe book for a player.",
        permission_level: 1,
        parameters: [
            { text: "recipe", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "give", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "recipe", type: parameter_type_1.ParameterType.recipe, required: true },
        ],
    },
    {
        name: "recipe",
        documentation: "Unlocks recipe in the recipe book for a player.",
        permission_level: 1,
        parameters: [
            { text: "recipe", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "take", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "recipe", type: parameter_type_1.ParameterType.recipe, required: true },
        ],
    },
];
//# sourceMappingURL=recipe.js.map