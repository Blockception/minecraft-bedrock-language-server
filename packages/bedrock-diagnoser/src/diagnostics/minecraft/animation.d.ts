import { Definition } from 'bc-minecraft-bedrock-shared';
import { BehaviorPack, DataSetConnector, ResourcePack } from 'bc-minecraft-bedrock-project';
import { Script } from 'bc-minecraft-bedrock-project/src/internal/types';
import { DiagnosticsBuilder } from '../../types';
export interface AnimationUsage {
    animationControllers: Definition;
    animations: Definition;
    script: Script;
}
export declare function minecraft_animation_used(data: AnimationUsage, diagnoser: DiagnosticsBuilder, controllers: Pick<DataSetConnector<ResourcePack.AnimationController.AnimationController | BehaviorPack.AnimationController.AnimationController, ResourcePack.ResourcePack>, 'get'>): void;
//# sourceMappingURL=animation.d.ts.map