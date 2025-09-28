"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.immutableworld = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The immutableworld command */
exports.immutableworld = [
    {
        name: "immutableworld",
        documentation: "Sets the immutable state of the world",
        permission_level: 1,
        parameters: [
            { text: "immutableworld", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "immutableworld", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
];
//# sourceMappingURL=immutableworld.js.map