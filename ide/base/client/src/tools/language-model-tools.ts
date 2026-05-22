import { Commands } from '@blockception/ide-shared';
import * as vscode from 'vscode';
import { ExecuteCommandRequest } from 'vscode-languageclient/node';
import { Manager } from '../manager/manager';

type ToolNames =
  | 'bc-minecraft_getWorkspaceEntities'
  | 'bc-minecraft_getCurrentFileDiagnostics'
  | 'bc-minecraft_scaffoldProjectFiles';

interface WorkspaceEntityResult {
  total: number;
  entities: { id: string; sources: ('behaviorPack' | 'resourcePack')[] }[];
}

interface ScaffoldProjectFilesInput {
  projectId: string;
  projectType: 'world' | 'behaviorPack' | 'resourcePack';
  workspaceUri?: string;
}

interface DiagnosticsInput {
  uri?: string;
}

export function setupLanguageModelTools(context: vscode.ExtensionContext): void {
  if (!('lm' in vscode) || typeof vscode.lm?.registerTool !== 'function') return;

  context.subscriptions.push(
    vscode.lm.registerTool<undefined>('bc-minecraft_getWorkspaceEntities', {
      invoke: async () => getWorkspaceEntities(),
    }),
    vscode.lm.registerTool<DiagnosticsInput>('bc-minecraft_getCurrentFileDiagnostics', {
      invoke: async (options) => getDiagnosticsForUri(options.input),
    }),
    vscode.lm.registerTool<ScaffoldProjectFilesInput>('bc-minecraft_scaffoldProjectFiles', {
      invoke: async (options) => scaffoldProjectFiles(options.input),
    }),
  );
}

function formatToolResult(content: unknown): vscode.LanguageModelToolResult {
  return new vscode.LanguageModelToolResult([new vscode.LanguageModelTextPart(JSON.stringify(content, undefined, 2))]);
}

async function executeServerCommand<T>(command: string, args: any[] = []): Promise<T> {
  if (!Manager.Client) throw new Error('Minecraft language client is not available');
  return Manager.Client.sendRequest(ExecuteCommandRequest.type, {
    command,
    arguments: args,
  }) as Promise<T>;
}

async function getWorkspaceEntities(): Promise<vscode.LanguageModelToolResult> {
  const entities = await executeServerCommand<WorkspaceEntityResult>(Commands.GetWorkspaceEntities);
  return formatToolResult(entities);
}

async function getDiagnosticsForUri(input: DiagnosticsInput = {}): Promise<vscode.LanguageModelToolResult> {
  const uri = resolveUri(input.uri);
  if (!uri) {
    return formatToolResult({
      total: 0,
      diagnostics: [],
      message: 'No active editor or URI was provided.',
    });
  }

  const diagnostics = vscode.languages.getDiagnostics(uri).map((diagnostic) => ({
    severity: vscode.DiagnosticSeverity[diagnostic.severity],
    message: diagnostic.message,
    code: diagnostic.code,
    source: diagnostic.source,
    range: diagnostic.range,
  }));

  return formatToolResult({
    file: uri.toString(),
    total: diagnostics.length,
    diagnostics,
  });
}

async function scaffoldProjectFiles(input: ScaffoldProjectFilesInput): Promise<vscode.LanguageModelToolResult> {
  const command = getScaffoldCommand(input.projectType);
  const workspaceUri = input.workspaceUri || vscode.workspace.workspaceFolders?.[0]?.uri.toString();
  if (!workspaceUri) {
    return formatToolResult({ success: false, message: 'No workspace folder found.' });
  }

  await executeServerCommand(command, [input.projectId, workspaceUri]);
  return formatToolResult({
    success: true,
    projectId: input.projectId,
    projectType: input.projectType,
    workspaceUri,
  });
}

function getScaffoldCommand(projectType: ScaffoldProjectFilesInput['projectType']): string {
  switch (projectType) {
    case 'world':
      return Commands.Create.Project.WorldProject;
    case 'behaviorPack':
      return Commands.Create.Project.Behaviorpack;
    case 'resourcePack':
      return Commands.Create.Project.Resourcepack;
  }
}

function resolveUri(uri?: string): vscode.Uri | undefined {
  if (uri) return vscode.Uri.parse(uri);
  return vscode.window.activeTextEditor?.document.uri;
}

export const LanguageModelToolNames: ToolNames[] = [
  'bc-minecraft_getWorkspaceEntities',
  'bc-minecraft_getCurrentFileDiagnostics',
  'bc-minecraft_scaffoldProjectFiles',
];
