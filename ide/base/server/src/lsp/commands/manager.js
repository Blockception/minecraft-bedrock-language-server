"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandManager = void 0;
const ide_shared_1 = require("@blockception/ide-shared");
const diagnose_project_1 = require("./commands/diagnose-project");
const export_pack_1 = require("./commands/export-pack");
const files_1 = require("./commands/files");
const language_1 = require("./commands/language");
const mcproject_1 = require("./commands/mcproject");
const store_project_1 = require("./commands/store-project");
const templates_1 = require("./commands/templates");
const templates_specalized_1 = require("./commands/templates-specalized");
const assert_1 = __importDefault(require("assert"));
class CommandManager {
    _commands;
    constructor() {
        this._commands = new Map();
    }
    commands() {
        return this._commands.entries();
    }
    /**
     * Adds a new command to the service handler
     * @param id The command identifcation vscode uses
     * @param callback The function to call or the ICommand object to use
     * @param register Whenever or not the function must be registered on server side
     * @returns this
     */
    add(id, callback, register) {
        (0, assert_1.default)(this._commands.has(id) === false, `command with ${id} already exists`);
        if (typeof callback === 'function') {
            callback = {
                execute: callback,
                register,
            };
        }
        if (typeof register === 'boolean') {
            callback.register = register;
        }
        this._commands.set(id, callback);
        return this;
    }
    execute(context) {
        const com = this._commands.get(context.command);
        if (com === undefined) {
            context.logger.debug('unknown command');
            return;
        }
        context.workDoneProgress.begin(context.command, 0, 'executing...', true);
        try {
            return com.execute(context);
        }
        catch (error) {
            context.logger.recordError(error);
            context.connection.window.showErrorMessage(`couldn't execute command: ${context.command} with ${JSON.stringify(context.arguments, undefined, 2)}. error: ${JSON.stringify(error, undefined, 2)}`);
        }
        finally {
            context.workDoneProgress.done();
        }
    }
    static load() {
        const manager = new CommandManager();
        manager
            .add(ide_shared_1.Commands.DiagnoseProject, diagnose_project_1.diagnoseProject, true)
            .add(ide_shared_1.Commands.AddLanguageFile, language_1.addAllItems)
            .add(ide_shared_1.Commands.ScanProjects, diagnose_project_1.rescanProject, true)
            .add(ide_shared_1.Commands.StoreProject, store_project_1.storeProject, true)
            .add(ide_shared_1.Commands.Files.Append, files_1.appendToFile, true)
            .add(ide_shared_1.Commands.MCProject.Create, mcproject_1.createMcProject)
            .add(ide_shared_1.Commands.Export.Pack, export_pack_1.exportAsPack)
            .add(ide_shared_1.Commands.Export.Addon, export_pack_1.exportAsAddon);
        (0, templates_specalized_1.setupCreate)(manager);
        (0, templates_1.setupTemplates)(manager);
        return manager;
    }
}
exports.CommandManager = CommandManager;
//# sourceMappingURL=manager.js.map