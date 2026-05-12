"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRange = GetRange;
exports.GetPosition = GetPosition;
exports.resolveJsonPath = resolveJsonPath;
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const character_1 = require("./character");
/**
 *
 * @param position
 * @param doc
 * @returns
 */
function GetRange(position, doc) {
    if (bc_minecraft_bedrock_shared_1.JsonPath.is(position)) {
        return resolveJsonPath(position, doc);
    }
    let Start;
    let End = undefined;
    //If document location is already a position, then grab the offset to start at
    if (bc_minecraft_bedrock_shared_1.Position.is(position)) {
        Start = position;
        position = doc.offsetAt(position);
        //If document location is already an offset, then grab the start position
    }
    else if (bc_minecraft_bedrock_shared_1.OffsetWord.is(position)) {
        Start = doc.positionAt(position.offset);
        End = doc.positionAt(position.text.length + position.offset);
        return { start: Start, end: End };
    }
    else {
        Start = doc.positionAt(position);
    }
    const text = doc.getText();
    for (let I = position + 1; I < text.length; I++) {
        const c = text.charCodeAt(I);
        //If character is a letter or number then keep going until we find something else
        if (character_1.Character.IsLetterCode(c) || character_1.Character.IsNumberCode(c))
            continue;
        //Dashes and underscore are to be respected
        switch (c) {
            case character_1.Character.Character_dash:
            case character_1.Character.Character_underscore:
            case character_1.Character.Character_forwardslash:
            case character_1.Character.Character_column:
                continue;
        }
        //Something has been found that is not considered a "word"
        End = doc.positionAt(I);
        break;
    }
    //If end is still undefined then make atleast one character big
    if (!End) {
        End = { character: Start.character + 1, line: Start.line };
    }
    return { start: Start, end: End };
}
function GetPosition(position, doc) {
    if (bc_minecraft_bedrock_shared_1.Position.is(position))
        return position;
    if (bc_minecraft_bedrock_shared_1.JsonPath.is(position))
        return resolveJsonPath(position, doc).start;
    if (bc_minecraft_bedrock_shared_1.OffsetWord.is(position))
        return doc.positionAt(position.offset);
    return doc.positionAt(position);
}
/**Resolves a json path to a range
 * @param path The json path to resolve
 * @param doc The document that the path is in
 * @returns A range of where the object is*/
function resolveJsonPath(path, doc) {
    const index = path.lastIndexOf('/');
    const length = index > -1 ? path.length - index : path.length;
    let offset;
    const text = doc.getText();
    if (index === -1) {
        const temp = '"' + path + '"';
        offset = text.indexOf(temp);
        if (offset < 0) {
            offset = text.indexOf(path);
        }
        else {
            offset++;
        }
    }
    else {
        offset = text.indexOf(path);
    }
    if (offset < 0) {
        offset = bc_minecraft_bedrock_shared_1.JsonPath.resolve(doc, path);
    }
    const start = doc.positionAt(offset);
    const end = doc.positionAt(offset + length);
    return { start: start, end: end };
}
//# sourceMappingURL=document-location.js.map