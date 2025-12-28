
import { MolangSet } from 'bc-minecraft-molang';
import { Using } from '../../../types';

//TODO add events

/** */
export interface Animation extends BaseObject {
  /** */
  molang: MolangSet;
  /** */
  events: Using;
}
