"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.process = process;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const types_1 = require("../../../../types");
const general_info_1 = require("../general-info");
function process(command, doc, receiver) {
    if (command.parameters.length < 3) {
        return;
    }
    const Mode = command.parameters[1];
    switch (Mode.text) {
        case "players":
            receiver.fakeEntities.set(CheckPlayer(command, doc));
            return;
        case "objectives":
            receiver.objectives.set(CheckObjective(command, doc));
            return;
    }
    return undefined;
}
/**
 *
 * @param Com
 * @param Comment
 * @returns
 */
function CheckObjective(Com, doc) {
    const objectiveMode = Com.parameters[2];
    if (Com.parameters.length < 4) {
        return;
    }
    if (objectiveMode.text === "add") {
        const ID = Com.parameters[3];
        const Type = Com.parameters[4];
        const offset = ID.offset;
        return general_info_1.GeneralInfo.create(ID.text, bc_minecraft_bedrock_types_1.Types.Location.create(doc.uri, offset), types_1.Documentation.getDoc(doc, () => {
            let Doc = `The objective: ${ID.text}: ${Type.text}`;
            if (Com.parameters.length > 5) {
                Doc += " " + Com.parameters[5].text.replace(/"/g, "");
            }
            return Doc;
        }, offset));
    }
    return undefined;
}
function CheckPlayer(Com, doc) {
    if (Com.parameters.length > 3) {
        const Selector = Com.parameters[3];
        if (!Selector.text.startsWith("@") && Selector.text !== "*") {
            return general_info_1.GeneralInfo.create(Selector.text, bc_minecraft_bedrock_types_1.Types.Location.create(doc.uri, Selector.offset), types_1.Documentation.getDoc(doc, () => `The fake player: ${Selector.text}`, Selector.offset));
        }
    }
    return undefined;
}
//# sourceMappingURL=process.js.map