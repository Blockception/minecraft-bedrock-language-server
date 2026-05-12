"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupServer = setupServer;
const node_1 = require("vscode-languageserver/node");
const service_1 = require("../code-action/service");
const service_2 = require("../code-lens/service");
const service_3 = require("../commands/service");
const service_4 = require("../dataset/service");
const service_5 = require("../completion/service");
const service_6 = require("../configuration/service");
const database_1 = require("../database/database");
const service_7 = require("../diagnostics/service");
const manager_1 = require("../documents/manager");
const extension_1 = require("../extension");
const service_8 = require("../format/service");
const logger_1 = require("../logger/logger");
const process_1 = require("../process");
const references_1 = require("../references");
const service_9 = require("../semantics/service");
const capabilities_1 = require("../services/capabilities");
const collection_1 = require("../services/collection");
const service_10 = require("../signatures/service");
const document_service_1 = require("../symbols/document-service");
const workspace_service_1 = require("../symbols/workspace-service");
function setupServer(config) {
    // Create a connection for the server, using Node's IPC as a transport.
    // Also include all preview / proposed LSP features.
    const connection = (0, node_1.createConnection)(node_1.ProposedFeatures.all);
    const logger = new logger_1.ExtendedLogger(connection.console);
    const manager = new collection_1.ServiceManager(logger);
    const extension = new extension_1.ExtensionContext(config, connection, manager, logger, {}, {});
    const documents = new manager_1.DocumentManager(logger, extension);
    const database = new database_1.Database(logger, documents);
    extension.documents = documents;
    extension.database = database;
    const diagnoserService = new service_7.DiagnoserService(logger, extension, documents);
    const documentProcessor = new process_1.DocumentProcessor(logger, extension, diagnoserService);
    const packProcessor = new process_1.PackProcessor(logger, extension, documentProcessor);
    const workspaceProcessor = new process_1.WorkspaceProcessor(logger, extension, packProcessor);
    manager
        // Essentials
        .add(new service_6.ConfigurationService(logger, extension), documents, database)
        // Non Essentials
        .add(diagnoserService, documentProcessor, packProcessor, workspaceProcessor, new service_1.CodeActionService(logger, extension), new service_2.CodeLensService(logger, extension), new service_3.CommandService(logger, extension), new service_4.DataSetService(logger, extension), new service_5.CompletionService(logger, extension), new references_1.DefinitionService(logger, extension), new document_service_1.DocumentSymbolService(logger, extension), new service_8.FormatService(logger, extension), new references_1.ImplementationService(logger, extension), new references_1.ReferenceService(logger, extension), new service_9.SemanticsServer(logger, extension), new service_10.SignatureService(logger, extension), new references_1.TypeDefinitionService(logger, extension), new workspace_service_1.WorkspaceSymbolService(logger, extension));
    logger.info('starting minecraft server');
    //Initialize
    connection.onInitialize((params, token, workDoneProgress) => {
        workDoneProgress.begin('initializing', 0);
        logger.info('Initializing minecraft server', { version: config.version });
        const result = {
            serverInfo: {
                name: 'bc-minecraft-language-server',
                version: config.version,
            },
            capabilities: {},
        };
        const builder = new capabilities_1.CapabilityBuilder(result.capabilities);
        extension.parseClientCapabilities(params.capabilities);
        manager.onInitialize(builder, params, token, workDoneProgress);
        result.capabilities = builder.result();
        workDoneProgress.done();
        return result;
    });
    // This handler provides diagnostics
    connection.onInitialized(async () => {
        logger.info('Initialized minecraft server', { version: config.version });
        manager.setupHandlers(connection);
        //Registers any follow ups
        const register = node_1.BulkRegistration.create();
        manager.dynamicRegister(register);
        await connection.client.register(register);
        return manager.start();
    });
    // On shutdown handler
    connection.onShutdown(() => {
        logger.info('Shutting down server');
        manager.stop();
    });
    connection.onExit(() => {
        logger.info('exiting server');
        manager.dispose();
    });
    // Listen on the connection
    connection.listen();
}
//# sourceMappingURL=setup.js.map