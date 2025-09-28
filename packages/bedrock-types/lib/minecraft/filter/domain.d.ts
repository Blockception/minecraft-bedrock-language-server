/** The type of domain */
export type DomainType = "any" | "armor" | "feet" | "hand" | "head" | "leg" | "torso";
export declare namespace DomainType {
    /**
     * Tries to convert the given text to a DomainType
     * @param text The text to convert
     * @returns The DomainType or undefined
     */
    function parse(text: string): DomainType;
}
