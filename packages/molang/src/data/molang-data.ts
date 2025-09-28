import { Animations as MAnimations } from "./animations";
import { AnimationsControllers as MAnimationsControllers } from "./animations-controllers";
import { Attachables as MAttachables } from "./attachables";
import { Blocks as MBlocks } from "./blocks";
import { Data } from "./data";
import { Entities as MEntities } from "./entities";
import { FeaturesRules as MFeaturesRules } from "./features-rules";
import { General as MGeneral } from "./general";
import { Items as MItems } from "./items";
import { Particles as MParticles } from "./particles";
import { RenderControllers as MRenderControllers } from "./render-controllers";

/**Molang data for all types*/
export interface MolangDataSet {
  /**Molang data for variables*/
  Variables: Data[];
  /**Molang data for contexts*/
  Contexts: Data[];
  /**Molang data for temp variables*/
  Temps: Data[];
}

/**
 * Molang data for all types
 */
export namespace MolangData {
  /**Molang data for animations*/
  export const Animations = MAnimations;
  /**Molang data for animations controllers*/
  export const AnimationsControllers = MAnimationsControllers;
  /**Molang data for attachables*/
  export const Attachables = MAttachables;
  /**Molang data for blocks*/
  export const Blocks = MBlocks;
  /**Molang data for entities*/
  export const Entities = MEntities;
  /**Molang data for features rules*/
  export const FeaturesRules = MFeaturesRules;
  /**Molang data for general*/
  export const General = MGeneral;
  /**Molang data for items*/
  export const Items = MItems;
  /**Molang data for particles*/
  export const Particles = MParticles;
  /**Molang data for render controllers*/
  export const RenderControllers = MRenderControllers;

  /** Returns the specified type of molang data */
  export function get(type: MolangDataSetKey): MolangDataSet {
    return MolangData[type] as MolangDataSet;
  }
}

/**
 * The list of all types
 */
export type MolangDataSetKey =
  | "Animations"
  | "AnimationsControllers"
  | "Attachables"
  | "Blocks"
  | "Entities"
  | "FeaturesRules"
  | "General"
  | "Items"
  | "Particles"
  | "RenderControllers";
