"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playanimation = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The playanimation command */
exports.playanimation = [
    {
        name: "playanimation",
        documentation: "Makes one or more entities play a one-off animation. Assumes all variables are setup correctly.",
        permission_level: 1,
        parameters: [
            { text: "playanimation", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "entity", type: parameter_type_1.ParameterType.selector, required: true },
            { text: "animation", type: parameter_type_1.ParameterType.animation, required: true },
            { text: "next state", type: parameter_type_1.ParameterType.string, required: false },
            { text: "blend out time", type: parameter_type_1.ParameterType.float, required: false },
            { text: "stop expression", type: parameter_type_1.ParameterType.string, required: false },
            { text: "controller", type: parameter_type_1.ParameterType.string, required: false },
        ],
    },
];
//# sourceMappingURL=playanimation.js.map