import { Version } from 'bc-minecraft-bedrock-shared';
import { Manifest } from 'bc-minecraft-bedrock-project/src/internal/types';
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
