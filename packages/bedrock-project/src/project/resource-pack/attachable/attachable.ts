import { Types } from "bc-minecraft-bedrock-types";
import { MolangSet } from "bc-minecraft-molang";
import { References } from "../../../types/references";

/** */
export interface Attachable extends Types.BaseObject {
  /** */
  animations: References;
  /** */
  molang: MolangSet;
}
