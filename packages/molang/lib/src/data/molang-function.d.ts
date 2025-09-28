import { Types } from "bc-minecraft-bedrock-types";
/**
 *
 */
export interface MolangFunction extends Types.Identifiable, Types.Documentated {
    /**
     *
     */
    parameters?: MolangParameter[];
    /**If present, then the molang is deprecated and needs to be replaced*/
    deprecated?: string;
}
/**
 *
 */
export declare namespace MolangFunction {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is MolangFunction;
}
/**
 *
 */
export interface MolangParameter extends Types.Identifiable, Types.Documentated {
    /** */
    range?: {
        min: number;
        max: number;
    };
    /**
     *
     */
    type?: "boolean" | "float" | "string";
}
/**
 *
 */
export declare namespace MolangParameter {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is MolangParameter;
}
