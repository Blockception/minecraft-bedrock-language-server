/** */
export type JsonPath = string;
/** */
export declare namespace JsonPath {
    const seperator = "/";
    /**TODO add documentation
     *
     * @param text
     * @param path
     */
    function resolve(text: string | {
        getText(): string;
    }, path: JsonPath): number;
    /**TODO add documentation
     *
     * @param path
     * @returns
     */
    function create(...path: string[]): JsonPath;
    /**TODO add documentation
     *
     * @param value
     * @returns
     */
    function is(value: any): value is JsonPath;
}
