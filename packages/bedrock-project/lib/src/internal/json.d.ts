import { TextDocument } from "../types";
/**The namespace that provided json code*/
export declare namespace Json {
    /**Takes the given text data and casts into the given object
     * @param doc The document or string to cast
     * @returns Return an object or undefined is something went wrong*/
    function To<T>(doc: TextDocument | string): T | undefined;
}
