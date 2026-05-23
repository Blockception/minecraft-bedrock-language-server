import * as vscode from 'vscode';
import { setupClient, Manager, setupCommands } from 'bc-minecraft-lsp-client';

const BedrockParticipantId = 'blockception.bedrock';

interface BedrockChatResult extends vscode.ChatResult {
  metadata: {
    command: string;
  };
}

export function activate(context: vscode.ExtensionContext): void {
  setupCommands(context);
  setupClient(context);
  setupBedrockChatParticipant(context);
}

//shutdown server
export function deactivate(): Thenable<void> | undefined {
  console.log('stopping minecraft language client');

  if (!Manager.Client) {
    return undefined;
  }

  return Manager.Client.stop();
}

function setupBedrockChatParticipant(context: vscode.ExtensionContext): void {
  const participant = vscode.chat.createChatParticipant(BedrockParticipantId, handleBedrockChatRequest);
  participant.iconPath = vscode.Uri.joinPath(context.extensionUri, 'resources', 'logo.png');
  context.subscriptions.push(participant);
}

async function handleBedrockChatRequest(
  request: vscode.ChatRequest,
  _context: vscode.ChatContext,
  response: vscode.ChatResponseStream,
  token: vscode.CancellationToken,
): Promise<BedrockChatResult> {
  const command = request.command ?? 'explain';
  const workspaceContext = getWorkspaceContext();

  const messages = [
    vscode.LanguageModelChatMessage.User(getBedrockSystemPrompt(command, workspaceContext)),
    vscode.LanguageModelChatMessage.User(request.prompt),
  ];

  try {
    const chatResponse = await request.model.sendRequest(messages, {}, token);

    for await (const fragment of chatResponse.text) {
      response.markdown(fragment);
    }
  } catch (error) {
    if (error instanceof vscode.LanguageModelError) {
      response.markdown(
        `I couldn't reach the configured Copilot model (${error.code}). Please verify Copilot Chat is available and try again.`,
      );
    } else {
      throw error;
    }
  }

  return { metadata: { command } };
}

function getWorkspaceContext(): string {
  const folders = vscode.workspace.workspaceFolders ?? [];
  if (folders.length === 0) {
    return 'No workspace folder is open.';
  }

  const folderList = folders.map((folder) => `- ${folder.name} (${folder.uri.fsPath})`).join('\n');
  return `Workspace folders:\n${folderList}`;
}

function getBedrockSystemPrompt(command: string, workspaceContext: string): string {
  const commandIntent = {
    explain:
      'Explain concepts clearly for Minecraft Bedrock Edition creators and include at least one practical JSON or `.mcfunction` snippet.',
    diagnose:
      'Diagnose likely causes, list concrete checks, and give a minimal fix patch in JSON or `.mcfunction` where possible.',
    scaffold:
      'Provide starter scaffolding with valid Bedrock file/folder layout plus concrete JSON and `.mcfunction` templates.',
  }[command] ??
    'Provide practical Bedrock development guidance with concrete examples.';

  return [
    'You are @bedrock, a Minecraft Bedrock Edition expert assistant for this Blockception extension.',
    commandIntent,
    'Always stay focused on Bedrock behavior packs, resource packs, entities, items, blocks, animations, Molang, and mcfunction scripting.',
    'Prefer concise, actionable steps and valid examples that match modern Bedrock formats.',
    'When useful, suggest file paths relative to the project and mention pack-scoped impacts.',
    workspaceContext,
  ].join('\n');
}
