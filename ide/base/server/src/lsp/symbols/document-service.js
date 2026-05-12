"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentSymbolService = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const constants_1 = require("../../constants");
const util_1 = require("../../util");
const base_1 = require("../services/base");
const builder_1 = require("./builder");
class DocumentSymbolService extends base_1.BaseService {
    name = 'document-symbols';
    constructor(logger, extension) {
        super(logger.withPrefix('[document-symbols]'), extension);
    }
    onInitialize(capabilities) {
        capabilities.set('documentSymbolProvider', {
            label: 'minecraft',
            workDoneProgress: true,
        });
    }
    setupHandlers(connection) {
        this.addDisposable(connection.onDocumentSymbol(this.onDocumentSymbol.bind(this)));
    }
    async onDocumentSymbol(params, token, workDoneProgress) {
        const builder = new builder_1.SymbolBuilder(undefined, token);
        const data = this.extension.database.ProjectData;
        const uri = util_1.Vscode.fromFs(params.textDocument.uri);
        workDoneProgress.begin('document symbols', 0, '', true);
        const check = (obj) => {
            if (obj.location.uri === uri) {
                builder.add(obj);
            }
        };
        builder.kind = constants_1.Kinds.Symbol.FakeEntity;
        data.general.fakeEntities.forEach(check);
        builder.kind = constants_1.Kinds.Symbol.Objectives;
        data.general.objectives.forEach(check);
        builder.kind = constants_1.Kinds.Symbol.Structure;
        data.general.structures.forEach(check);
        builder.kind = constants_1.Kinds.Symbol.Tag;
        data.general.tags.forEach(check);
        builder.kind = constants_1.Kinds.Symbol.Tickingarea;
        data.general.tickingAreas.forEach(check);
        if (uri.endsWith('.json'))
            return builder.items;
        const filename = (0, util_1.getFilename)(uri);
        if (filename !== '')
            builder.new(filename, vscode_languageserver_1.SymbolKind.Class);
        workDoneProgress.done();
        return builder.items;
    }
}
exports.DocumentSymbolService = DocumentSymbolService;
//# sourceMappingURL=document-service.js.map