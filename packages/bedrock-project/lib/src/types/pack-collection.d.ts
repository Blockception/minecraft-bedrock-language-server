import { Types } from "bc-minecraft-bedrock-types";
import { DataSetBase } from "./data-set";
import { Pack } from "./pack";
import { TextDocument } from "./text-document";
/**The class PackCollection description*/
export declare class PackCollection<T extends Pack> {
    /** */
    packs: T[];
    /**Creates a new instances of the class*/
    constructor();
    /**
     *
     * @param doc
     */
    process(doc: TextDocument): DataSetBase | undefined;
    /** */
    count(): number;
    /**
     *
     * @param doc
     * @returns
     */
    get(doc: TextDocument | string): T | undefined;
    /**
     *
     * @param folder
     * @returns
     */
    delete(folder: string): boolean;
    /**
     *
     * @param uri
     * @returns
     */
    deleteFile(uri: string): boolean;
    /**
     *
     * @param uri
     * @returns
     */
    deleteFolder(uri: string): boolean;
    /**
     *
     * @param predicate
     * @returns
     */
    find(predicate: (value: Types.BaseObject, key: string) => boolean): Types.BaseObject | undefined;
}
