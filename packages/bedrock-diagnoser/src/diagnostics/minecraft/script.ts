import { Conditional, Definition } from 'bc-minecraft-bedrock-shared';
import { Script } from 'bc-minecraft-bedrock-project/src/internal/types';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../types';

/**
 *
 * @param builder
 * @param script
 * @param Animations
 * @param Controllers
 * @returns
 */
export function diagnose_script(
  builder: DiagnosticsBuilder,
  script: Script | undefined,
  Animations?: Definition,
  Controllers?: Definition,
): void {
  if (script === undefined) return;

  if (script.animate) {
    const animates = script.animate;

    Conditional.forEach(animates, (ref_id) => has_ref(builder, ref_id, Animations, Controllers));
  }
}

function has_ref(
  diagnoser: DiagnosticsBuilder,
  ref_id: string,
  Animations?: Definition,
  Controllers?: Definition,
): void {
  if (Animations && Animations[ref_id] !== undefined) return;
  if (Controllers && Controllers[ref_id] !== undefined) return;

  diagnoser.add(
    `scripts/animate/${ref_id}`,
    'Cannot find animation or controller definition of: ' + ref_id,
    DiagnosticSeverity.error,
    'minecraft.script.animate.missing',
  );
}
