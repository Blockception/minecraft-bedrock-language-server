import { Mode, ModeCollection } from "./mode-collection";
/** */
export interface SlotTypeModeCollection extends ModeCollection {
    /** */
    modes: SlotTypeMode[];
}
/** */
export interface SlotTypeMode extends Mode {
    /** */
    range?: {
        /** */
        min: number;
        /** */
        max: number;
    };
}
/** */
export declare const SlotTypeModes: SlotTypeModeCollection;
