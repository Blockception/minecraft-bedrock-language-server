import { CameraShakeMode } from "./camera-shake";
import { CauseTypeMode } from "./cause-type";
import { CloneMode } from "./clone";
import { DifficultyMode } from "./difficulty";
import { DimensionMode } from "./dimension";
import { EasingMode } from "./easing";
import { FillMode } from "./fill";
import { GameMode } from "./gamemode";
import { HandTypeMode } from "./handtype";
import { HudElementMode } from "./hud-elements";
import { HudVisibilityMode } from "./hud-visibility";
import { LocateFeatureMode } from "./locate-feature";
import { MaskMode } from "./mask";
import { MirrorMode } from "./mirror";
import { ModeHandler } from "./mode-handler";
import { MusicRepeatMode } from "./music-repeat";
import { OldBlockMode } from "./old-block";
import { OperationMode } from "./operation";
import { PermissionMode, PermissionStateMode } from "./permissions";
import { ReplaceMode } from "./replace";
import { RideFillMode } from "./ride-fill";
import { RideRulesMode } from "./ride-rules";
import { RotationMode } from "./rotation";
import { SaveMode } from "./save";
import { ScanMode } from "./scan";
import { SelectorAttributeMode } from "./selector-attribute";
import { SelectorTypeMode } from "./selector-type";
import { SlotTypeModes } from "./slot-type";
import { StructureAnimationMode } from "./structure-animation";
import { TeleportRulesMode } from "./teleport-rules";
import { TimeMode } from "./time";

/**The collection of modes for minecraft */
export namespace Modes {
  /** The mode: CameraShake **/
  export const CameraShake = new ModeHandler(CameraShakeMode);
  /** The mode: CauseType **/
  export const CauseType = new ModeHandler(CauseTypeMode);
  /** The mode: Clone **/
  export const Clone = new ModeHandler(CloneMode);
  /** The mode: Difficulty **/
  export const Difficulty = new ModeHandler(DifficultyMode);
  /** The mode: Dimension **/
  export const Dimension = new ModeHandler(DimensionMode);
  /** The mode: Easing */
  export const Easing = new ModeHandler(EasingMode);
  /** The mode: Fill **/
  export const Fill = new ModeHandler(FillMode);
  /** The mode: Gamemode **/
  export const Gamemode = new ModeHandler(GameMode);
  /** The mode: Hand type **/
  export const HandType = new ModeHandler(HandTypeMode);
  /** The mode: Hud element **/
  export const HudElement = new ModeHandler(HudElementMode);
  /** The mode: Hud visiblity **/
  export const HudVisibility = new ModeHandler(HudVisibilityMode);
  /** The mode: LocateFeature **/
  export const LocateFeature = new ModeHandler(LocateFeatureMode);
  /** The mode: Mask **/
  export const Mask = new ModeHandler(MaskMode);
  /** The mode: Mirror **/
  export const Mirror = new ModeHandler(MirrorMode);
  /** The mode: MusicRepeat **/
  export const MusicRepeat = new ModeHandler(MusicRepeatMode);
  /** The mode: OldBlock **/
  export const OldBlock = new ModeHandler(OldBlockMode);
  /** The mode: Operation **/
  export const Operation = new ModeHandler(OperationMode);
  /** The mode: Permission **/
  export const Permission = new ModeHandler(PermissionMode);
  /** The mode: Permission State **/
  export const PermissionState = new ModeHandler(PermissionStateMode);
  /** The mode: Replace **/
  export const Replace = new ModeHandler(ReplaceMode);
  /** The mode: RideFill **/
  export const RideFill = new ModeHandler(RideFillMode);
  /** The mode: RideRules **/
  export const RideRules = new ModeHandler(RideRulesMode);
  /** The mode: Rotation **/
  export const Rotation = new ModeHandler(RotationMode);
  /** The mode: Save **/
  export const Save = new ModeHandler(SaveMode);
  /** The mode: Scan **/
  export const Scan = new ModeHandler(ScanMode);
  /** The mode: Selector Attribute **/
  export const SelectorAttribute = new ModeHandler(SelectorAttributeMode);
  /** The mode: Selector Type **/
  export const SelectorType = new ModeHandler(SelectorTypeMode);
  /** The mode: Selector Type **/
  export const SlotType = new ModeHandler(SlotTypeModes);
  /** The mode: StructureAnimation **/
  export const StructureAnimation = new ModeHandler(StructureAnimationMode);
  /** The mode: TeleportRules **/
  export const TeleportRules = new ModeHandler(TeleportRulesMode);
  /** The mode: Time **/
  export const Time = new ModeHandler(TimeMode);
}

export namespace ModeUtil {
  /**
   * gets all the modes
   * @returns A collection of modes
   */
  export function getModes(): ModeHandler[] {
    return Object.values(Modes).filter((value) => value instanceof ModeHandler) as ModeHandler[];
  }

  /**
   * tries to get the mode by name
   * @param name The name of the mode
   * @returns The mode or undefined
   */
  export function getMode(name: string): ModeHandler | undefined {
    return getModes().find((mode) => mode.name === name);
  }

  /**
   * gets all the mode names
   * @returns A collection of mode names
   */
  export function getModeNames(): string[] {
    return getModes().map((mode) => mode.name);
  }
}
