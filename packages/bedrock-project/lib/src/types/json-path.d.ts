import { TextDocument } from "./text-document";
/** */
export type JsonPath = string;
/** */
export declare namespace JsonPath {
    const seperator = "/";
    /**
     *
     * @param text
     * @param path
     */
    function resolve(text: string | TextDocument, path: JsonPath): number;
    /**
     *
     * @param path
     * @returns
     */
    function create(...path: string[]): JsonPath;
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is JsonPath;
}
