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
export declare namespace MolangData {
    /**Molang data for animations*/
    const Animations: typeof MAnimations;
    /**Molang data for animations controllers*/
    const AnimationsControllers: typeof MAnimationsControllers;
    /**Molang data for attachables*/
    const Attachables: typeof MAttachables;
    /**Molang data for blocks*/
    const Blocks: typeof MBlocks;
    /**Molang data for entities*/
    const Entities: typeof MEntities;
    /**Molang data for features rules*/
    const FeaturesRules: typeof MFeaturesRules;
    /**Molang data for general*/
    const General: typeof MGeneral;
    /**Molang data for items*/
    const Items: typeof MItems;
    /**Molang data for particles*/
    const Particles: typeof MParticles;
    /**Molang data for render controllers*/
    const RenderControllers: typeof MRenderControllers;
    /** Returns the specified type of molang data */
    function get(type: MolangDataSetKey): MolangDataSet;
}
/**
 * The list of all types
 */
export type MolangDataSetKey = "Animations" | "AnimationsControllers" | "Attachables" | "Blocks" | "Entities" | "FeaturesRules" | "General" | "Items" | "Particles" | "RenderControllers";
