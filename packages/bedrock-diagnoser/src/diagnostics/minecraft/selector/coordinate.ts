import { OffsetWord } from 'bc-minecraft-bedrock-shared';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../../types';
import { minecraft_coordinate_diagnose } from '../coordinate';

/**
 *
 * @param name
 * @param selector
 * @param receiver
 */
export function selectorattribute_coordinate(value: OffsetWord, diagnoser: DiagnosticsBuilder): boolean {
  if (value.text.startsWith('^')) {
    diagnoser.add(
      value,
      'Selector attribute coordinate cannot be local coordinates types, only relative or absolute',
      DiagnosticSeverity.error,
      'minecraft.selector.coordinate.invalid',
    );

    return false;
  }

  return minecraft_coordinate_diagnose(value, diagnoser);
}
