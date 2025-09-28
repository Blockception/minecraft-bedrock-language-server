/**A conditional object
 * @example { "walk.anim": "query.random" }*/
export interface Conditional {
    /**The id is an animation / controller that is to be activated if the string value is evaluated to be 1.0 or higher*/
    [id: string]: string | number;
}
/**
 * The namespace of the conditional
 */
export declare namespace Conditional {
    /**Returns the identification
     * @param data
     * @returns*/
    function getId(data: Conditional | string): string;
    /**
     *
     * @param data
     * @returns
     */
    function getCondition(data: Conditional | string): string | number;
    /**
     *
     * @param data
     * @param callbackfn
     * @returns
     */
    function forEach(data: (Conditional | string)[] | Conditional[] | string[] | undefined, callbackfn: (id: string, value: string | number, index: number, data: (Conditional | string)[]) => void): void;
}
