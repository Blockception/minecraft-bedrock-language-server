"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.daylock = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The daylock command */
exports.daylock = [
    {
        name: "daylock",
        documentation: "Locks and unlocks the day-night cycle.",
        permission_level: 1,
        parameters: [
            { text: "daylock", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "lock", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
];
//# sourceMappingURL=daylock.js.map