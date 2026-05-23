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

/**
 * Registers the `#bedrockContext` chat variable when the current VS Code build
 * exposes the chat variable resolver API.
 */
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

/**
 * Scans the open workspace for Bedrock project files and returns a formatted
 * summary that Copilot Chat can inject into prompts.
 */
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

/**
 * Formats the collected Bedrock project data into a compact, readable block of
 * text for chat variable expansion.
 */
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

/**
 * Reads the display name from a pack manifest, falling back to the pack folder
 * name when the manifest is missing or malformed.
 */
export function parseManifestName(content: string, fallback: string): string | undefined {
  const manifest = parseJson(content);
  const name = manifest && getStringAtPath(manifest, ['header', 'name']);
  const normalizedFallback = normalizeValue(fallback);

  return normalizeValue(name) ?? normalizedFallback;
}

/**
 * Extracts all `namespace=...` declarations from a `.mcattributes` file.
 */
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

/**
 * Tries a list of JSON paths and returns the first normalized identifier found
 * in a Bedrock content file.
 */
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

/**
 * Infers namespace candidates from discovered identifiers when `.mcattributes`
 * does not define one.
 */
function deriveNamespaces(...identifierLists: string[][]): string[] {
  return uniqueSorted(
    identifierLists
      .flat()
      .map((identifier) => identifier.split(':')[0])
      .filter((namespace) => namespace && namespace !== 'minecraft'),
  );
}

/** Loads and normalizes pack names from each discovered manifest. */
async function readPackNames(uris: readonly vscode.Uri[], fs: WorkspaceFileSystemLike): Promise<string[]> {
  const names = await Promise.all(
    uris.map(async (uri) => {
      const fallback = path.basename(path.dirname(getUriPath(uri)));
      return parseManifestName(await readText(uri, fs), fallback);
    }),
  );

  return uniqueSorted(names);
}

/** Loads and merges namespace declarations from each discovered `.mcattributes` file. */
async function readNamespaces(uris: readonly vscode.Uri[], fs: WorkspaceFileSystemLike): Promise<string[]> {
  const namespaces = await Promise.all(uris.map(async (uri) => parseNamespaces(await readText(uri, fs))));
  return uniqueSorted(namespaces.flat());
}

/** Loads identifiers from a set of discovered Bedrock JSON files. */
async function readIdentifiers(
  uris: readonly vscode.Uri[],
  fs: WorkspaceFileSystemLike,
  paths: readonly string[][],
): Promise<string[]> {
  const identifiers = await Promise.all(uris.map(async (uri) => parseIdentifier(await readText(uri, fs), paths)));
  return uniqueSorted(identifiers);
}

/** Reads a VS Code workspace file as UTF-8 text. */
async function readText(uri: vscode.Uri, fs: WorkspaceFileSystemLike): Promise<string> {
  const content = await fs.readFile(uri);
  return Buffer.from(content).toString('utf8');
}

/** Parses JSON content safely and returns `undefined` for malformed documents. */
function parseJson(content: string): Record<string, unknown> | undefined {
  try {
    const parsed = JSON.parse(content);
    if (parsed && typeof parsed === 'object') return parsed as Record<string, unknown>;
  } catch {
    return undefined;
  }

  return undefined;
}

/** Resolves a nested string property from a parsed JSON object. */
function getStringAtPath(value: Record<string, unknown>, parts: readonly string[]): string | undefined {
  let current: unknown = value;

  for (const part of parts) {
    if (!current || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === 'string' ? current : undefined;
}

/** Formats a value list while keeping the output size bounded for chat prompts. */
function formatList(label: string, values: readonly string[]): string {
  if (values.length === 0) return `- ${label}: none found`;

  const visibleValues = values.slice(0, MaxListValues);
  const remainder = values.length - visibleValues.length;
  const suffix = remainder > 0 ? ` (+${remainder} more)` : '';

  return `- ${label} (${values.length}): ${visibleValues.join(', ')}${suffix}`;
}

/** Normalizes the file-system path representation for a VS Code URI. */
function getUriPath(uri: vscode.Uri): string {
  return uri.fsPath || uri.path;
}

/** Trims string values and drops empty results. */
function normalizeValue(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;

  const trimmed = value.trim();
  return trimmed === '' ? undefined : trimmed;
}

/** De-duplicates and alphabetically sorts a string collection. */
function uniqueSorted(values: Iterable<string | undefined>): string[] {
  return Array.from(new Set(Array.from(values).filter((value): value is string => Boolean(value)))).sort((left, right) =>
    left.localeCompare(right),
  );
}
