"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandService = void 0;
const context_1 = require("../context/context");
const base_1 = require("../services/base");
const manager_1 = require("./manager");
class CommandService extends base_1.BaseService {
    name = 'commands';
    manager;
    constructor(logger, extension) {
        super(logger.withPrefix('[commands]'), extension);
        this.manager = manager_1.CommandManager.load();
    }
    onInitialize(capabilities) {
        const commandsIds = new Array(...this.manager.commands()).filter(([, v]) => v.register === true).map(([id]) => id);
        capabilities.set('executeCommandProvider', {
            commands: commandsIds,
            workDoneProgress: true,
        });
    }
    setupHandlers(connection) {
        this.addDisposable(connection.onExecuteCommand(this.onCommandRequest.bind(this)));
    }
    onCommandRequest(params, token, workDoneProgress) {
        this.logger.debug('execute command request', params);
        const context = context_1.Context.create(this.extension, {
            token,
            workDoneProgress,
            ...params,
        }, { logger: this.logger.withPrefix(`[${params.command}]`) });
        return this.manager.execute(context);
    }
}
exports.CommandService = CommandService;
//# sourceMappingURL=service.js.map