"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testfor = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The testfor command */
exports.testfor = [
    {
        name: "testfor",
        documentation: "Counts entities (players, mobs, items, etc.) matching specified conditions.",
        permission_level: 1,
        parameters: [
            { text: "testfor", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "victim", type: parameter_type_1.ParameterType.selector, required: true },
        ],
    },
];
//# sourceMappingURL=testfor.js.map