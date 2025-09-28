"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_language_document = diagnose_language_document;
exports.minecraft_language_line_diagnose = minecraft_language_line_diagnose;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const types_1 = require("../../types");
function diagnose_language_document(diagnoser, packType) {
    const keys = new Map();
    let lastOffset = 0;
    const text = diagnoser.document.getText();
    const lines = text.split("\n");
    for (let I = 0; I < lines.length; I++) {
        const line = lines[I].trim();
        const offset = text.indexOf(line, lastOffset);
        minecraft_language_line_diagnose(bc_minecraft_bedrock_types_1.Types.OffsetWord.create(line, offset), keys, diagnoser, packType);
        lastOffset = offset + 1;
    }
}
/**
 *
 * @param line
 * @param index The line index
 * @param keys
 * @param diagnoser
 * @returns
 */
function minecraft_language_line_diagnose(line, keys, diagnoser, packType) {
    //Find comment on line
    let text = line.text;
    const commandIndex = text.indexOf("#");
    //If comment has been found
    if (commandIndex >= 0) {
        //Ensuring that comment has started right '##'
        if (text.substring(commandIndex, commandIndex + 2) !== "##") {
            diagnoser.add(line, "A comment is always ##", types_1.DiagnosticSeverity.error, "minecraft.language.comment.invalid");
        }
        //Check if the comment doesn't start at the start of the line
        if (commandIndex > 0) {
            //Comments need to be predicated with a tab if they do not start at the beginning of the line
            if (text.charAt(commandIndex - 1) !== "\t") {
                diagnoser.add(line, "Before a comment must be a tab", types_1.DiagnosticSeverity.error, "minecraft.language.comment.invalid");
            }
        }
        //Remove comment;
        text = text.substring(0, commandIndex).trim();
    }
    //If line is empty
    if (text === "" || text === "\r" || text === "\r\n" || text == "") {
        //If the line was an identend comment, it will leave an empty line
        if (commandIndex > 0) {
            diagnoser.add(line, "A line cannot have an indented comment", types_1.DiagnosticSeverity.error, "minecraft.language.indentation");
        }
        return;
    }
    //Find end of key
    const assignIndex = text.indexOf("=");
    //If no key definition has been found, it means an invalid line has been given
    if (assignIndex < 0) {
        diagnoser.add(line, "A translation item needs a '=' to separate key and value", types_1.DiagnosticSeverity.error, "minecraft.language.separator");
    }
    else {
        const key = text.substring(0, assignIndex);
        const existingKey = keys.get(key);
        //If the key is found in the existing list of keys, then produce an error
        if (existingKey) {
            diagnoser.add(line, "Duplicate key found", types_1.DiagnosticSeverity.error, "minecraft.language.duplicate");
            diagnoser.add(existingKey, "Duplicate key found", types_1.DiagnosticSeverity.error, "minecraft.language.duplicate");
        }
        else {
            keys.set(key, line.offset);
            if (packType == bc_minecraft_bedrock_project_1.PackType.behavior_pack && key != "pack.name" && key != "pack.description")
                diagnoser.add(key, `"key" does not function in the BP and is therefore unnecessary.`, types_1.DiagnosticSeverity.info, "minecraft.language.unnecessary");
        }
        const value = text.substring(assignIndex + 1);
        const offset = line.offset + assignIndex + 1;
        let index;
        if ((index = value.indexOf("\\r")) > -1)
            diagnoser.add(index + offset, "Illegal text, minecraft doesn't accept this unfortunately", types_1.DiagnosticSeverity.error, "minecraft.language.illegal");
        if ((index = value.indexOf("\\t")) > -1)
            diagnoser.add(index + offset, "Illegal text, minecraft doesn't accept this unfortunately", types_1.DiagnosticSeverity.error, "minecraft.language.illegal");
    }
    //The value needs to be something
    if (assignIndex >= text.length) {
        diagnoser.add(line, "A value must be at least length of 1 or more", types_1.DiagnosticSeverity.error, "minecraft.language.value");
    }
}
//# sourceMappingURL=language.js.map