"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deop = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The deop command */
exports.deop = [
    {
        name: "deop",
        documentation: "Revokes operator status from a player.",
        permission_level: 2,
        parameters: [
            { text: "deop", type: parameter_type_1.ParameterType.keyword, required: true },
            {
                text: "player",
                type: parameter_type_1.ParameterType.selector,
                required: true,
                options: { allowFakePlayers: true, playerOnly: true },
            },
        ],
    },
];
//# sourceMappingURL=deop.js.map