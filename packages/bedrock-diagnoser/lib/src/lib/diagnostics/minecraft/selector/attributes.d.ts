import { CompactJson } from "bc-minecraft-bedrock-types/lib/minecraft/json";
import { Selector } from "bc-minecraft-bedrock-types/lib/minecraft/selector";
import { DiagnosticsBuilder } from "../../../types";
import { diagnoseAttributes } from "./util";
export declare const attribute_diagnostics: Record<string, diagnoseAttributes>;
export declare namespace Attribute {
    function diagnose(attribute: string, attributes: CompactJson.IKeyNode[], sel: Selector, diagnoser: DiagnosticsBuilder): boolean;
}
