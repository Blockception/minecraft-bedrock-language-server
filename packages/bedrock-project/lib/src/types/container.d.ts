import { MCProject } from "bc-minecraft-project";
/** */
export interface Container {
    /**The nessacary Minecraft project data*/
    readonly context: MCProject;
}
/** */
export declare namespace Container {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is Container;
}
