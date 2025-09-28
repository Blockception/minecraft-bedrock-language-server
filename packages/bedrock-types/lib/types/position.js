"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Position = void 0;
/** */
var Position;
(function (Position) {
    /**TODO add documentation
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (value && typeof value.line === "number" && typeof value.character === "number")
            return true;
        return false;
    }
    Position.is = is;
    /**TODO add documentation
     *
     * @param line
     * @param character
     * @returns
     */
    function create(line = 0, character = 0) {
        return { line: line, character: character };
    }
    Position.create = create;
    const NewLine = "\n".charCodeAt(0);
    /**Converts the position to an offset
     * @param position
     * @param text
     * @returns
     */
    function toOffset(position, text) {
        if (typeof text === "object")
            return text.offsetAt(position);
        //Line count
        let count = 0;
        //Offset of the last newline found
        let index = 0;
        for (let i = 0; i < text.length; i++) {
            const c = text.charCodeAt(i);
            if (c == NewLine) {
                count++;
                index = i + 1;
                if (count >= position.line) {
                    return index + position.character;
                }
            }
        }
        return position.character;
    }
    Position.toOffset = toOffset;
    /**
     *
     * @param offset
     * @param text
     * @returns
     */
    function toPosition(offset, text) {
        if (typeof text === "object")
            return text.positionAt(offset);
        //Line count
        let count = 0;
        //Offset of the last newline found
        let index = 0;
        for (let I = 0; I < offset; I++) {
            const c = text.charCodeAt(I);
            if (c == NewLine) {
                count++;
                index = I + 1;
            }
        }
        return Position.create(count, offset - index);
    }
    Position.toPosition = toPosition;
})(Position || (exports.Position = Position = {}));
//# sourceMappingURL=position.js.map