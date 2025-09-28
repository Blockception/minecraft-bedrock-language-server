"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.damage = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The damage command */
exports.damage = [
    {
        name: "damage",
        documentation: "Apply damage to the specified entities.",
        permission_level: 1,
        parameters: [
            { text: "damage", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "amount", type: parameter_type_1.ParameterType.integer, required: true },
            { text: "cause", type: parameter_type_1.ParameterType.causeType, required: false },
        ],
    },
    {
        name: "damage",
        documentation: "Apply damage to the specified entities.",
        permission_level: 1,
        parameters: [
            { text: "damage", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "target", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "amount", type: parameter_type_1.ParameterType.integer, required: true },
            { text: "cause", type: parameter_type_1.ParameterType.causeType, required: true },
            { text: "entity", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "damager", type: parameter_type_1.ParameterType.selector, required: true },
        ],
    },
];
//# sourceMappingURL=damage.js.map