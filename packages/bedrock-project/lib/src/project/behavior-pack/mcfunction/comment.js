"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetComment = GetComment;
function GetComment(line) {
    const Index = line.indexOf("#");
    if (Index < 0)
        return "";
    return line.slice(Index + 1, line.length);
}
//# sourceMappingURL=comment.js.map