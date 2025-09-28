import { FormatVersion, Version } from "bc-minecraft-bedrock-types/lib/minecraft";
import { DocumentDiagnosticsBuilder } from "../../types";
interface FormatVersionContainer {
    format_version: FormatVersion | string;
}
declare namespace FormatVersionContainer {
    function is(value: any): value is FormatVersionContainer;
}
export declare function diagnose_format_version(data: Partial<FormatVersionContainer>, diagnoser: DocumentDiagnosticsBuilder): void;
export declare function diagnoseFormatVersion(data: FormatVersionContainer, diagnoser: DocumentDiagnosticsBuilder): void;
export declare function has_minimum_version(version: FormatVersion | Version, minimum: FormatVersion | Version): boolean;
export {};
