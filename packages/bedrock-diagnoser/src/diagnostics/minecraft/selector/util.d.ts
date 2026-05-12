import { CompactJson } from 'bc-minecraft-bedrock-types/src/minecraft/json';
import { Minecraft } from 'bc-minecraft-bedrock-types';
import { DiagnosticsBuilder } from '../../../types';
import { OffsetWord } from 'bc-minecraft-bedrock-shared';
export type diagnoseAttribute = (attribute: CompactJson.IKeyNode, sel: Minecraft.Selector.Selector, diagnoser: DiagnosticsBuilder) => boolean;
export type diagnoseAttributes = (attributes: CompactJson.IKeyNode[], sel: Minecraft.Selector.Selector, diagnoser: DiagnosticsBuilder) => boolean;
/**
 *
 * @param fn
 * @returns
 */
export declare function all(...fn: diagnoseAttributes[]): diagnoseAttributes;
export declare function forEach(fn: diagnoseAttribute): diagnoseAttributes;
export declare function must_offset_word(fn: (value: OffsetWord, diagnoser: DiagnosticsBuilder) => boolean): diagnoseAttributes;
//# sourceMappingURL=util.d.ts.map