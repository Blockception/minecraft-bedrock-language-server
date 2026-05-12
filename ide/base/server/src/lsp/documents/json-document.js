"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonDocument = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const text_document_1 = require("./text-document");
const JSONC = __importStar(require("comment-json"));
/** A class that help */
class JsonDocument extends text_document_1.WrappedTextDocument {
    /**
     *
     */
    object;
    /**
     *
     * @param doc
     */
    constructor(document, extension) {
        super(document, extension);
        this.object = undefined;
    }
    /**
     * Retrieves the json object from the given contents. if failed a null or undefined is returned
     * @returns The object as T or any
     */
    getObject() {
        if (this.object === undefined) {
            try {
                const text = this.getText();
                let object;
                if (text !== '') {
                    object = JSONC.parse(text, undefined, true);
                }
                this.object = object;
                //ValidJson(this.doc);
            }
            catch (error) {
                this.extension().logger.recordError(error, this._document);
            }
        }
        return this.object;
    }
    /**
     * Retrieves the json object from the given contents. if failed a the error is returned
     * @returns The object as T or any
     */
    getObjectError() {
        const err = null;
        if (this.object === undefined) {
            try {
                const text = this.getText();
                const object = JSONC.parse(text);
                this.object = object;
                //ValidJson(this.doc);
            }
            catch (error) {
                this.extension().logger.recordError(error, this._document);
            }
        }
        return { value: this.object, error: err };
    }
    /**
     * Tries to find the range of the given text.
     * @param name The name of the property to find,
     * @param value The value of the property to find
     */
    getRange(name, value) {
        const regx = new RegExp(`"${name}"s*:s*"${value}'"`, 'm');
        return findRangeRegX(this, regx);
    }
    /**
     * Tries to find the rangeOf the given value in the text
     * @param value The value to look for
     * @returns
     */
    rangeOf(value) {
        const text = this.getText();
        const index = text.indexOf(value);
        if (index < 0)
            return undefined;
        return vscode_languageserver_1.Range.create(this.positionAt(index), this.positionAt(index + value.length));
    }
    /**
     * Tries to find the range of the given property
     * @param Name The name of the property to find
     */
    getRangeOfObject(Name) {
        const regx = new RegExp('"' + Name + '"s*:', 'm');
        return findRangeRegX(this, regx);
    }
    /**
     *
     * @param Name
     * @returns
     */
    getStartOfObject(Name) {
        const regx = new RegExp('"' + Name + '"s*:', 'm');
        return findLocationReg(this, regx);
    }
    /**
     *
     * @param value
     * @returns
     */
    getPositionOf(value) {
        const text = this.getText();
        const index = text.indexOf(value);
        if (index >= 0)
            return this.positionAt(index);
        return undefined;
    }
}
exports.JsonDocument = JsonDocument;
/**
 * Searches the document with a given index and returns the index of that match.
 * @param doc The document to search through
 * @param search The regex to search for
 */
function findRangeRegX(doc, search) {
    const text = doc.getText();
    const matches = text.match(search);
    if (matches) {
        let index = 0;
        if (matches.index)
            index = matches.index;
        const startP = doc.positionAt(index);
        const endP = doc.positionAt(index + matches.length);
        return vscode_languageserver_1.Range.create(startP, endP);
    }
    return undefined;
}
/**
 * Searches the document with a given index and returns the index of that match.
 * @param doc The document to search through
 * @param search The regex to search for
 */
function findLocationReg(doc, search) {
    const text = doc.getText();
    const matches = text.match(search);
    if (matches) {
        let index = 0;
        if (matches.index)
            index = matches.index;
        return doc.positionAt(index);
    }
    return undefined;
}
//# sourceMappingURL=json-document.js.map