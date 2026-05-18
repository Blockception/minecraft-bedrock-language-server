import { OffsetWord } from 'bc-minecraft-bedrock-shared';
import { CommandContainer, hasCommandData } from 'bc-minecraft-bedrock-command';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../types';

/**
 *
 * @param blockDescriptor
 * @param diagnoser
 */
export function minecraft_check_command(
  command: OffsetWord,
  diagnoser: DiagnosticsBuilder,
  edu: boolean,
  custom?: CommandContainer,
): void {
  if (hasCommandData(command.text, edu, custom)) return;

  diagnoser.add(
    command,
    'Command does not exist: ' + command.text,
    DiagnosticSeverity.error,
    'minecraft.commands.invalid',
  );
}
