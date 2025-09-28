"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setmaxplayers = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The setmaxplayers command */
exports.setmaxplayers = [
    {
        name: "setmaxplayers",
        documentation: "Sets the maximum number of players for this game session.",
        permission_level: 3,
        parameters: [
            { text: "setmaxplayers", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "maxPlayers", type: parameter_type_1.ParameterType.integer, required: true, options: { minimum: 1 } },
        ],
    },
];
//# sourceMappingURL=setmaxplayers.js.map