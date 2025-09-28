import { MolangFunction } from "./molang-function";
/**General molang data*/
export declare namespace General {
    /**The collection of math functions*/
    const Math: MolangFunction[];
    /**
     * Gets the math functions for the given id
     * @param id The id to get the queries for
     * @returns The queries for the given id
     */
    function getMath(id: string): MolangFunction | undefined;
    /**The collection of queries*/
    const Queries: MolangFunction[];
    /**
     * Gets the queries for the given id
     * @param id The id to get the queries for
     * @returns The queries for the given id
     */
    function getQuery(id: string): MolangFunction | undefined;
}
