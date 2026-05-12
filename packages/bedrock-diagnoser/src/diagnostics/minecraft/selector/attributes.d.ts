import { CompactJson } from 'bc-minecraft-bedrock-types/src/minecraft/json';
import { Minecraft } from 'bc-minecraft-bedrock-types';
import { DiagnosticsBuilder } from '../../../types';
import { diagnoseAttributes } from './util';
export declare const attribute_diagnostics: Record<string, diagnoseAttributes>;
export declare namespace Attribute {
    function diagnose(attribute: string, attributes: CompactJson.IKeyNode[], sel: Minecraft.Selector.Selector, diagnoser: DiagnosticsBuilder): boolean;
}
//# sourceMappingURL=attributes.d.ts.map