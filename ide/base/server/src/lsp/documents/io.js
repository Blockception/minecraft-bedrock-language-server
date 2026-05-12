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
exports.readDocument = readDocument;
const io_1 = require("../../io/io");
const fs = __importStar(require("fs"));
/**
 * Tries to read the file from disk
 * @param uri The vscode uri of the document to retrieve
 * @param logger The logger to report error and information to
 * @returns The contents of the file or undefined when an error occured
 */
function readDocument(uri, logger) {
    try {
        switch (uri.scheme) {
            case 'file':
                return fromFilesystem(uri, logger);
            default:
                throw new Error('unknown uri scheme: ' + uri.toString());
        }
    }
    catch (error) {
        logger.recordError(error, uri.toString());
    }
    return undefined;
}
function fromFilesystem(uri, logger) {
    const path = uri.fsPath;
    if ((0, io_1.exists)(path, logger)) {
        const data = fs.readFileSync(path, 'utf8');
        return data;
    }
    return undefined;
}
//# sourceMappingURL=io.js.map