import { Types } from "bc-minecraft-bedrock-types";
import { MolangSet } from "bc-minecraft-molang/lib/src/molang";

/** */
export interface Item extends Types.BaseObject {
  /** */
  molang: MolangSet;
  /** */
  isFood: boolean;
}
