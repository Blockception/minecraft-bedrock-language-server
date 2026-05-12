"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompletionService = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const constants_1 = require("../../constants");
const util_1 = require("../../util");
const context_1 = require("../context/context");
const base_1 = require("../services/base");
const builder_1 = require("./builder/builder");
const on_request_1 = require("./on-request");
const triggerCharacters = ' abcdefghijklmnopqrstuvwxyz[]{}:.@=+-*/\\|!#$%^&*()<>?,\'"'.split('');
class CompletionService extends base_1.BaseService {
    name = 'completion';
    constructor(logger, extension) {
        super(logger.withPrefix('[completion]'), extension);
    }
    onInitialize(capabilities) {
        this.extension.capabilities.server.completion = true;
        capabilities.addCompletion({
            resolveProvider: false,
            triggerCharacters: triggerCharacters,
        });
    }
    setupHandlers(connection) {
        this.addDisposable(connection.onCompletion(this.onCompletion.bind(this)), connection.onCompletionResolve(this.onCompletionResolve.bind(this)));
    }
    onCompletionResolve(params) {
        return params;
    }
    onCompletion(params, token, workDoneProgress) {
        const filename = (0, util_1.getFilename)(params.textDocument.uri);
        try {
            const document = this.extension.documents.get(params.textDocument.uri);
            const pos = params.position;
            if (document === undefined)
                return;
            this.logger.debug(`starting on: ${filename}`, params);
            workDoneProgress.begin(`completion ${filename}`, 0, undefined, true);
            const context = context_1.Context.create(this.extension, {
                document,
                token,
                workDoneProgress,
                cursor: document.offsetAt(pos),
                builder: (0, builder_1.createBuilder)(token, workDoneProgress),
                ...params,
            }, { logger: this.logger });
            (0, on_request_1.onCompletionRequest)(context);
            return {
                isIncomplete: false,
                items: removeDuplicate(context.builder.getItems()),
            };
        }
        catch (err) {
            const code = constants_1.ErrorCodes.CompletionService + (err.code ?? 0);
            // Somehow just stringifying the error returns an empty object, so I make sure message and stack are always there
            return new vscode_languageserver_1.ResponseError(code, `error on ${filename}, error: ` +
                JSON.stringify({ ...err, message: err.message, stack: err.stack }, undefined, 2));
        }
        finally {
            this.logger.debug(`exiting on: ${filename}`);
            workDoneProgress.done();
        }
    }
}
exports.CompletionService = CompletionService;
function removeDuplicate(items) {
    const Length = items.length;
    const out = [];
    for (let I = 0; I < Length; I++) {
        const current = items[I];
        if (!hasItem(out, current)) {
            out.push(current);
        }
    }
    return out;
}
function hasItem(items, item) {
    const label = item.label;
    for (let I = 0; I < items.length; I++) {
        if (label == items[I].label)
            return true;
    }
    return false;
}
//# sourceMappingURL=service.js.map