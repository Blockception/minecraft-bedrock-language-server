"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrappedTextDocument = void 0;
const util_1 = require("../../util");
class WrappedTextDocument {
    _document;
    /**A hidden field that helps with storing the cache */
    _pack;
    _extension;
    constructor(document, extension) {
        this._document = document;
        this._extension = extension;
    }
    get base() {
        return this._document;
    }
    /** @inheritdoc */
    get uri() {
        return this._document.uri;
    }
    /** @inheritdoc */
    get languageId() {
        return this._document.languageId;
    }
    /** @inheritdoc */
    get version() {
        return this._document.version;
    }
    /** @inheritdoc */
    get lineCount() {
        return this._document.lineCount;
    }
    /** @inheritdoc */
    getText(range) {
        return this._document.getText(range);
    }
    /** @inheritdoc */
    positionAt(offset) {
        return this._document.positionAt(offset);
    }
    /** @inheritdoc */
    offsetAt(position) {
        return this._document.offsetAt(position);
    }
    /** @inheritdoc */
    pack() {
        if (this._pack)
            return this._pack;
        return (this._pack = this._extension.database.ProjectData.get(this.uri));
    }
    /** @inheritdoc */
    configuration() {
        return (this.pack()?.context ?? this._extension.database.WorkspaceData.getProject(this.uri, this._extension.settings));
    }
    /** @inheritdoc */
    filename() {
        return (0, util_1.getFilename)(this.uri);
    }
    /** @inheritdoc */
    extension() {
        return this._extension;
    }
    /** @inheritdoc */
    getLine(lineIndex) {
        return this.getText({
            start: { line: lineIndex, character: 0 },
            end: { line: lineIndex, character: Number.MAX_VALUE },
        });
    }
}
exports.WrappedTextDocument = WrappedTextDocument;
//# sourceMappingURL=text-document.js.map