"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImplementationService = void 0;
const ide_shared_1 = require("@blockception/ide-shared");
const base_1 = require("../services/base");
const function_1 = require("./function");
class ImplementationService extends base_1.BaseService {
    name = 'implementation';
    constructor(logger, extension) {
        super(logger.withPrefix('[implementation]'), extension);
    }
    onInitialize(capabilities) {
        capabilities.set('implementationProvider', {
            documentSelector: [
                { language: ide_shared_1.Languages.JsonCIdentifier },
                { language: ide_shared_1.Languages.JsonIdentifier },
                { language: ide_shared_1.Languages.McFunctionIdentifier },
                { language: ide_shared_1.Languages.McLanguageIdentifier },
                { language: ide_shared_1.Languages.McMolangIdentifier },
                { language: ide_shared_1.Languages.McOtherIdentifier },
                { language: ide_shared_1.Languages.McProjectIdentifier },
            ],
        });
    }
    setupHandlers(connection) {
        this.addDisposable(connection.onImplementation(this.onImplementation.bind(this)));
    }
    async onImplementation(params, token, workDoneProgress) {
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
exports.ImplementationService = ImplementationService;
//# sourceMappingURL=implementation-service.js.map