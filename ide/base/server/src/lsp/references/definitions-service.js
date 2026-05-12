"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefinitionService = void 0;
const base_1 = require("../services/base");
const function_1 = require("./function");
class DefinitionService extends base_1.BaseService {
    name = 'definitions';
    constructor(logger, extension) {
        super(logger.withPrefix('[definitions]'), extension);
    }
    onInitialize(capabilities) {
        capabilities.set('definitionProvider', {
            workDoneProgress: true,
        });
    }
    setupHandlers(connection) {
        this.addDisposable(connection.onDefinition(this.onDefinition.bind(this)));
    }
    async onDefinition(params, token, workDoneProgress) {
        const document = this.extension.documents.get(params.textDocument.uri);
        if (!document)
            return undefined;
        const cursor = document.offsetAt(params.position);
        const w = (0, function_1.getCurrentWord)(document, cursor);
        if (w.text === '') {
            return;
        }
        workDoneProgress.begin('searching references');
        const locations = await this.extension.database.findReference(w.text, this.extension.documents, { defined: true, usage: false }, token, workDoneProgress);
        workDoneProgress.done();
        return locations;
    }
}
exports.DefinitionService = DefinitionService;
//# sourceMappingURL=definitions-service.js.map