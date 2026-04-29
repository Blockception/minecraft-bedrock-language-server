import { Internal } from 'bc-minecraft-bedrock-project';
import { DiagnosticSeverity, DocumentDiagnosticsBuilder } from '../../../types';
import { Json } from '../../json/json';

/**
 * Diagnoses the given document as a UI definition.
 * Validates JSON structure, reports broken @ inheritance references, and checks
 * that referenced parent elements exist in the indexed UI element collection.
 * @param diagnoser The diagnoser builder to receive the errors
 */
export function diagnose_ui_document(diagnoser: DocumentDiagnosticsBuilder): void {
  const imp = Json.LoadReport<Internal.ResourcePack.UI>(diagnoser);
  if (!Internal.ResourcePack.UI.is(imp)) return;

  // Get all indexed UI elements for cross-reference validation
  const uiElements = diagnoser.context.getProjectData().projectData.resourcePacks.uiElements;

  for (const key of Object.keys(imp)) {
    if (key === 'namespace') continue;
    const elementDef = imp[key];
    if (typeof elementDef !== 'object' || elementDef === null) continue;

    // Validate @ inheritance references
    if (key.includes('@')) {
      const parent = key.substring(key.indexOf('@') + 1);

      // Only validate fully-qualified references (namespace.element) — bare names
      // refer to elements within the same file and are not tracked cross-file.
      if (parent.includes('.') && !uiElements.has(parent)) {
        diagnoser.add(
          key,
          `UI element "${parent}" referenced in inheritance is not defined`,
          DiagnosticSeverity.warning,
          'resourcepack.ui.inheritance.missing',
        );
      }
    }
  }
}
