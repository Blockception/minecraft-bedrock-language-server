import { Minecraft } from 'bc-minecraft-bedrock-types';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../../../types';
import { minecraft_tag_diagnose } from '../../tag';

export function diagnose_filter_has_tag(filter: Minecraft.Filter.Filter, diagnoser: DiagnosticsBuilder) {
  const tag = filter.value;

  if (!tag) {
    return diagnoser.add(
      'test/has_tag',
      'Tag is not defined',
      DiagnosticSeverity.error,
      'minecraft.filter.has_tag.type',
    );
  }

  if (typeof tag !== 'string') {
    return diagnoser.add(
      `test/has_tag/${tag}`,
      'Tag is not defined',
      DiagnosticSeverity.error,
      'minecraft.filter.has_tag.type',
    );
  }

  minecraft_tag_diagnose(tag, diagnoser);
}
