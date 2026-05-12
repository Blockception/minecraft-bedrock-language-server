"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionContext = void 0;
const capabilities_1 = require("./capabilities");
const settings_1 = require("./settings");
const state_1 = require("./state");
class ExtensionContext {
    capabilities;
    connection;
    config;
    database;
    documents;
    logger;
    services;
    settings;
    state;
    constructor(config, connection, services, logger, documents, database) {
        this.config = config;
        this.capabilities = capabilities_1.ExtensionCapabilities.empty();
        this.connection = connection;
        this.database = database;
        this.documents = documents;
        this.logger = logger;
        this.services = services;
        this.settings = settings_1.Settings.createDefaultSettings();
        this.state = state_1.State.empty();
    }
    parseClientCapabilities(capabilities) {
        capabilities_1.ExtensionCapabilities.parseCapabilities(this.capabilities, capabilities);
    }
}
exports.ExtensionContext = ExtensionContext;
//# sourceMappingURL=context.js.map