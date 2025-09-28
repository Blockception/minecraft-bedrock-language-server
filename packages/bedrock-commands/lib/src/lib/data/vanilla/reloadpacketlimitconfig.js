"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reloadpacketlimitconfig = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The reloadpacketlimitconfig command */
exports.reloadpacketlimitconfig = [
    {
        name: "reloadpacketlimitconfig",
        documentation: "Reload packet limit config from file",
        permission_level: 4,
        parameters: [
            { text: "reloadpacketlimitconfig", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
];
//# sourceMappingURL=reloadpacketlimitconfig.js.map