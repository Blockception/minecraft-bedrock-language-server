import { IDataSet } from 'bc-minecraft-bedrock-project';
import { Types } from 'bc-minecraft-bedrock-types';
import { DiagnosticSeverity, DocumentDiagnosticsBuilder } from '../../types';
import { PackStringType } from '../../constants/packs';
import { Identifiable } from '@blockception/packages-shared';

export function no_other_duplicates<T extends Identifiable & Types.Locatable>(
  diagPrefix: `${PackStringType}.${string}`,
  set: IDataSet<T>,
  id: string,
  diagnoser: DocumentDiagnosticsBuilder,
) {
  return; //TODO: Renable someday if/when refactoring happens

  const uri = diagnoser.document.uri;

  set.forEach((current) => {
    if (current.id === id && current.location.uri !== uri)
      diagnoser.add(
        `identifier/${id}`,
        `"${id}" has been defined multiple times:\n${uri}\n${current.location.uri}`,
        DiagnosticSeverity.warning,
        `${diagPrefix}.duplicate_id`,
      );
  });
}
