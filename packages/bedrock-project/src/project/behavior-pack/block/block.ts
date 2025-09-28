import { Types } from "bc-minecraft-bedrock-types";
import { MolangSet } from "bc-minecraft-molang/lib/src/molang";
import { BlockState } from "./block-state";

/** */
export interface Block extends Types.BaseObject {
  /** */
  molang: MolangSet;
  /** */
  states: BlockState[];
}
