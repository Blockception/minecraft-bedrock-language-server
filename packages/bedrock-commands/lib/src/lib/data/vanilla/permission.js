"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permission = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The permission command */
exports.permission = [
    {
        name: "permission",
        documentation: "Reloads and applies permissions.",
        permission_level: 4,
        parameters: [
            { text: "permission", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "list", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "permission",
        documentation: "Reloads and applies permissions.",
        permission_level: 4,
        parameters: [
            { text: "permission", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "reload", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
];
//# sourceMappingURL=permission.js.map