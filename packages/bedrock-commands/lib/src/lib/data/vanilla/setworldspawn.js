"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setworldspawn = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The setworldspawn command */
exports.setworldspawn = [
    {
        name: "setworldspawn",
        documentation: "Sets the world spawn.",
        permission_level: 1,
        parameters: [
            { text: "setworldspawn", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "spawnPoint x", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "spawnPoint y", type: parameter_type_1.ParameterType.coordinate, required: false },
            { text: "spawnPoint z", type: parameter_type_1.ParameterType.coordinate, required: false },
        ],
    },
];
//# sourceMappingURL=setworldspawn.js.map