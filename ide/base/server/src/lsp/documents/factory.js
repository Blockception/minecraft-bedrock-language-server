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
exports.TextDocumentFactory = void 0;
const base_1 = require("../services/base");
const text_document_1 = require("./text-document");
const vscode = __importStar(require("vscode-languageserver-textdocument"));
class TextDocumentFactory extends base_1.BaseService {
    name = 'textdocument factory';
    constructor(logger, extension) {
        super(logger.withPrefix('[textdocument factory]'), extension);
    }
    /**
     * Extends the vscode document into an internal format.
     * @param doc The document to enhance
     * @returns A upgraded version
     */
    extend(doc) {
        if (doc instanceof text_document_1.WrappedTextDocument) {
            return doc;
        }
        return new text_document_1.WrappedTextDocument(doc, this.extension);
    }
    /** @inheritdoc */
    create(uri, languageId, version, content) {
        return this.extend(vscode.TextDocument.create(uri, languageId, version, content));
    }
    /** @inheritdoc */
    update(document, changes, version) {
        if (document instanceof text_document_1.WrappedTextDocument) {
            return this.extend(vscode.TextDocument.update(document.base, changes, version));
        }
        return this.extend(vscode.TextDocument.update(document, changes, version));
    }
}
exports.TextDocumentFactory = TextDocumentFactory;
//# sourceMappingURL=factory.js.map