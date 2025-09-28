"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_data_1 = require("../src/lib/data/command-data");
const parameter_type_1 = require("../src/lib/types/parameter-type");
const fs_1 = require("fs");
describe.skip("Export", () => {
    const { Vanilla, Edu } = command_data_1.CommandData;
    it("exported", () => {
        const out = {
            vanilla: [],
            edu: [],
        };
        Object.getOwnPropertyNames(Vanilla)
            .map((key) => Vanilla[key])
            .map(exportCommands)
            .forEach((commands) => out.vanilla.push(...commands));
        Object.getOwnPropertyNames(Edu)
            .map((key) => Edu[key])
            .map(exportCommands)
            .forEach((commands) => out.edu.push(...commands));
        (0, fs_1.writeFileSync)("./out.json", JSON.stringify(out, null, 2));
    });
});
function exportCommands(data) {
    return data.map(convertCommand);
}
function convertCommand(c) {
    return {
        name: c.name,
        documentation: c.documentation,
        parameters: c.parameters.map(convertParameter),
    };
}
function convertParameter(p) {
    return {
        text: p.text,
        type: getParameterName(p.type),
        required: p.required,
        options: p.options,
    };
}
function getParameterName(p) {
    return parameter_type_1.ParameterType[p];
}
//# sourceMappingURL=export.test.js.map