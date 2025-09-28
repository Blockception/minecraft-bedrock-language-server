import { Types } from "bc-minecraft-bedrock-types";
import { Defined } from "../../../types";

/** */
export interface Model extends Types.BaseObject {
  /** If the 0th bone includes a binding assuming that the 0th bone is the root bone as that's how BB exports */
  root_bone_uses_binding: boolean;
  /** The name of all the bones in the model */
  bones: Defined;
  /** The name of all the locators in the model */
  locators: Defined;
}
