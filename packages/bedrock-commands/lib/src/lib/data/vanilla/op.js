"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.op = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The op command */
exports.op = [
    {
        name: "op",
        documentation: "Grants operator status to a player.",
        permission_level: 2,
        parameters: [
            { text: "op", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
        ],
    },
];
//# sourceMappingURL=op.js.map