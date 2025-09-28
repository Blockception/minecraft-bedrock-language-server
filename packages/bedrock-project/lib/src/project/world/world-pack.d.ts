import { Types } from "bc-minecraft-bedrock-types";
import { MCProject } from "bc-minecraft-project";
import { Manifest } from "../../internal/types";
import { Container, DataSetBase, Pack } from "../../types";
import { PackType } from "../pack-type";
/** */
export declare class WorldPack implements Container, Pack {
    readonly type: PackType;
    readonly folder: string;
    readonly context: MCProject;
    readonly manifest: Manifest;
    /**
     * Creates a new instance of WorldPack
     * @param folder The folder of the behavior
     * @param Context The Mcproject data or the filepath to read from.*/
    constructor(folder: string, Context: MCProject | string, manifest: Manifest);
    /**
     *
     * @param doc
     */
    process(): DataSetBase | undefined;
    /**
     *
     * @param uri
     * @returns
     */
    getDataset(): DataSetBase | undefined;
    /**
     *
     * @param uri
     * @returns
     */
    deleteFile(): boolean;
    /**
     *
     * @param uri
     */
    deleteFolder(): boolean;
    /**
     *
     * @param predicate
     * @returns
     */
    find(): Types.BaseObject | undefined;
    /**
     *
     * @param predicate
     * @returns
     */
    forEach(): void;
}
/**
 *
 */
export declare namespace WorldPack {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is WorldPack;
}
