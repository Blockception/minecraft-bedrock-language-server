"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classroommode = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The classroom mode command */
exports.classroommode = [
    {
        name: "classroommode",
        documentation: "Launches and connects the world to the Classroom mode",
        permission_level: 1,
        parameters: [{ text: "classroommode", type: parameter_type_1.ParameterType.keyword, required: true }],
    },
];
//# sourceMappingURL=classroommode.js.map