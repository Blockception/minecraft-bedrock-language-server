import { Minecraft } from 'bc-minecraft-bedrock-types';
import { CompactJson } from 'bc-minecraft-bedrock-types/src/minecraft/json';
import { DiagnosticsBuilder } from '../../../types';
import { diagnoseAttributes } from './util';
export declare const attribute_hasitem_diagnostics: Record<string, diagnoseAttributes>;
/**
 * Diagnoses the hasitem selector attribute
 * @param attr
 * @param sel
 * @param diagnoser
 */
export declare function minecraft_selector_hasitem_diagnose(attr: CompactJson.IKeyNode, sel: Minecraft.Selector.Selector, diagnoser: DiagnosticsBuilder): boolean;
//# sourceMappingURL=hasitem.d.ts.map