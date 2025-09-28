import { Types } from "bc-minecraft-bedrock-types";
/**A universal script component for RP and BP scripts*/
export interface Script {
    /**What animation / controllers to animate*/
    animate?: Types.Conditional[];
    /**Initialization of variables once*/
    initialize?: string[];
    /**Initialization of before animations*/
    pre_animation?: string[];
    /**Variables and their settings*/
    variables?: Types.Definition;
}
/** */
export declare namespace Script {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is Script;
}
/** */
export interface ScriptContainer {
    /** */
    scripts?: Script;
    /** */
    animations?: Types.Definition;
}
/** */
export declare namespace ScriptContainer {
    /**
     *
     * @param value
     * @returns*/
    function is(value: any): value is ScriptContainer;
}
