import * as path from 'path';
import * as vscode from 'vscode';

const ChatVariableName = 'bedrockContext';
const ExcludePattern = '**/{node_modules,.git,dist,coverage,.minecraft}/**';
const MaxListValues = 500;

type WorkspaceFolderLike = Pick<vscode.WorkspaceFolder, 'name'>;
type WorkspaceFileSystemLike = Pick<vscode.FileSystem, 'readFile'>;
type WorkspaceLike = Pick<typeof vscode.workspace, 'findFiles'> & {
  readonly fs: WorkspaceFileSystemLike;
  readonly workspaceFolders?: readonly WorkspaceFolderLike[];
};

interface ChatVariableResolver {
  variable: string;
  resolve(name: string, context: unknown, token: vscode.CancellationToken): vscode.ProviderResult<string | undefined>;
}

interface ChatApi {
  registerChatVariableResolver(resolver: ChatVariableResolver): vscode.Disposable;
}

interface BedrockContextData {
  workspaceFolders: string[];
  packNames: string[];
  namespaces: string[];
  entities: string[];
  blocks: string[];
  items: string[];
}

export function setupChatVariables(context: vscode.ExtensionContext): void {
  const chat = (vscode as typeof vscode & { chat?: ChatApi }).chat;
  if (!chat) return;

  context.subscriptions.push(
    chat.registerChatVariableResolver({
      variable: ChatVariableName,
      resolve: async () => resolveBedrockContext(vscode.workspace),
    }),
  );
}

export async function resolveBedrockContext(workspace: WorkspaceLike): Promise<string> {
  const [
    manifestUris,
    attributeUris,
    entityUris,
    blockUris,
    itemUris,
  ] = await Promise.all([
    workspace.findFiles('**/manifest.json', ExcludePattern),
    workspace.findFiles('**/.mcattributes', ExcludePattern),
    workspace.findFiles('**/entities/**/*.json', ExcludePattern),
    workspace.findFiles('**/blocks/**/*.json', ExcludePattern),
    workspace.findFiles('**/items/**/*.json', ExcludePattern),
  ]);

  const [packNames, namespaces, entities, blocks, items] = await Promise.all([
    readPackNames(manifestUris, workspace.fs),
    readNamespaces(attributeUris, workspace.fs),
    readIdentifiers(entityUris, workspace.fs, [
      ['minecraft:entity', 'description', 'identifier'],
      ['minecraft:client_entity', 'description', 'identifier'],
    ]),
    readIdentifiers(blockUris, workspace.fs, [['minecraft:block', 'description', 'identifier']]),
    readIdentifiers(itemUris, workspace.fs, [['minecraft:item', 'description', 'identifier']]),
  ]);

  const detectedNamespaces = namespaces.length > 0 ? namespaces : deriveNamespaces(entities, blocks, items);

  return formatBedrockContext({
    workspaceFolders: uniqueSorted((workspace.workspaceFolders ?? []).map((folder) => folder.name)),
    packNames,
    namespaces: detectedNamespaces,
    entities,
    blocks,
    items,
  });
}

export function formatBedrockContext(data: BedrockContextData): string {
  const namespaceLabel = data.namespaces.length > 1 ? 'Project namespaces' : 'Project namespace';

  return [
    'Minecraft Bedrock workspace context:',
    formatList('Workspace folders', data.workspaceFolders),
    formatList('Pack names', data.packNames),
    formatList(namespaceLabel, data.namespaces),
    formatList('Entities', data.entities),
    formatList('Blocks', data.blocks),
    formatList('Items', data.items),
  ].join('\n');
}

export function parseManifestName(content: string, fallback: string): string | undefined {
  const manifest = parseJson(content);
  const name = manifest && getStringAtPath(manifest, ['header', 'name']);
  const normalizedFallback = normalizeValue(fallback);

  return normalizeValue(name) ?? normalizedFallback;
}

export function parseNamespaces(content: string): string[] {
  const namespaces: string[] = [];

  for (const line of content.split(/\r?\n/g)) {
    const commentIndex = line.indexOf('#');
    const value = (commentIndex >= 0 ? line.substring(0, commentIndex) : line).trim();
    if (!value.startsWith('namespace')) continue;

    const separator = value.indexOf('=');
    if (separator < 0) continue;

    const key = value.substring(0, separator).trim();
    if (key !== 'namespace') continue;

    const namespace = normalizeValue(value.substring(separator + 1));
    if (namespace) namespaces.push(namespace);
  }

  return uniqueSorted(namespaces);
}

export function parseIdentifier(content: string, paths: readonly string[][]): string | undefined {
  const document = parseJson(content);
  if (!document) return undefined;

  for (const currentPath of paths) {
    const identifier = getStringAtPath(document, currentPath);
    const normalizedIdentifier = normalizeValue(identifier);
    if (normalizedIdentifier) return normalizedIdentifier;
  }

  return undefined;
}

function deriveNamespaces(...identifierLists: string[][]): string[] {
  return uniqueSorted(
    identifierLists
      .flat()
      .map((identifier) => identifier.split(':')[0])
      .filter((namespace) => namespace && namespace !== 'minecraft'),
  );
}

async function readPackNames(uris: readonly vscode.Uri[], fs: WorkspaceFileSystemLike): Promise<string[]> {
  const names = await Promise.all(
    uris.map(async (uri) => {
      const fallback = path.basename(path.dirname(getUriPath(uri)));
      return parseManifestName(await readText(uri, fs), fallback);
    }),
  );

  return uniqueSorted(names);
}

async function readNamespaces(uris: readonly vscode.Uri[], fs: WorkspaceFileSystemLike): Promise<string[]> {
  const namespaces = await Promise.all(uris.map(async (uri) => parseNamespaces(await readText(uri, fs))));
  return uniqueSorted(namespaces.flat());
}

async function readIdentifiers(
  uris: readonly vscode.Uri[],
  fs: WorkspaceFileSystemLike,
  paths: readonly string[][],
): Promise<string[]> {
  const identifiers = await Promise.all(uris.map(async (uri) => parseIdentifier(await readText(uri, fs), paths)));
  return uniqueSorted(identifiers);
}

async function readText(uri: vscode.Uri, fs: WorkspaceFileSystemLike): Promise<string> {
  const content = await fs.readFile(uri);
  return Buffer.from(content).toString('utf8');
}

function parseJson(content: string): Record<string, unknown> | undefined {
  try {
    const parsed = JSON.parse(content);
    if (parsed && typeof parsed === 'object') return parsed as Record<string, unknown>;
  } catch {
    return undefined;
  }

  return undefined;
}

function getStringAtPath(value: Record<string, unknown>, parts: readonly string[]): string | undefined {
  let current: unknown = value;

  for (const part of parts) {
    if (!current || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === 'string' ? current : undefined;
}

function formatList(label: string, values: readonly string[]): string {
  if (values.length === 0) return `- ${label}: none found`;

  const visibleValues = values.slice(0, MaxListValues);
  const remainder = values.length - visibleValues.length;
  const suffix = remainder > 0 ? ` (+${remainder} more)` : '';

  return `- ${label} (${values.length}): ${visibleValues.join(', ')}${suffix}`;
}

function getUriPath(uri: vscode.Uri): string {
  return uri.fsPath || uri.path;
}

function normalizeValue(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;

  const trimmed = value.trim();
  return trimmed === '' ? undefined : trimmed;
}

function uniqueSorted(values: Iterable<string | undefined>): string[] {
  return Array.from(new Set(Array.from(values).filter((value): value is string => Boolean(value)))).sort((left, right) =>
    left.localeCompare(right),
  );
}
