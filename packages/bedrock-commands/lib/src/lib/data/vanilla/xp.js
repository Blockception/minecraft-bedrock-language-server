"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xp = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The xp command */
exports.xp = [
    {
        name: "xp",
        documentation: "Adds or removes player experience.",
        permission_level: 1,
        parameters: [
            { text: "xp", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "amount", type: parameter_type_1.ParameterType.integer, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: false, options: { playerOnly: true } },
        ],
    },
    {
        name: "xp",
        documentation: "Adds or removes player experience.",
        permission_level: 1,
        parameters: [
            { text: "xp", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "amount", type: parameter_type_1.ParameterType.xp, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: false, options: { playerOnly: true } },
        ],
    },
];
//# sourceMappingURL=xp.js.map