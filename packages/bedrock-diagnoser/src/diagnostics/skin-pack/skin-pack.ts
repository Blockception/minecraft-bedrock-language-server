import { DocumentDiagnosticsBuilder } from '../../types/diagnostics-builder';
import { PackType } from 'bc-minecraft-bedrock-project';
import { resolveCommandContext } from '../command-context';

import * as Manifest from './manifest/entry';

/** The namespace that deals with Skin-pack diagnostics */
export namespace SkinPack {
  /**Processes and diagnoses the given textdocument
   * @param doc The document to process / diagnose
   * @param diagnoser The diagnoser to report to
   * @returns `true` or `false` whenever or not it was successful*/
  export function diagnose_document(diagnoser: DocumentDiagnosticsBuilder): boolean {
    //retrieve filter doc type
    if (diagnoser.document.uri.endsWith('manifest.json')) {
      Manifest.Diagnose(diagnoser);
    }

    resolveCommandContext(diagnoser, PackType.skin_pack);
    return true;
  }
}
