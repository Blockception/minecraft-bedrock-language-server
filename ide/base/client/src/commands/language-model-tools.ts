import {
  Commands,
  RequestTypes,
  WorkspaceResourceSummary,
  WorkspaceResourceType,
  WorkspaceResourcesRequest,
} from '@blockception/ide-shared';
import * as vscode from 'vscode';
import { ExecuteCommandRequest } from 'vscode-languageclient/node';
import { Manager } from '../manager/manager';

type DiagnosticsToolInput = {
  uri?: string;
};

type EntitiesToolInput = {
  type?: WorkspaceResourceType;
  limit?: number;
};

type ScaffoldToolInput = {
  command: string;
  id?: string;
};

const ToolNames = {
  workspaceEntities: 'blockception.minecraft.workspaceEntities',
  currentFileDiagnostics: 'blockception.minecraft.currentFileDiagnostics',
  scaffoldProjectFiles: 'blockception.minecraft.scaffoldProjectFiles',
} as const;

const AllowedScaffoldCommands = new Set<string>([Commands.MCProject.Create]);

function isLanguageModelToolsSupported(): boolean {
  const lm = (vscode as typeof vscode & { lm?: typeof vscode.lm }).lm;
  return lm !== undefined && typeof lm.registerTool === 'function';
}

function toToolResult(value: unknown): vscode.LanguageModelToolResult {
  return new vscode.LanguageModelToolResult([new vscode.LanguageModelTextPart(JSON.stringify(value, undefined, 2))]);
}

function getTargetUri(uri?: string): vscode.Uri | undefined {
  if (typeof uri === 'string' && uri.trim() !== '') {
    return vscode.Uri.parse(uri);
  }

  return vscode.window.activeTextEditor?.document.uri;
}

function mapSeverity(severity: vscode.DiagnosticSeverity): 'error' | 'warning' | 'information' | 'hint' {
  switch (severity) {
    case vscode.DiagnosticSeverity.Error:
      return 'error';
    case vscode.DiagnosticSeverity.Warning:
      return 'warning';
    case vscode.DiagnosticSeverity.Hint:
      return 'hint';
    default:
      return 'information';
  }
}

function isScaffoldCommand(command: string): boolean {
  return command.startsWith(Commands.Create.Base) || AllowedScaffoldCommands.has(command);
}

export function activate(context: vscode.ExtensionContext): void {
  if (!isLanguageModelToolsSupported()) return;

  context.subscriptions.push(
    vscode.lm.registerTool<EntitiesToolInput>(ToolNames.workspaceEntities, {
      async invoke(options) {
        if (!Manager.Client) {
          return toToolResult({ error: 'Minecraft language client is not available yet.' });
        }

        const type = options.input.type ?? 'entities';
        const entities = await Manager.Client.sendRequest<WorkspaceResourceSummary[]>(
          RequestTypes.WorkspaceEntities,
          { type } as WorkspaceResourcesRequest,
        );
        const limit = Math.max(1, options.input.limit ?? entities.length);
        const items = entities.slice(0, limit);

        return toToolResult({
          type,
          total: entities.length,
          returned: items.length,
          resources: items,
        });
      },
    }),
    vscode.lm.registerTool<DiagnosticsToolInput>(ToolNames.currentFileDiagnostics, {
      async invoke(options) {
        const targetUri = getTargetUri(options.input.uri);
        if (!targetUri) {
          return toToolResult({ error: 'No file URI provided and no active editor found.' });
        }

        const diagnostics = vscode.languages.getDiagnostics(targetUri);

        return toToolResult({
          uri: targetUri.toString(),
          total: diagnostics.length,
          diagnostics: diagnostics.map((diagnostic) => ({
            message: diagnostic.message,
            code: diagnostic.code,
            source: diagnostic.source,
            severity: mapSeverity(diagnostic.severity),
            range: {
              start: {
                line: diagnostic.range.start.line,
                character: diagnostic.range.start.character,
              },
              end: {
                line: diagnostic.range.end.line,
                character: diagnostic.range.end.character,
              },
            },
          })),
        });
      },
    }),
    vscode.lm.registerTool<ScaffoldToolInput>(ToolNames.scaffoldProjectFiles, {
      prepareInvocation(options) {
        return {
          invocationMessage: `Scaffolding files using command \`${options.input.command}\``,
          confirmationMessages: {
            title: 'Scaffold project files',
            message: `Run scaffold command \`${options.input.command}\`${options.input.id ? ` with id \`${options.input.id}\`` : ''}?`,
          },
        };
      },
      async invoke(options) {
        const input = options.input;
        if (typeof input.command !== 'string' || input.command.trim() === '') {
          return toToolResult({ error: 'A scaffold command must be provided.' });
        }

        if (!isScaffoldCommand(input.command)) {
          return toToolResult({
            error: `Command '${input.command}' is not allowed. Use '${Commands.Create.Base}*' or '${Commands.MCProject.Create}'.`,
          });
        }

        if (!Manager.Client) {
          return toToolResult({ error: 'Minecraft language client is not available yet.' });
        }

        const id = typeof input.id === 'string' && input.id.trim() !== '' ? input.id : undefined;
        const activeUri = vscode.window.activeTextEditor?.document.uri.toString();
        const availableCommands = await vscode.commands.getCommands(true);

        if (availableCommands.includes(input.command)) {
          await vscode.commands.executeCommand(input.command, id ?? []);
        } else {
          await Manager.Client.sendRequest(ExecuteCommandRequest.type, {
            command: input.command,
            arguments: id ? [id, activeUri] : [activeUri],
          });
        }

        return toToolResult({
          success: true,
          command: input.command,
          id: input.id,
        });
      },
    }),
  );
}
