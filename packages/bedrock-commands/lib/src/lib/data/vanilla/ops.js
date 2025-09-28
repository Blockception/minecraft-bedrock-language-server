"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ops = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The ops command */
exports.ops = [
    {
        name: "ops",
        documentation: "Reloads and applies permissions.",
        permission_level: 4,
        parameters: [
            { text: "ops", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "list", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "ops",
        documentation: "Reloads and applies permissions.",
        permission_level: 4,
        parameters: [
            { text: "ops", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "reload", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
];
//# sourceMappingURL=ops.js.map