"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationService = void 0;
const ide_shared_1 = require("@blockception/ide-shared");
const vscode_languageserver_1 = require("vscode-languageserver");
const mcprojects_1 = require("../../project/mcprojects");
const extension_1 = require("../extension");
const base_1 = require("../services/base");
class ConfigurationService extends base_1.BaseService {
    name = 'configuration';
    constructor(logger, extension) {
        super(logger.withPrefix('[configuration]'), extension);
    }
    setupHandlers(connection) {
        this.addDisposable(connection.onDidChangeConfiguration(this.updateSettings.bind(this)));
    }
    dynamicRegister(register) {
        register.add(vscode_languageserver_1.DidChangeConfigurationNotification.type, {
            section: 'BC-MC',
        });
    }
    async updateSettings(params) {
        this.logger.info('updating settings', params);
        const settings = params?.settings ??
            (await this.extension.connection.workspace.getConfiguration(ide_shared_1.Identification.SettingsConfigurationIdentifier));
        //If settings is nothing then skip it.
        if (settings === undefined || settings === null)
            return;
        if (extension_1.Settings.is(settings)) {
            this.extension.settings = settings;
            //Update existing settings
            const workspace = this.extension.database.WorkspaceData;
            workspace.forEach((value, uri) => {
                workspace.set(uri, (0, mcprojects_1.getProject)(uri, this.extension.settings));
            });
        }
    }
    start() {
        void this.updateSettings();
    }
}
exports.ConfigurationService = ConfigurationService;
//# sourceMappingURL=service.js.map