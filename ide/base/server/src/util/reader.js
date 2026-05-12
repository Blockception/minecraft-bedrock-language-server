"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentReader = void 0;
/**
 *
 */
class DocumentReader {
    /** */
    doc;
    /** */
    index;
    /**
     *
     * @param doc
     */
    constructor(doc) {
        this.doc = doc;
        this.index = 0;
    }
    /** */
    ReadLine() {
        const Line = this.doc.getLine(this.index);
        this.index++;
        return Line;
    }
    /**returns true or false if the reader is at the end*/
    IsDone() {
        return this.index >= this.doc.lineCount;
    }
    /**returns true or false if the reader is not yet at the end*/
    IsReading() {
        return this.index < this.doc.lineCount;
    }
}
exports.DocumentReader = DocumentReader;
//# sourceMappingURL=reader.js.map