import { DiagnosticsBuilder } from "../../../types";
export interface BoneUsage {
    bone_id: string;
    parent_id: string;
}
export declare function model_bones_must_exist(bones: BoneUsage[], diagnoser: DiagnosticsBuilder): void;
