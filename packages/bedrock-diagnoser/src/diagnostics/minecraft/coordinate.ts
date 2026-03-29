import { Parameter, ParameterInfo, ParameterType } from 'bc-minecraft-bedrock-command';
import { OffsetWord } from 'bc-minecraft-bedrock-shared';
import { Minecraft } from 'bc-minecraft-bedrock-types';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../types';

export function minecraft_coordinate_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): boolean {
  if (Minecraft.Coordinate.is(value.text)) return true;

  diagnoser.add(
    value,
    'Invalid coordinate value: ' + value.text,
    DiagnosticSeverity.error,
    'minecraft.coordinate.invalid',
  );
  return false;
}

/**
 * Validates groups of 3 consecutive coordinate parameters (x, y, z) to ensure:
 * 1. Either all 3 coordinates are provided or none (partial sets are not allowed)
 * 2. Coordinates do not mix local (^) with absolute or relative (~ / number) types
 * @param patternParams The expected parameters from the command definition
 * @param commandParams The actual parameters provided in the command
 * @param diagnoser The diagnostics builder
 */
export function minecraft_coordinate_set_diagnose(
  patternParams: ParameterInfo[],
  commandParams: Parameter[],
  diagnoser: DiagnosticsBuilder,
): void {
  let i = 0;
  while (i < patternParams.length) {
    if (patternParams[i].type !== ParameterType.coordinate) {
      i++;
      continue;
    }

    // Find the end of the consecutive run of coordinate parameters
    let runEnd = i;
    while (runEnd + 1 < patternParams.length && patternParams[runEnd + 1].type === ParameterType.coordinate) {
      runEnd++;
    }

    // Handle 2-coordinate groups (e.g., spreadplayers x,z)
    // Local coordinates (^) are not valid for 2D positions because ^ requires all 3 axes
    if (runEnd === i + 1) {
      for (let g = i; g <= runEnd; g++) {
        const p = commandParams[g];
        if (p !== undefined && p.text.startsWith('^')) {
          diagnoser.add(
            p,
            `Cannot use local coordinates (^) for a 2D position`,
            DiagnosticSeverity.error,
            'minecraft.coordinate.local',
          );
        }
      }
    }

    // Process each triplet (x, y, z) within the run
    for (let g = i; g + 2 <= runEnd; g += 3) {
      const x = commandParams[g];
      const y = commandParams[g + 1];
      const z = commandParams[g + 2];
      const provided = [x, y, z].filter((p): p is Parameter => p !== undefined);

      if (provided.length === 0) {
        // No coordinates provided - valid when the group is optional
        continue;
      }

      if (provided.length < 3) {
        // Partial set provided - coordinates must be given as a complete triplet
        const lastProvided = provided[provided.length - 1];
        diagnoser.add(
          lastProvided,
          `Coordinates must be specified as a complete set of 3 (x y z), only ${provided.length} provided`,
          DiagnosticSeverity.error,
          'minecraft.coordinate.incomplete',
        );
        continue;
      }

      // All 3 provided - check that local (^) and non-local types are not mixed
      const hasLocal = provided.some((p) => p.text.startsWith('^'));
      const hasNonLocal = provided.some((p) => !p.text.startsWith('^'));

      if (hasLocal && hasNonLocal) {
        diagnoser.add(
          provided[0],
          `Cannot mix local coordinates (^) with absolute or relative coordinates`,
          DiagnosticSeverity.error,
          'minecraft.coordinate.mixed',
        );
      }
    }

    i = runEnd + 1;
  }
}
