"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeUtil = exports.Modes = void 0;
const camera_shake_1 = require("./camera-shake");
const cause_type_1 = require("./cause-type");
const clone_1 = require("./clone");
const difficulty_1 = require("./difficulty");
const dimension_1 = require("./dimension");
const easing_1 = require("./easing");
const fill_1 = require("./fill");
const gamemode_1 = require("./gamemode");
const handtype_1 = require("./handtype");
const hud_elements_1 = require("./hud-elements");
const hud_visibility_1 = require("./hud-visibility");
const locate_feature_1 = require("./locate-feature");
const mask_1 = require("./mask");
const mirror_1 = require("./mirror");
const mode_handler_1 = require("./mode-handler");
const music_repeat_1 = require("./music-repeat");
const old_block_1 = require("./old-block");
const operation_1 = require("./operation");
const permissions_1 = require("./permissions");
const replace_1 = require("./replace");
const ride_fill_1 = require("./ride-fill");
const ride_rules_1 = require("./ride-rules");
const rotation_1 = require("./rotation");
const save_1 = require("./save");
const scan_1 = require("./scan");
const selector_attribute_1 = require("./selector-attribute");
const selector_type_1 = require("./selector-type");
const slot_type_1 = require("./slot-type");
const structure_animation_1 = require("./structure-animation");
const teleport_rules_1 = require("./teleport-rules");
const time_1 = require("./time");
/**The collection of modes for minecraft */
var Modes;
(function (Modes) {
    /** The mode: CameraShake **/
    Modes.CameraShake = new mode_handler_1.ModeHandler(camera_shake_1.CameraShakeMode);
    /** The mode: CauseType **/
    Modes.CauseType = new mode_handler_1.ModeHandler(cause_type_1.CauseTypeMode);
    /** The mode: Clone **/
    Modes.Clone = new mode_handler_1.ModeHandler(clone_1.CloneMode);
    /** The mode: Difficulty **/
    Modes.Difficulty = new mode_handler_1.ModeHandler(difficulty_1.DifficultyMode);
    /** The mode: Dimension **/
    Modes.Dimension = new mode_handler_1.ModeHandler(dimension_1.DimensionMode);
    /** The mode: Easing */
    Modes.Easing = new mode_handler_1.ModeHandler(easing_1.EasingMode);
    /** The mode: Fill **/
    Modes.Fill = new mode_handler_1.ModeHandler(fill_1.FillMode);
    /** The mode: Gamemode **/
    Modes.Gamemode = new mode_handler_1.ModeHandler(gamemode_1.GameMode);
    /** The mode: Hand type **/
    Modes.HandType = new mode_handler_1.ModeHandler(handtype_1.HandTypeMode);
    /** The mode: Hud element **/
    Modes.HudElement = new mode_handler_1.ModeHandler(hud_elements_1.HudElementMode);
    /** The mode: Hud visiblity **/
    Modes.HudVisibility = new mode_handler_1.ModeHandler(hud_visibility_1.HudVisibilityMode);
    /** The mode: LocateFeature **/
    Modes.LocateFeature = new mode_handler_1.ModeHandler(locate_feature_1.LocateFeatureMode);
    /** The mode: Mask **/
    Modes.Mask = new mode_handler_1.ModeHandler(mask_1.MaskMode);
    /** The mode: Mirror **/
    Modes.Mirror = new mode_handler_1.ModeHandler(mirror_1.MirrorMode);
    /** The mode: MusicRepeat **/
    Modes.MusicRepeat = new mode_handler_1.ModeHandler(music_repeat_1.MusicRepeatMode);
    /** The mode: OldBlock **/
    Modes.OldBlock = new mode_handler_1.ModeHandler(old_block_1.OldBlockMode);
    /** The mode: Operation **/
    Modes.Operation = new mode_handler_1.ModeHandler(operation_1.OperationMode);
    /** The mode: Permission **/
    Modes.Permission = new mode_handler_1.ModeHandler(permissions_1.PermissionMode);
    /** The mode: Permission State **/
    Modes.PermissionState = new mode_handler_1.ModeHandler(permissions_1.PermissionStateMode);
    /** The mode: Replace **/
    Modes.Replace = new mode_handler_1.ModeHandler(replace_1.ReplaceMode);
    /** The mode: RideFill **/
    Modes.RideFill = new mode_handler_1.ModeHandler(ride_fill_1.RideFillMode);
    /** The mode: RideRules **/
    Modes.RideRules = new mode_handler_1.ModeHandler(ride_rules_1.RideRulesMode);
    /** The mode: Rotation **/
    Modes.Rotation = new mode_handler_1.ModeHandler(rotation_1.RotationMode);
    /** The mode: Save **/
    Modes.Save = new mode_handler_1.ModeHandler(save_1.SaveMode);
    /** The mode: Scan **/
    Modes.Scan = new mode_handler_1.ModeHandler(scan_1.ScanMode);
    /** The mode: Selector Attribute **/
    Modes.SelectorAttribute = new mode_handler_1.ModeHandler(selector_attribute_1.SelectorAttributeMode);
    /** The mode: Selector Type **/
    Modes.SelectorType = new mode_handler_1.ModeHandler(selector_type_1.SelectorTypeMode);
    /** The mode: Selector Type **/
    Modes.SlotType = new mode_handler_1.ModeHandler(slot_type_1.SlotTypeModes);
    /** The mode: StructureAnimation **/
    Modes.StructureAnimation = new mode_handler_1.ModeHandler(structure_animation_1.StructureAnimationMode);
    /** The mode: TeleportRules **/
    Modes.TeleportRules = new mode_handler_1.ModeHandler(teleport_rules_1.TeleportRulesMode);
    /** The mode: Time **/
    Modes.Time = new mode_handler_1.ModeHandler(time_1.TimeMode);
})(Modes || (exports.Modes = Modes = {}));
var ModeUtil;
(function (ModeUtil) {
    /**
     * gets all the modes
     * @returns A collection of modes
     */
    function getModes() {
        return Object.values(Modes).filter((value) => value instanceof mode_handler_1.ModeHandler);
    }
    ModeUtil.getModes = getModes;
    /**
     * tries to get the mode by name
     * @param name The name of the mode
     * @returns The mode or undefined
     */
    function getMode(name) {
        return getModes().find((mode) => mode.name === name);
    }
    ModeUtil.getMode = getMode;
    /**
     * gets all the mode names
     * @returns A collection of mode names
     */
    function getModeNames() {
        return getModes().map((mode) => mode.name);
    }
    ModeUtil.getModeNames = getModeNames;
})(ModeUtil || (exports.ModeUtil = ModeUtil = {}));
//# sourceMappingURL=modes.js.map