/**
 * A conditional object
 * @example { "walk.anim": "query.random" }
 */
export interface Conditional {
    /**The id is an animation / controller that is to be activated if the string value is evaluated to be 1.0 or higher*/
    [id: string]: string | number;
}
/**
 * The namespace of the conditional
 */
export declare namespace Conditional {
    /**
     * Returns the identification of the conditional
     * @param data Either a conditional object or a string
     * @returns Returns the identification string (property key) or the string itself
     */
    function getId(data: Conditional | string): string;
    /**
     * Returns the condition value of the conditional
     * @param data Either a conditional object or a string
     * @returns Returns the condition value or 1.0 if a string was provided
     */
    function getCondition(data: Conditional | string): string | number;
    /**
     * Iterates through each conditional or string in the provided array
     * @param data An array of conditional objects or strings
     * @param callbackfn A callback function that is called for each item
     */
    function forEach(data: (Conditional | string)[] | Conditional[] | string[] | undefined, callbackfn: (id: string, value: string | number, index: number, data: (Conditional | string)[]) => void): void;
}
//# sourceMappingURL=types.d.ts.map