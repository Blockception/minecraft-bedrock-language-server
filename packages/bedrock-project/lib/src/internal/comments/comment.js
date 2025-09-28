"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetComment = GetComment;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
function GetComment(doc, lineIndex) {
    const line = doc.getText(bc_minecraft_bedrock_types_1.Types.Range.createR(lineIndex, 0, lineIndex, Number.MAX_SAFE_INTEGER));
    const Index = line.indexOf("#");
    if (Index < 0)
        return "";
    return line.slice(Index + 1, line.length);
}
//# sourceMappingURL=comment.js.map