"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tag = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The tag command */
exports.tag = [
    {
        name: "tag",
        documentation: "Manages tags stored in entities.",
        permission_level: 1,
        parameters: [
            { text: "tag", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "entity", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "add", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "name", type: parameter_type_1.ParameterType.tag, required: true },
        ],
    },
    {
        name: "tag",
        documentation: "Manages tags stored in entities.",
        permission_level: 1,
        parameters: [
            { text: "tag", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "entity", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "list", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "tag",
        documentation: "Manages tags stored in entities.",
        permission_level: 1,
        parameters: [
            { text: "tag", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "entity", type: parameter_type_1.ParameterType.selector, required: true, options: { wildcard: true } },
            { text: "remove", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "name", type: parameter_type_1.ParameterType.tag, required: true },
        ],
    },
];
//# sourceMappingURL=tag.js.map