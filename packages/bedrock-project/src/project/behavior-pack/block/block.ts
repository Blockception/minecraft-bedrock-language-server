
import { MolangSet } from 'bc-minecraft-molang';
import { BlockState } from './block-state';
import { BaseObject } from 'bc-minecraft-bedrock-types';

/** */
export interface Block extends BaseObject {
  /** */
  molang: MolangSet;
  /** */
  states: BlockState[];
}
