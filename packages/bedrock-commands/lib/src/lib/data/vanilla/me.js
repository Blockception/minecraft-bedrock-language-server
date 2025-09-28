"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The me command */
exports.me = [
    {
        name: "me",
        documentation: "Displays a message about yourself.",
        permission_level: 0,
        parameters: [
            { text: "me", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "message", type: parameter_type_1.ParameterType.message, required: true },
        ],
    },
];
//# sourceMappingURL=me.js.map