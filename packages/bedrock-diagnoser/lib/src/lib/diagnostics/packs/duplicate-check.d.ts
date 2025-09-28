import { IDataSet } from "bc-minecraft-bedrock-project";
import { Types } from "bc-minecraft-bedrock-types";
import { DocumentDiagnosticsBuilder } from "../../types";
import { PackStringType } from "../../constants/packs";
export declare function no_other_duplicates<T extends Types.Identifiable & Types.Locatable>(diagPrefix: `${PackStringType}.${string}`, set: IDataSet<T>, id: string, diagnoser: DocumentDiagnosticsBuilder): void;
