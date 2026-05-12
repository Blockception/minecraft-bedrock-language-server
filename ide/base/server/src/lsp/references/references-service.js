"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceService = void 0;
const base_1 = require("../services/base");
const function_1 = require("./function");
class ReferenceService extends base_1.BaseService {
    name = 'references';
    constructor(logger, extension) {
        super(logger.withPrefix('[references]'), extension);
    }
    onInitialize(capabilities) {
        capabilities.set('referencesProvider', {
            workDoneProgress: true,
        });
    }
    setupHandlers(connection) {
        this.addDisposable(connection.onReferences(this.onReferences.bind(this)));
    }
    async onReferences(params, token, workDoneProgress) {
        const document = this.extension.documents.get(params.textDocument.uri);
        if (!document)
            return undefined;
        const cursor = document.offsetAt(params.position);
        const w = (0, function_1.getCurrentWord)(document, cursor);
        if (w.text === '') {
            return;
        }
        workDoneProgress.begin('searching references');
        const locations = await this.extension.database.findReference(w.text, this.extension.documents, { defined: true, usage: true }, token, workDoneProgress);
        workDoneProgress.done();
        return locations;
    }
}
exports.ReferenceService = ReferenceService;
//# sourceMappingURL=references-service.js.map