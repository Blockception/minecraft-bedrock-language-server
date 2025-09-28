"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minecraft_tag_diagnose = minecraft_tag_diagnose;
const types_1 = require("../../types");
const definitions_1 = require("../definitions");
function minecraft_tag_diagnose(value, diagnoser) {
    if (diagnoser.project.attributes["diagnostic.tags"] === "false") {
        return true;
    }
    const id = typeof value === "string" ? value : value.text;
    //Empty tags are valid as they are used to represent either no items or any items
    if (id === "") {
        return true;
    }
    if (!/^[a-zA-Z0-9\-_.]+$/gim.test(id)) {
        diagnoser.add(value, `Illegal character found in tag: ${id}`, types_1.DiagnosticSeverity.error, "minecraft.tag.invalid");
    }
    //Defined in McProject
    if ((0, definitions_1.check_definition_value)(diagnoser.project.definitions.tag, id, diagnoser)) {
        return true;
    }
    const data = diagnoser.context.getProjectData().projectData;
    //Project has defined
    if (data.general.tags.has(id)) {
        return true;
    }
    //Nothing then report error
    diagnoser.add(value, `Cannot find tag definition: ${id}`, types_1.DiagnosticSeverity.error, "minecraft.tag.missing");
    return false;
}
//# sourceMappingURL=tag.js.map