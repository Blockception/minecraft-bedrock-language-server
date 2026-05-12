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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateProcessor = void 0;
const file_builder_1 = require("../files/file-builder");
const util_1 = require("../util");
const functions_1 = require("./functions");
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
const io_1 = require("../io/io");
class TemplateProcessor {
    _filename;
    _content;
    _context;
    processor;
    constructor(context, filename, content, templateId, folder, attributes) {
        this._content = content;
        this._context = context;
        this._filename = filename;
        const fcontext = {
            filename: filename,
            folder: folder,
            attributes: attributes,
            pack: this._context.database.ProjectData.get(folder)?.folder || '',
            templateID: templateId,
        };
        this.processor = new functions_1.TemplateFunctions(context.config.version, fcontext, context);
    }
    /**
     *
     * @returns
     */
    async createFile() {
        const fileBuilder = new file_builder_1.FileBuilder(this._context.connection, this._context.logger);
        const filepath = util_1.Vscode.join(this.processor._fcontent.folder, this._filename);
        fileBuilder.create(filepath, this._content);
        return fileBuilder.send();
    }
    process() {
        this._filename = this.processor.process(this._filename);
        this._content = this.processor.process(this._content);
    }
}
exports.TemplateProcessor = TemplateProcessor;
const errorFallback = {
    filename: () => {
        throw new Error('No fallback filename provided');
    },
    content: () => {
        throw new Error('No fallback content provided');
    },
};
/**
 *
 */
(function (TemplateProcessor) {
    /**
     *
     * @param template
     * @param folder
     * @param fallback
     * @returns
     */
    function create(context, template, folder, attributes = {}, fallback) {
        fallback = fallback || errorFallback;
        const ws = context.database.WorkspaceData.getFolder(folder);
        if (ws === undefined) {
            throw new Error('No workspace found');
        }
        const project = context.database.WorkspaceData.getProject(ws, context.settings);
        const attr = template.replace('-', '.');
        const filename = project.attributes[`template.${attr}.filename`] || fallback.filename();
        const file = project.attributes[`template.${attr}.file`];
        let content = undefined;
        if (file) {
            const filepath = path_1.default.resolve(util_1.Fs.FromVscode(ws), file);
            if ((0, io_1.exists)(filepath, context.logger)) {
                content = fs.readFileSync(file, 'utf8');
            }
        }
        if (content === undefined || content === '') {
            content = fallback.content();
        }
        return new TemplateProcessor(context, filename, content, template, folder, attributes);
    }
    TemplateProcessor.create = create;
})(TemplateProcessor || (exports.TemplateProcessor = TemplateProcessor = {}));
//# sourceMappingURL=processor.js.map