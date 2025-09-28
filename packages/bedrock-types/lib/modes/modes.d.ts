import { ModeHandler } from "./mode-handler";
/**The collection of modes for minecraft */
export declare namespace Modes {
    /** The mode: CameraShake **/
    const CameraShake: ModeHandler;
    /** The mode: CauseType **/
    const CauseType: ModeHandler;
    /** The mode: Clone **/
    const Clone: ModeHandler;
    /** The mode: Difficulty **/
    const Difficulty: ModeHandler;
    /** The mode: Dimension **/
    const Dimension: ModeHandler;
    /** The mode: Easing */
    const Easing: ModeHandler;
    /** The mode: Fill **/
    const Fill: ModeHandler;
    /** The mode: Gamemode **/
    const Gamemode: ModeHandler;
    /** The mode: Hand type **/
    const HandType: ModeHandler;
    /** The mode: Hud element **/
    const HudElement: ModeHandler;
    /** The mode: Hud visiblity **/
    const HudVisibility: ModeHandler;
    /** The mode: LocateFeature **/
    const LocateFeature: ModeHandler;
    /** The mode: Mask **/
    const Mask: ModeHandler;
    /** The mode: Mirror **/
    const Mirror: ModeHandler;
    /** The mode: MusicRepeat **/
    const MusicRepeat: ModeHandler;
    /** The mode: OldBlock **/
    const OldBlock: ModeHandler;
    /** The mode: Operation **/
    const Operation: ModeHandler;
    /** The mode: Permission **/
    const Permission: ModeHandler;
    /** The mode: Permission State **/
    const PermissionState: ModeHandler;
    /** The mode: Replace **/
    const Replace: ModeHandler;
    /** The mode: RideFill **/
    const RideFill: ModeHandler;
    /** The mode: RideRules **/
    const RideRules: ModeHandler;
    /** The mode: Rotation **/
    const Rotation: ModeHandler;
    /** The mode: Save **/
    const Save: ModeHandler;
    /** The mode: Scan **/
    const Scan: ModeHandler;
    /** The mode: Selector Attribute **/
    const SelectorAttribute: ModeHandler;
    /** The mode: Selector Type **/
    const SelectorType: ModeHandler;
    /** The mode: Selector Type **/
    const SlotType: ModeHandler;
    /** The mode: StructureAnimation **/
    const StructureAnimation: ModeHandler;
    /** The mode: TeleportRules **/
    const TeleportRules: ModeHandler;
    /** The mode: Time **/
    const Time: ModeHandler;
}
export declare namespace ModeUtil {
    /**
     * gets all the modes
     * @returns A collection of modes
     */
    function getModes(): ModeHandler[];
    /**
     * tries to get the mode by name
     * @param name The name of the mode
     * @returns The mode or undefined
     */
    function getMode(name: string): ModeHandler | undefined;
    /**
     * gets all the mode names
     * @returns A collection of mode names
     */
    function getModeNames(): string[];
}
