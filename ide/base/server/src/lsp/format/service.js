"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatService = void 0;
const ide_shared_1 = require("@blockception/ide-shared");
const vscode_languageserver_1 = require("vscode-languageserver");
const context_1 = require("../context/context");
const base_1 = require("../services/base");
const language_1 = require("./language");
const mcfunction_1 = require("./mcfunction");
class FormatService extends base_1.BaseService {
    name = 'workspace processor';
    constructor(logger, extension) {
        super(logger.withPrefix('[formatter]'), extension);
    }
    dynamicRegister(register) {
        // Tell the client that this server supports code formatting.
        register.add(vscode_languageserver_1.DocumentFormattingRequest.type, {
            documentSelector: [{ language: ide_shared_1.Languages.McFunctionIdentifier }, { language: ide_shared_1.Languages.McLanguageIdentifier }],
        });
    }
    setupHandlers(connection) {
        this.addDisposable(connection.onDocumentFormatting(this.onDocumentFormatting.bind(this)), connection.onDocumentRangeFormatting(this.onDocumentRangeFormatting.bind(this)));
    }
    async onDocumentFormatting(params, token, workDoneProgress) {
        const document = this.extension.documents.get(params.textDocument.uri);
        if (!document)
            return null;
        const context = context_1.Context.create(this.extension, {
            document,
            token,
            workDoneProgress,
        }, {
            logger: this.logger,
        });
        switch (document.languageId) {
            case ide_shared_1.Languages.McFunctionIdentifier:
                return (0, mcfunction_1.formatMcfunction)(context, params);
            case ide_shared_1.Languages.McLanguageIdentifier:
                return (0, language_1.formatLangauge)(context, params);
            case ide_shared_1.Languages.JsonCIdentifier:
            case ide_shared_1.Languages.JsonIdentifier:
                break;
        }
        return undefined;
    }
    async onDocumentRangeFormatting(params, token, workDoneProgress) {
        const document = this.extension.documents.get(params.textDocument.uri);
        if (!document)
            return undefined;
        const context = context_1.Context.create(this.extension, {
            document,
            token,
            workDoneProgress,
        }, {
            logger: this.logger,
        });
        switch (document.languageId) {
            case ide_shared_1.Languages.McFunctionIdentifier:
                return (0, mcfunction_1.formatMcfunctionRange)(context, params);
            case ide_shared_1.Languages.McLanguageIdentifier:
                return (0, language_1.formatLangaugeRange)(context, params);
            case ide_shared_1.Languages.JsonCIdentifier:
            case ide_shared_1.Languages.JsonIdentifier:
            default:
        }
        return [];
    }
}
exports.FormatService = FormatService;
//# sourceMappingURL=service.js.map