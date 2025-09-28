"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clear = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The clear command */
exports.clear = [
    {
        name: "clear",
        documentation: "Clears items from player inventory.",
        permission_level: 1,
        parameters: [
            { text: "clear", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: false, options: { playerOnly: true } },
            { text: "item name", type: parameter_type_1.ParameterType.item, required: false },
            { text: "data", type: parameter_type_1.ParameterType.integer, required: false },
            { text: "max count", type: parameter_type_1.ParameterType.integer, required: false },
        ],
    },
];
//# sourceMappingURL=clear.js.map