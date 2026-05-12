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
exports.InternalDiagnoser = void 0;
const bc_minecraft_bedrock_diagnoser_1 = require("bc-minecraft-bedrock-diagnoser");
const vscode = __importStar(require("vscode-languageserver"));
const util_1 = require("../../util");
function parseDisabledCodes(doc) {
    const result = {
        fileLevel: new Set(),
        lineLevel: new Map(),
    };
    const text = doc.getText();
    // Single regex that matches both file-level and line-level disables
    const disableRegex = /\/\/\s*mc-disable(?:-(next-line))?\s+(.+)/g;
    let match;
    while ((match = disableRegex.exec(text)) !== null) {
        const isNextLine = match[1] !== undefined; // Check if it's mc-disable-next-line
        const codesStr = match[2];
        const codes = codesStr.split(',').map(c => c.trim()).filter(c => c.length > 0);
        if (isNextLine) {
            // Line-level disable: applies to the next line
            const position = doc.positionAt(match.index);
            const targetLine = position.line + 1;
            if (!result.lineLevel.has(targetLine)) {
                result.lineLevel.set(targetLine, new Set());
            }
            codes.forEach(code => result.lineLevel.get(targetLine).add(code));
        }
        else {
            // File-level disable: applies to entire file
            codes.forEach(code => result.fileLevel.add(code));
        }
    }
    return result;
}
class InternalDiagnoser {
    doc;
    items;
    context;
    project;
    done;
    disabledCodes;
    /**@inheritdoc*/
    constructor(doc, project, context, doneFN) {
        this.doc = doc;
        this.items = [];
        this.project = project;
        this.context = context;
        this.done = () => doneFN(this);
        // Parse disabled codes from document
        this.disabledCodes = parseDisabledCodes(doc);
    }
    /**@inheritdoc*/
    add(position, message, severity, code, data) {
        //Was diagnostics code disabled in project settings
        if (this.project.attributes['diagnostic.disable.' + code] === 'true')
            return;
        const codeStr = String(code);
        // Check if code is disabled at file level
        if (this.disabledCodes.fileLevel.has(codeStr))
            return;
        // Optimization: Check if there are any line-level disablements before getting line number
        if (this.disabledCodes.lineLevel.size > 0) {
            const line = (0, util_1.GetPosition)(position, this.doc).line;
            const lineCodes = this.disabledCodes.lineLevel.get(line);
            if (lineCodes && lineCodes.has(codeStr))
                return;
        }
        const error = {
            message: message,
            code: code,
            severity: getSeverity(severity),
            range: (0, util_1.GetRange)(position, this.doc),
            source: 'mc',
            data,
        };
        if (typeof code === 'number') {
            error.codeDescription = {
                href: `https://github.com/Blockception/Minecraft-Error-Codes/blob/main/codes/main.md#${code}`,
            };
        }
        else {
            error.codeDescription = {
                href: `https://github.com/Blockception/Minecraft-Error-Codes/blob/main/${code.replace(/\./gi, '/')}.md`,
            };
        }
        this.items.push(error);
    }
}
exports.InternalDiagnoser = InternalDiagnoser;
/**
 *
 * @param severity
 * @returns
 */
function getSeverity(severity) {
    switch (severity) {
        case bc_minecraft_bedrock_diagnoser_1.DiagnosticSeverity.info:
            return vscode.DiagnosticSeverity.Information;
        case bc_minecraft_bedrock_diagnoser_1.DiagnosticSeverity.none:
            return vscode.DiagnosticSeverity.Hint;
        case bc_minecraft_bedrock_diagnoser_1.DiagnosticSeverity.warning:
            return vscode.DiagnosticSeverity.Warning;
        case bc_minecraft_bedrock_diagnoser_1.DiagnosticSeverity.error:
        default:
            return vscode.DiagnosticSeverity.Error;
    }
}
//# sourceMappingURL=diagnoser.js.map