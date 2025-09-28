import { BehaviorPack, DataSetConnector, ResourcePack } from "bc-minecraft-bedrock-project";
import { Script } from "bc-minecraft-bedrock-project/lib/src/internal/types";
import { Types } from "bc-minecraft-bedrock-types";
import { DiagnosticsBuilder } from "../../types";
export interface AnimationUsage {
    animation_controllers: Types.Definition;
    animations: Types.Definition;
    script: Script;
}
export declare function minecraft_animation_used(data: AnimationUsage, diagnoser: DiagnosticsBuilder, controllers: DataSetConnector<ResourcePack.AnimationController.AnimationController | BehaviorPack.AnimationController.AnimationController, ResourcePack.ResourcePack>): void;
