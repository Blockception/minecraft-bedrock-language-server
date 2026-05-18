import { Version } from 'bc-minecraft-bedrock-shared';
import { Manifest } from 'bc-minecraft-bedrock-project/src/internal/types';
import { Script } from 'bc-minecraft-bedrock-project/src/project/behavior-pack';
import { DiagnosticSeverity, DocumentDiagnosticsBuilder } from '../../../types';
import { Json } from '../../json/json';
import { minecraft_manifest_diagnose, minecraft_manifest_required_module } from '../../minecraft/manifest';

/**
 * Diagnoses the given document as an bp manifest
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export function diagnose_manifest(diagnoser: DocumentDiagnosticsBuilder): void {
  const manifest = Json.LoadReport<Manifest>(diagnoser);
  if (!Json.TypeCheck(manifest, diagnoser, 'manifest', 'minecraft.manifest.invalid', Manifest.is)) return;

  minecraft_manifest_diagnose(manifest, diagnoser);
  minecraft_manifest_required_module(manifest, diagnoser, 'data', 'javascript', 'script');

  //BP specific
  check_min_engine_version(manifest.header.min_engine_version, diagnoser);
  diagnose_script_graph(manifest, diagnoser);
}

function check_min_engine_version(
  version: number[] | string | Version | undefined,
  diagnoser: DocumentDiagnosticsBuilder,
): void {
  const pack = diagnoser.context.getProjectData().projectData.behaviorPacks.get(diagnoser.document);

  /**No pack then skip */
  if (pack === undefined) return;

  /**Only need to check if there are functions */
  if (pack.functions.count() === 0) return;

  if (version !== undefined) {
    if (Version.compare(version, { major: 1, minor: 8, patch: 0 }) >= 0) return;
  }

  return diagnoser.add(
    'header',
    "Behaviorpacks with mcfunctions need `min_engine_version` of at-least value: '1.8.0'",
    DiagnosticSeverity.error,
    'behaviorpack.manifest.min_engine_version',
  );
}

function diagnose_script_graph(manifest: Manifest, diagnoser: DocumentDiagnosticsBuilder): void {
  const pack = diagnoser.context.getProjectData().projectData.behaviorPacks.get(diagnoser.document);
  if (!pack) return;

  const graph = Script.resolveManifestScriptGraph({
    folder: pack.folder,
    manifest,
    getDocument: (uri) => diagnoser.context.getDocument(uri),
    getScriptFiles: () =>
      diagnoser.context.getFiles(
        pack.folder,
        ['**/*.js', '**/*.ts', '**/*.mjs', '**/*.cjs', '**/*.mts', '**/*.cts'],
        pack.context.ignores,
      ),
  });

  for (let i = 0; i < graph.moduleIssues.length; i++) {
    const issue = graph.moduleIssues[i];
    const path = `modules/${issue.moduleIndex}/${issue.field}`;
    const message =
      issue.field === 'entry'
        ? 'Script modules must define an `entry` path.'
        : issue.code === 'invalid'
          ? 'Script module `language` must be either `javascript` or `typescript`.'
          : 'Script modules should define a `language`.';

    diagnoser.add(
      path,
      message,
      issue.field === 'entry' ? DiagnosticSeverity.error : DiagnosticSeverity.warning,
      `behaviorpack.manifest.script.${issue.field}.${issue.code}`,
    );
  }

  for (let i = 0; i < graph.missingEntries.length; i++) {
    const missing = graph.missingEntries[i];
    diagnoser.add(
      `modules/${missing.moduleIndex}/entry`,
      `Script entry '${missing.entry}' could not be found.`,
      DiagnosticSeverity.error,
      'behaviorpack.manifest.script.entry.not_found',
    );
  }

  for (let i = 0; i < graph.unreachableFiles.length; i++) {
    const unreachable = graph.unreachableFiles[i];
    diagnoser.add(
      'modules',
      `Script file '${unreachable}' is unreachable from manifest script entry points.`,
      DiagnosticSeverity.warning,
      'behaviorpack.manifest.script.unreachable',
    );
  }

  if (graph.usesCustomCommandRegistry && !graph.hasMinecraftServerDependency) {
    diagnoser.add(
      'dependencies',
      'Using CustomCommandRegistry requires manifest dependency `@minecraft/server` with version >= 1.8.0.',
      DiagnosticSeverity.error,
      'behaviorpack.manifest.script.dependency.minecraft_server',
    );
  }
}
