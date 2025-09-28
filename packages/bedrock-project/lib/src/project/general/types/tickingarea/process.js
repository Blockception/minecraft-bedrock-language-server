"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.process = process;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const general_info_1 = require("../general-info");
const types_1 = require("../../../../types");
function process(Command, doc) {
    var _a, _b;
    //tickingarea add
    if (((_a = Command.parameters[1]) === null || _a === void 0 ? void 0 : _a.text) !== "add")
        return;
    //tickingarea add circle
    if (((_b = Command.parameters[2]) === null || _b === void 0 ? void 0 : _b.text) === "circle") {
        return ProcessCircleCommand(Command, doc);
    }
    return ProcessBoxCommand(Command, doc);
}
/**
 *
 * @param Command
 * @returns
 */
function ProcessCircleCommand(Command, doc) {
    //Tickingarea add circle <x> <y> <z> <r> [name]
    const parameters = Command.parameters;
    if (parameters.length < 7)
        return;
    let Name = "";
    let offset = 0;
    if (parameters.length > 7) {
        Name = parameters[7].text;
        offset = parameters[7].offset;
    }
    else {
        offset = parameters[3].offset;
    }
    return general_info_1.GeneralInfo.create(Name, bc_minecraft_bedrock_types_1.Types.Location.create(doc.uri, parameters[3].offset), types_1.Documentation.getDoc(doc, () => {
        const Area = `x: ${parameters[3].text}, y: ${parameters[4].text}, z: ${parameters[5].text}, radius: ${parameters[6].text}`;
        return `The circular tickingarea: "${Name}"; ${Area}`;
    }, offset));
}
/**
 *
 * @param Command
 * @returns
 */
function ProcessBoxCommand(Command, doc) {
    //Tickingarea add <x> <y> <z> <x> <y> <z> [name]
    const parameters = Command.parameters;
    if (parameters.length < 8)
        return undefined;
    let Name = "";
    let offset = 0;
    if (parameters.length > 8) {
        Name = parameters[8].text;
        offset = parameters[8].offset;
    }
    else {
        offset = parameters[3].offset;
    }
    return general_info_1.GeneralInfo.create(Name, bc_minecraft_bedrock_types_1.Types.Location.create(doc.uri, parameters[3].offset), types_1.Documentation.getDoc(doc, () => {
        const Area = `[${parameters[2].text}, ${parameters[3].text}, ${parameters[4].text}, ${parameters[5].text}, ${parameters[6].text}, ${parameters[7].text}]`;
        return `The box tickingarea: "${Name}"; ${Area}`;
    }, offset));
}
//# sourceMappingURL=process.js.map