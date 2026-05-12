"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeLensService = void 0;
const context_1 = require("../context/context");
const base_1 = require("../services/base");
const on_request_1 = require("./on-request");
class CodeLensService extends base_1.BaseService {
    name = 'code-lens';
    constructor(logger, extension) {
        super(logger.withPrefix('[code-lens]'), extension);
    }
    onInitialize(capabilities) {
        capabilities.set('codeLensProvider', {
            resolveProvider: true,
            workDoneProgress: true,
        });
    }
    setupHandlers(connection) {
        this.addDisposable(connection.onCodeLens(this.onCodeLens.bind(this)), connection.onCodeLensResolve(this.onCodeLensResolve.bind(this)));
    }
    onCodeLensResolve(code) {
        return code;
    }
    async onCodeLens(params, token, workDoneProgress) {
        if (this.extension.settings.Plugin.CodeLens === false)
            return;
        const document = this.extension.documents.get(params.textDocument.uri);
        if (document === undefined)
            return;
        this.logger.info('checking code lens', params);
        const context = context_1.Context.create(this.extension, {
            document,
            token,
            workDoneProgress,
        }, {
            logger: this.logger,
        });
        return (0, on_request_1.internalRequest)(context, params);
    }
}
exports.CodeLensService = CodeLensService;
//# sourceMappingURL=service.js.map