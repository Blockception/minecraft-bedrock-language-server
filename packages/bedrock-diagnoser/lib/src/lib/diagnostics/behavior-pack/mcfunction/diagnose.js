"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mcfunction_is_defined = mcfunction_is_defined;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const __1 = require("../..");
function mcfunction_is_defined(value, diagnoser) {
    const id = bc_minecraft_bedrock_project_1.Text.UnQuote(value.text);
    //Project has mcfunction
    const fn = diagnoser.context.getProjectData().behaviors.functions.get(id, diagnoser.project);
    if (fn === undefined) {
        __1.Errors.missing("behaviors", "trading", id, diagnoser, value);
        return false;
    }
    return true;
}
//# sourceMappingURL=diagnose.js.map