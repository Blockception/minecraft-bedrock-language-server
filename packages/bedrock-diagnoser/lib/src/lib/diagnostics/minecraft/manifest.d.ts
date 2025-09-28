import { Manifest, ManifestHeader } from "bc-minecraft-bedrock-project/lib/src/internal/types";
import { DiagnosticsBuilder } from "../../types";
export declare function minecraft_manifest_diagnose(m: Manifest, diagnoser: DiagnosticsBuilder): void;
export declare function minecraft_manifest_header_diagnose(m: ManifestHeader, diagnoser: DiagnosticsBuilder): void;
/**
 *
 * @param m
 * @param diagnoser
 * @param required_type
 * @returns
 */
export declare function minecraft_manifest_required_module(m: Manifest, diagnoser: DiagnosticsBuilder, ...required_type: string[]): boolean;
export declare function minecraft_manifest_version(version: number[] | string, diagnoser: DiagnosticsBuilder, path: string): void;
