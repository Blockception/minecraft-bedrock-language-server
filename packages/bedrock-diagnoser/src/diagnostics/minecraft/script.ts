import { Script } from 'bc-minecraft-bedrock-project/src/internal/types';
import { Types } from 'bc-minecraft-bedrock-types';
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
  Animations?: Types.Definition,
  Controllers?: Types.Definition,
): void {
  if (script === undefined) return;

  if (script.animate) {
    const animates = script.animate;

    Types.Conditional.forEach(animates, (ref_id) => has_ref(builder, ref_id, Animations, Controllers));
  }
}

function has_ref(
  diagnoser: DiagnosticsBuilder,
  ref_id: string,
  Animations?: Types.Definition,
  Controllers?: Types.Definition,
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
