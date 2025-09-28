"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggledownfall = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The toggledownfall command */
exports.toggledownfall = [
    {
        name: "toggledownfall",
        documentation: "Toggles the weather.",
        permission_level: 1,
        parameters: [
            { text: "toggledownfall", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
];
//# sourceMappingURL=toggledownfall.js.map