import { Conditional, Definition } from 'bc-minecraft-bedrock-shared';
/**A universal script component for RP and BP scripts*/
export interface Script {
    /**What animation / controllers to animate*/
    animate?: Conditional[];
    /**Initialization of variables once*/
    initialize?: string[];
    /**Initialization of before animations*/
    pre_animation?: string[];
    /**Variables and their settings*/
    variables?: Definition;
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
    animations?: Definition;
}
/** */
export declare namespace ScriptContainer {
    /**
     *
     * @param value
     * @returns*/
    function is(value: any): value is ScriptContainer;
}
//# sourceMappingURL=script.d.ts.map