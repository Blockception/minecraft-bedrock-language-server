"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camerashake = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The camerashake command */
exports.camerashake = [
    {
        name: "camerashake",
        documentation: "Applies shaking to the players' camera with a specified intensity and duration.",
        permission_level: 1,
        parameters: [
            { text: "camerashake", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "add", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: true, options: { playerOnly: true } },
            { text: "intensity", type: parameter_type_1.ParameterType.float, required: false, options: { minimum: 0, maximum: 4 } },
            { text: "seconds", type: parameter_type_1.ParameterType.float, required: false, options: { minimum: 0 } },
            { text: "shake type", type: parameter_type_1.ParameterType.cameraShakeType, required: false },
        ],
    },
    {
        name: "camerashake",
        documentation: "Applies shaking to the players' camera with a specified intensity and duration.",
        permission_level: 1,
        parameters: [
            { text: "camerashake", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "stop", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "player", type: parameter_type_1.ParameterType.selector, required: false, options: { playerOnly: true } },
        ],
    },
];
//# sourceMappingURL=camerashake.js.map