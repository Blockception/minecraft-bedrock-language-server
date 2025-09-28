"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearspawnpoint = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The clearspawnpoint command */
exports.clearspawnpoint = [
    {
        name: "clearspawnpoint",
        documentation: "Removes the spawn point for a player.",
        permission_level: 1,
        parameters: [
            { text: "clearspawnpoint", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: false, options: { playerOnly: true } },
        ],
    },
];
//# sourceMappingURL=clearspawnpoint.js.map