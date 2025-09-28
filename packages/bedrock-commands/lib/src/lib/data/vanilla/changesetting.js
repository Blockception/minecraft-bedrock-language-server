"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changesetting = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The changesetting command */
exports.changesetting = [
    {
        name: "changesetting",
        documentation: "Changes a setting on the dedicated server while it's running.",
        permission_level: 4,
        parameters: [
            { text: "changesetting", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "allow-cheats", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: true },
        ],
    },
    {
        name: "changesetting",
        documentation: "Changes a setting on the dedicated server while it's running.",
        permission_level: 4,
        parameters: [
            { text: "changesetting", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "difficulty", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.difficulty, required: true },
        ],
    },
    {
        name: "changesetting",
        documentation: "Changes a setting on the dedicated server while it's running.",
        permission_level: 4,
        parameters: [
            { text: "changesetting", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "difficulty", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.integer, required: true },
        ],
    },
];
//# sourceMappingURL=changesetting.js.map