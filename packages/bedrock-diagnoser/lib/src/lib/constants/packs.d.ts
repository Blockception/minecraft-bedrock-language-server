import { PackType } from "bc-minecraft-bedrock-project";
export type PackStringType = ReturnType<typeof packTypeToString>;
export declare function packTypeToString(type: PackType): "resourcepack" | "behaviorpack" | "skinpack" | "world" | "unknown";
