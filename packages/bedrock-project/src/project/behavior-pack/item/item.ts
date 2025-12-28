import { BaseObject } from 'bc-minecraft-bedrock-types';
import { MolangSet } from 'bc-minecraft-molang';

/** */
export interface Item extends BaseObject {
  /** */
  molang: MolangSet;
  /** */
  isFood: boolean;
}
