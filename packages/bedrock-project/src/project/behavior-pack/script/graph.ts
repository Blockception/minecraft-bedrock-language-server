import { Manifest, ManifestDependency, ManifestDependencyModule, ManifestModule } from '../../../internal/types';
import { TextDocument } from '../../../types';
import * as path from 'path';
import * as ts from 'typescript';

const ScriptExtensions = ['.ts', '.js', '.mts', '.cts', '.mjs', '.cjs'];

export interface ScriptModuleIssue {
  moduleIndex: number;
  field: 'entry' | 'language';
  code: 'missing' | 'invalid';
}

export interface ScriptEntryNotFound {
  moduleIndex: number;
  entry: string;
  uri: string;
}

export interface ScriptGraphResult {
  reachableFiles: string[];
  unreachableFiles: string[];
  moduleIssues: ScriptModuleIssue[];
  missingEntries: ScriptEntryNotFound[];
  usesCustomCommandRegistry: boolean;
  hasMinecraftServerDependency: boolean;
}

export interface ResolveScriptGraphInput {
  folder: string;
  manifest: Manifest;
  getDocument(uri: string): TextDocument | undefined;
  getScriptFiles?(): string[];
}

export function resolveManifestScriptGraph(input: ResolveScriptGraphInput): ScriptGraphResult {
  const reachable = new Set<string>();
  const entryQueue: string[] = [];
  const moduleIssues: ScriptModuleIssue[] = [];
  const missingEntries: ScriptEntryNotFound[] = [];
  const resolutionCache = new Map<string, string | undefined>();
  let usesCustomCommandRegistry = false;

  const modules = input.manifest.modules ?? [];
  for (let i = 0; i < modules.length; i++) {
    const module = modules[i];
    if (module?.type !== 'script') continue;

    if (typeof module.entry !== 'string' || module.entry.trim().length === 0) {
      moduleIssues.push({ moduleIndex: i, field: 'entry', code: 'missing' });
      continue;
    }

    if (typeof module.language !== 'string' || module.language.trim().length === 0) {
      moduleIssues.push({ moduleIndex: i, field: 'language', code: 'missing' });
    } else if (!isSupportedLanguage(module.language)) {
      moduleIssues.push({ moduleIndex: i, field: 'language', code: 'invalid' });
    }

    const entryUri = resolveFromPack(input.folder, module.entry);
    const entryDoc = input.getDocument(entryUri);
    if (!entryDoc) {
      missingEntries.push({ moduleIndex: i, entry: module.entry, uri: entryUri });
      continue;
    }

    entryQueue.push(entryUri);
  }

  while (entryQueue.length > 0) {
    const current = entryQueue.shift();
    if (!current || reachable.has(current)) continue;

    const doc = input.getDocument(current);
    if (!doc) continue;

    reachable.add(current);
    const text = doc.getText();
    if (!usesCustomCommandRegistry && /CustomCommandRegistry\s*\.\s*registerCommand\s*\(/.test(text)) {
      usesCustomCommandRegistry = true;
    }

    const imports = getImports(text, current);
    for (let i = 0; i < imports.length; i++) {
      const resolved = resolveImport(imports[i], current, input.getDocument, resolutionCache);
      if (!resolved || reachable.has(resolved)) continue;
      entryQueue.push(resolved);
    }
  }

  const scriptFiles = new Set<string>((input.getScriptFiles?.() ?? []).filter(isScriptFile));
  const unreachableFiles = Array.from(scriptFiles).filter((file) => !reachable.has(file));

  return {
    reachableFiles: Array.from(reachable),
    unreachableFiles,
    moduleIssues,
    missingEntries,
    usesCustomCommandRegistry,
    hasMinecraftServerDependency: hasMinecraftServerDependency(input.manifest),
  };
}

function isSupportedLanguage(language: string): boolean {
  const lowered = language.toLowerCase();
  return lowered === 'javascript' || lowered === 'typescript';
}

function isScriptFile(uri: string): boolean {
  if (/[\\/]node_modules[\\/]/i.test(uri)) return false;
  const lowered = uri.toLowerCase();
  for (let i = 0; i < ScriptExtensions.length; i++) {
    if (lowered.endsWith(ScriptExtensions[i])) return true;
  }

  return false;
}

function getImports(sourceText: string, fileName: string): string[] {
  const result = ts.preProcessFile(sourceText, true, true);
  const imports: string[] = [];
  for (let i = 0; i < result.importedFiles.length; i++) {
    const name = result.importedFiles[i].fileName;
    if (name) imports.push(name);
  }

  // Handle `require("x")` in places preprocess can miss.
  const requireRegex = /(?:^|[^.\w$])require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
  let match = requireRegex.exec(sourceText);
  while (match) {
    if (match[1]) imports.push(match[1]);
    match = requireRegex.exec(sourceText);
  }

  return imports;
}

function resolveImport(
  specifier: string,
  fromUri: string,
  getDocument: (uri: string) => TextDocument | undefined,
  cache: Map<string, string | undefined>,
): string | undefined {
  if (!specifier) return undefined;
  if (specifier.startsWith('@minecraft/')) return undefined;
  if (!isRelativeSpecifier(specifier) && !specifier.startsWith('file://')) return undefined;

  const cacheKey = `${fromUri}::${specifier}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const base = resolveFromFile(fromUri, specifier);
  const candidates = getCandidates(base);
  for (let i = 0; i < candidates.length; i++) {
    const candidate = candidates[i];
    if (!isScriptFile(candidate)) continue;
    if (!getDocument(candidate)) continue;
    cache.set(cacheKey, candidate);
    return candidate;
  }

  cache.set(cacheKey, undefined);
  return undefined;
}

function getCandidates(base: string): string[] {
  const out: string[] = [];
  const ext = path.extname(base).toLowerCase();
  const hasKnownExt = ScriptExtensions.includes(ext);

  out.push(base);

  if (!hasKnownExt) {
    for (let i = 0; i < ScriptExtensions.length; i++) {
      out.push(base + ScriptExtensions[i]);
    }
  } else if (ext === '.js') {
    out.push(base.slice(0, -3) + '.ts');
  } else if (ext === '.mjs') {
    out.push(base.slice(0, -4) + '.mts');
  } else if (ext === '.cjs') {
    out.push(base.slice(0, -4) + '.cts');
  }

  for (let i = 0; i < ScriptExtensions.length; i++) {
    out.push(appendPath(base, `index${ScriptExtensions[i]}`));
  }

  return out;
}

function isRelativeSpecifier(specifier: string): boolean {
  return specifier.startsWith('./') || specifier.startsWith('../') || specifier.startsWith('/');
}

function resolveFromPack(folder: string, relativePath: string): string {
  if (folder.startsWith('file://')) {
    const base = folder.endsWith('/') ? folder : `${folder}/`;
    return new URL(relativePath.replace(/\\/g, '/'), base).toString();
  }

  const pathApi = getPathApi(folder);
  if (pathApi.isAbsolute(folder)) return pathApi.normalize(pathApi.resolve(folder, relativePath));
  return pathApi.normalize(pathApi.join(folder, relativePath));
}

function resolveFromFile(fileUri: string, relativePath: string): string {
  if (fileUri.startsWith('file://')) {
    return new URL(relativePath.replace(/\\/g, '/'), new URL('.', fileUri)).toString();
  }

  const pathApi = getPathApi(fileUri);
  const dir = pathApi.dirname(fileUri);
  if (pathApi.isAbsolute(dir)) return pathApi.normalize(pathApi.resolve(dir, relativePath));
  return pathApi.normalize(pathApi.join(dir, relativePath));
}

function appendPath(base: string, value: string): string {
  if (base.startsWith('file://')) {
    const normalized = base.endsWith('/') ? base : `${base}/`;
    return new URL(value, normalized).toString();
  }

  return getPathApi(base).join(base, value);
}

function getPathApi(input: string): typeof path.win32 | typeof path.posix {
  if (/^[a-zA-Z]:[\\/]/.test(input) || input.includes('\\')) return path.win32;
  return path.posix;
}

function hasMinecraftServerDependency(manifest: Manifest): boolean {
  const dependencies: ManifestDependency[] = [];
  if (Array.isArray(manifest.dependencies)) dependencies.push(...manifest.dependencies);

  const modules = manifest.modules ?? [];
  for (let i = 0; i < modules.length; i++) {
    const scriptModule = modules[i] as ManifestModule;
    if (!Array.isArray(scriptModule.dependencies)) continue;
    dependencies.push(...scriptModule.dependencies);
  }

  for (let i = 0; i < dependencies.length; i++) {
    const dependency = dependencies[i];
    const info = getDependencyInfo(dependency);
    if (!info || info.name !== '@minecraft/server') continue;
    if (isVersionAtLeast(info.version, 1, 8, 0)) return true;
  }

  return false;
}

function getDependencyInfo(
  dependency: ManifestDependency,
): { name: string; version: string | number[] | undefined } | undefined {
  if (typeof dependency === 'string') {
    return { name: dependency, version: undefined };
  }

  if (typeof dependency === 'object' && dependency) {
    const dep = dependency as ManifestDependencyModule;
    const name = dep.module_name ?? dep.name;
    if (!name) return undefined;
    return { name, version: dep.version };
  }

  return undefined;
}

function isVersionAtLeast(version: string | number[] | undefined, major: number, minor: number, patch: number): boolean {
  if (Array.isArray(version)) {
    return compareParts(version[0] ?? 0, version[1] ?? 0, version[2] ?? 0, major, minor, patch) >= 0;
  }

  if (typeof version === 'string') {
    const cleaned = version.replace(/^[~^>=<\s]+/g, '');
    const match = cleaned.match(/^(\d+)\.(\d+)\.(\d+)/);
    if (!match) return false;
    return compareParts(Number(match[1]), Number(match[2]), Number(match[3]), major, minor, patch) >= 0;
  }

  return false;
}

function compareParts(
  majorA: number,
  minorA: number,
  patchA: number,
  majorB: number,
  minorB: number,
  patchB: number,
): number {
  if (majorA !== majorB) return majorA - majorB;
  if (minorA !== minorB) return minorA - minorB;
  return patchA - patchB;
}
