import { CompactJson } from "bc-minecraft-bedrock-types/lib/minecraft/json";
import { Selector } from "bc-minecraft-bedrock-types/lib/minecraft/selector";
import { DiagnosticsBuilder } from "../../../types";
import { diagnoseAttributes } from "./util";
export declare const attribute_hasitem_diagnostics: Record<string, diagnoseAttributes>;
/**
 * Diagnoses the hasitem selector attribute
 * @param attr
 * @param sel
 * @param diagnoser
 */
export declare function minecraft_selector_hasitem_diagnose(attr: CompactJson.IKeyNode, sel: Selector, diagnoser: DiagnosticsBuilder): boolean;
