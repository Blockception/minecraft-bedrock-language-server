// Browser-specific server setup — uses vscode-languageserver/browser
// instead of vscode-languageserver/node.
import {
  BrowserMessageReader,
  BrowserMessageWriter,
  createConnection,
  ProposedFeatures,
  InitializeResult,
  BulkRegistration,
} from 'vscode-languageserver/browser';

import { CodeActionService } from '../code-action/service';
import { CodeLensService } from '../code-lens/service';
import { CommandService } from '../commands/service';
import { DataSetService } from '../dataset/service';
import { CompletionService } from '../completion/service';
import { ConfigurationService } from '../configuration/service';
import { Database } from '../database/database';
import { DiagnoserService } from '../diagnostics/service';
import { DocumentManager, IDocumentManager } from '../documents/manager';
import { ExtensionContext } from '../extension';
import { FormatService } from '../format/service';
import { ExtendedLogger } from '../logger/logger';
import { DocumentProcessor, PackProcessor, WorkspaceProcessor } from '../process';
import { DefinitionService, ImplementationService, ReferenceService, TypeDefinitionService } from '../references';
import { SemanticsServer } from '../semantics/service';
import { CapabilityBuilder } from '../services/capabilities';
import { ServiceManager } from '../services/collection';
import { SignatureService } from '../signatures/service';
import { DocumentSymbolService } from '../symbols/document-service';
import { WorkspaceSymbolService } from '../symbols/workspace-service';
import { LSPConfig } from '../config/config';

export function setupServerBrowser(config: LSPConfig) {
  // self is the DedicatedWorkerGlobalScope inside the Web Worker
  const messageReader = new BrowserMessageReader(self as DedicatedWorkerGlobalScope);
  const messageWriter = new BrowserMessageWriter(self as DedicatedWorkerGlobalScope);

  const connection = createConnection(ProposedFeatures.all, messageReader, messageWriter);

  const logger = new ExtendedLogger(connection.console);
  const manager = new ServiceManager(logger);
  const extension = new ExtensionContext(config, connection, manager, logger, {} as IDocumentManager, {} as Database);
  const documents = new DocumentManager(logger, extension);
  const database = new Database(logger, documents);
  extension.documents = documents;
  extension.database = database;

  const diagnoserService = new DiagnoserService(logger, extension, documents);
  const documentProcessor = new DocumentProcessor(logger, extension, diagnoserService);
  const packProcessor = new PackProcessor(logger, extension, documentProcessor);
  const workspaceProcessor = new WorkspaceProcessor(logger, extension, packProcessor);

  manager
    .add(new ConfigurationService(logger, extension), documents, database)
    .add(
      diagnoserService,
      documentProcessor,
      packProcessor,
      workspaceProcessor,
      new CodeActionService(logger, extension),
      new CodeLensService(logger, extension),
      new CommandService(logger, extension),
      new DataSetService(logger, extension),
      new CompletionService(logger, extension),
      new DefinitionService(logger, extension),
      new DocumentSymbolService(logger, extension),
      new FormatService(logger, extension),
      new ImplementationService(logger, extension),
      new ReferenceService(logger, extension),
      new SemanticsServer(logger, extension),
      new SignatureService(logger, extension),
      new TypeDefinitionService(logger, extension),
      new WorkspaceSymbolService(logger, extension),
    );

  logger.info('starting minecraft server (browser)');

  connection.onInitialize((params, token, workDoneProgress) => {
    workDoneProgress.begin('initializing', 0);
    logger.info('Initializing minecraft server (browser)', { version: config.version });
    const result: InitializeResult = {
      serverInfo: { name: 'bc-minecraft-language-server', version: config.version },
      capabilities: {},
    };
    const builder = new CapabilityBuilder(result.capabilities);
    extension.parseClientCapabilities(params.capabilities);
    manager.onInitialize(builder, params, token, workDoneProgress);
    result.capabilities = builder.result();
    workDoneProgress.done();
    return result;
  });

  connection.onInitialized(async () => {
    logger.info('Initialized minecraft server (browser)', { version: config.version });
    manager.setupHandlers(connection);
    const register = BulkRegistration.create();
    manager.dynamicRegister(register);
    await connection.client.register(register);
    return manager.start();
  });

  connection.onShutdown(() => {
    logger.info('Shutting down server (browser)');
    manager.stop();
  });

  connection.onExit(() => {
    logger.info('exiting server (browser)');
    manager.dispose();
  });

  connection.listen();
}
