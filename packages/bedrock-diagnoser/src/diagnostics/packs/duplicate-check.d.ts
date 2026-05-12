import { Identifiable, Locatable } from 'bc-minecraft-bedrock-shared';
import { IDataSet } from 'bc-minecraft-bedrock-project';
import { PackStringType } from '../../constants/packs';
import { DocumentDiagnosticsBuilder } from '../../types';
export declare function no_other_duplicates<T extends Identifiable & Locatable>(diagPrefix: `${PackStringType}.${string}`, set: IDataSet<T>, id: string, diagnoser: DocumentDiagnosticsBuilder): void;
//# sourceMappingURL=duplicate-check.d.ts.map