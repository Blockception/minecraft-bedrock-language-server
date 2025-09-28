import { Types } from "bc-minecraft-bedrock-types";
import { MolangSet } from "bc-minecraft-molang/lib/src/molang";
import { Using } from "../../../types";
/** */
export interface Animation extends Types.BaseObject {
    /** */
    molang: MolangSet;
    /** */
    events: Using;
}
