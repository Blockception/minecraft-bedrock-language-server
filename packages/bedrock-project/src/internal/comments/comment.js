"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetComment = GetComment;
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const comment_1 = require("../../project/behavior-pack/mcfunction/comment");
function GetComment(doc, lineIndex) {
    const line = doc.getText(bc_minecraft_bedrock_shared_1.Range.createR(lineIndex, 0, lineIndex, Number.MAX_SAFE_INTEGER));
    const index = (0, comment_1.findMcfunctionCommentStart)(line);
    if (index < 0)
        return '';
    return line.slice(index + 1);
}
//# sourceMappingURL=comment.js.map