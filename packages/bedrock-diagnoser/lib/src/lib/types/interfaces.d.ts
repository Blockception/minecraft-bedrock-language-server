import { References } from "bc-minecraft-bedrock-project";
import { Types } from "bc-minecraft-bedrock-types";
import { AnimationCarrier } from "../diagnostics/minecraft";
import { User } from "../diagnostics/molang";
/**
 * The type that is used to store the animation data & molang data
 */
export type EntityAnimationMolangCarrier = Types.Identifiable & AnimationCarrier<References> & User;
export interface EventCarrier {
    events?: Map<string, any>;
}
