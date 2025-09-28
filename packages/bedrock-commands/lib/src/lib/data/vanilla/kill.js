"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kill = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The kill command */
exports.kill = [
    {
        name: "kill",
        documentation: "Kills entities (players, mobs, etc.).",
        permission_level: 1,
        parameters: [
            { text: "kill", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: false },
        ],
    },
];
//# sourceMappingURL=kill.js.map