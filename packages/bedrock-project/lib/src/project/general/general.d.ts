import { Types } from "bc-minecraft-bedrock-types";
import { DataSet, TextDocument } from "../../types";
import { GeneralInfo } from "./types/general-info";
/**The class GeneralCollection description*/
export declare class GeneralCollection {
    /** */
    readonly fakeEntities: DataSet<GeneralInfo>;
    /** */
    readonly objectives: DataSet<GeneralInfo>;
    /** */
    readonly structures: DataSet<GeneralInfo>;
    /** */
    readonly tags: DataSet<GeneralInfo>;
    /** */
    readonly tickingAreas: DataSet<GeneralInfo>;
    constructor();
    /**
     *
     * @param doc
     * @returns
     */
    process(doc: TextDocument): void | this;
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
    /**
     *
     * @param predicate
     * @returns
     */
    forEach(callbackfn: (value: Types.BaseObject) => void): void;
}
