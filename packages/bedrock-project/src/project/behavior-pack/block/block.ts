
import { MolangSet } from 'bc-minecraft-molang';
import { BlockState } from './block-state';

/** */
export interface Block extends BaseObject {
  /** */
  molang: MolangSet;
  /** */
  states: BlockState[];
}
