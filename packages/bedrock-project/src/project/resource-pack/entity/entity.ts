import { Types } from "bc-minecraft-bedrock-types";
import { MolangSet } from "bc-minecraft-molang/lib/src/molang";
import { References } from "../../../types/references";

/** */
export interface Entity extends Types.BaseObject {
  /** */
  animations: References;
  /** */
  molang: MolangSet;
}
