"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.give = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The give command */
exports.give = [
    {
        name: "give",
        documentation: "Gives an item to a player.",
        permission_level: 1,
        parameters: [
            { text: "give", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "item name", type: parameter_type_1.ParameterType.item, required: true },
            { text: "amount", type: parameter_type_1.ParameterType.integer, required: false },
            { text: "data", type: parameter_type_1.ParameterType.integer, required: false },
            { text: "components", type: parameter_type_1.ParameterType.jsonItem, required: false },
        ],
    },
];
//# sourceMappingURL=give.js.map