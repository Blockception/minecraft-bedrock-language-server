"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minecraft_objectives_diagnose = minecraft_objectives_diagnose;
const types_1 = require("../../types");
const definitions_1 = require("../definitions");
function minecraft_objectives_diagnose(value, diagnoser) {
    if (diagnoser.project.attributes["diagnostic.objective"] === "false") {
        return true;
    }
    //Length check
    const id = value.text;
    if (!/^[a-zA-Z0-9\-_.:]+$/gim.test(id)) {
        diagnoser.add(value, `Illegal character found in objective: '${id}'.`, types_1.DiagnosticSeverity.error, "minecraft.objective.invalid");
    }
    //Defined in McProject
    if ((0, definitions_1.check_definition_value)(diagnoser.project.definitions.objective, id, diagnoser)) {
        return true;
    }
    //Project has defined
    const data = diagnoser.context.getProjectData().projectData;
    if (data.general.objectives.has(id)) {
        return true;
    }
    //Nothing then report error
    diagnoser.add(value, `Cannot find objective definition: ${id}`, types_1.DiagnosticSeverity.error, "minecraft.objective.missing");
    return false;
}
//# sourceMappingURL=objective.js.map