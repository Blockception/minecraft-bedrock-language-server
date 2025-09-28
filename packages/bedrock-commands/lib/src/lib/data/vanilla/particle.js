"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.particle = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The particle command */
exports.particle = [
    {
        name: "particle",
        documentation: "Creates a particle emitter",
        permission_level: 1,
        parameters: [
            { text: "particle", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "effect", type: parameter_type_1.ParameterType.particle, required: true },
            { text: "position x", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "position y", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "position z", type: parameter_type_1.ParameterType.coordinate, required: false },
        ],
    },
];
//# sourceMappingURL=particle.js.map