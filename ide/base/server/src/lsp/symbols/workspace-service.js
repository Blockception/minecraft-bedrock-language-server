"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceSymbolService = void 0;
const constants_1 = require("../../constants");
const base_1 = require("../services/base");
const builder_1 = require("./builder");
const functions_1 = require("./functions");
class WorkspaceSymbolService extends base_1.BaseService {
    name = 'workspace-symbols';
    constructor(logger, extension) {
        super(logger.withPrefix('[workspace-symbols]'), extension);
    }
    onInitialize(capabilities) {
        capabilities.set('workspaceSymbolProvider', {
            resolveProvider: true,
            workDoneProgress: true,
        });
    }
    setupHandlers(connection) {
        this.addDisposable(connection.onWorkspaceSymbol(this.onWorkspaceSymbol.bind(this)));
    }
    async onWorkspaceSymbol(params, token, workDoneProgress) {
        const builder = new builder_1.SymbolBuilder(params.query, token);
        const data = this.extension.database.ProjectData;
        workDoneProgress.begin('workspace symbols', 0, '', true);
        //General items
        builder.containerName = 'minecraft';
        builder.generate(data.general.fakeEntities, constants_1.Kinds.Symbol.FakeEntity);
        builder.generate(data.general.objectives, constants_1.Kinds.Symbol.Objectives);
        builder.generate(data.general.structures, constants_1.Kinds.Symbol.Structure);
        builder.generate(data.general.tags, constants_1.Kinds.Symbol.Tag);
        builder.generate(data.general.tickingAreas, constants_1.Kinds.Symbol.Tickingarea);
        data.resourcePacks.packs.forEach((p) => (0, functions_1.convertResourcePack)(p, builder));
        data.behaviorPacks.packs.forEach((p) => (0, functions_1.convertBehaviorPacks)(p, builder));
        workDoneProgress.done();
        return builder.items;
    }
}
exports.WorkspaceSymbolService = WorkspaceSymbolService;
//# sourceMappingURL=workspace-service.js.map