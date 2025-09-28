"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The save command */
exports.save = [
    {
        name: "save",
        documentation: "Control or check how the game saves data to disk.",
        permission_level: 4,
        parameters: [
            { text: "save", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "mode", type: parameter_type_1.ParameterType.saveMode, required: true },
        ],
    },
];
//# sourceMappingURL=save.js.map