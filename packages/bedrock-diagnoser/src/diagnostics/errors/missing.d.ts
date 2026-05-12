import { DocumentLocation } from 'bc-minecraft-bedrock-shared';
import { MinecraftData } from 'bc-minecraft-bedrock-project';
import { DiagnosticsBuilder } from '../../types';
type PackType = keyof Exclude<MinecraftData, 'projectData'>;
type SubType<T extends PackType> = keyof MinecraftData[T];
/**
 *
 * @param pack
 * @param subtype
 * @param id
 * @param diagnoser
 * @returns
 */
export declare function missing<T extends PackType>(pack: T, subtype: SubType<T>, id: string, diagnoser: DiagnosticsBuilder, location?: DocumentLocation): void;
export {};
//# sourceMappingURL=missing.d.ts.map