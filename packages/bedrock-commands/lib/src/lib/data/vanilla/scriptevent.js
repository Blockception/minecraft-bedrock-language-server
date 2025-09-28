"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scriptevent = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The scriptevent command */
exports.scriptevent = [
    {
        name: "scriptevent",
        documentation: "Triggers a script event with an ID and message.",
        permission_level: 1,
        parameters: [
            { text: "scriptevent", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "message id", type: parameter_type_1.ParameterType.string, required: true },
            { text: "message", type: parameter_type_1.ParameterType.message, required: true },
        ],
    },
];
//# sourceMappingURL=scriptevent.js.map