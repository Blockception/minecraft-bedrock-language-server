import { Types } from "bc-minecraft-bedrock-types";
import { MolangSet } from "bc-minecraft-molang/lib/src/molang";
import { Using } from "../../../types/references";

/** */
export interface Animation extends Types.BaseObject {
  /** */
  molang: MolangSet;
  /** */
  particles: Using;
  /** */
  sounds: Using;
}
