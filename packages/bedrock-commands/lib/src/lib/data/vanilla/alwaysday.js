"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alwaysday = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The alwaysday command */
exports.alwaysday = [
    {
        name: "alwaysday",
        documentation: "Locks and unlocks the day-night cycle.",
        permission_level: 1,
        parameters: [
            { text: "alwaysday", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "lock", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
];
//# sourceMappingURL=alwaysday.js.map