/** The type of molang */
export declare enum MolangType {
    /** A command */
    command = 0,
    /** An event */
    event = 1,
    /** regular molang */
    molang = 2,
    /** unknown */
    unknown = 3
}
/**
 * Checks if the string is a molang type
 * @param data The string to check
 * @returns The type of molang
 */
export declare function isMolangType(data: string): MolangType;
export declare function isMolang(data: string): boolean;
/**
 * Already assumes that the given data is of type MolangType.event
 * @param data The text to parse
 */
export declare function getEvent(data: string): string;
/**
 * Checks if the given data is a valid molang expression
 * @param molang The molang expression to check
 * @returns True if the given molang expression is valid
 */
export declare function isValidMolang(molang: string): boolean;
/**
 * Finds the specific molang expression in the given text
 * @param molang The text to parse
 * @param startIndex The index to start searching from
 * @param find The molang expression to find
 * @returns The index of the molang expression
 */
export declare function find(molang: string, startIndex: number, find: string): number;
