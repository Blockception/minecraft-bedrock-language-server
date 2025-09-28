import { Types } from "bc-minecraft-bedrock-types";
import { MolangSet } from "bc-minecraft-molang/lib/src/molang";
import { Defined, References } from "../../../types/references";
import { EntityProperty } from "./properties";

/** */
export interface Entity extends Types.BaseObject {
  /** */
  runtime_identifier: string;
  /** */
  molang: MolangSet;
  /** */
  groups: Defined;
  /** */
  events: Defined;
  /** */
  families: Defined;
  /** */
  animations: References;
  /** */
  properties: EntityProperty[];
}
