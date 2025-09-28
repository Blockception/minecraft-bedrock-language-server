import { BlockState } from "../Types/BehaviorPack/BlockState";

/**The summarized data set for blocks in minecraft*/
export interface GeneralBlock {
  /**summarized data set of block_states*/
  block_states: BlockState[];
}

/**Summarized data set for entities in minecraft*/
export interface GeneralEntity {
  /**summarized data set of entity events*/
  events: string[];

  /**summarized data set of entity families*/
  families: string[];
}
