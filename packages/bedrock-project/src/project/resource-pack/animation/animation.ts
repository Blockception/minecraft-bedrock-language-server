
import { MolangSet } from 'bc-minecraft-molang';
import { Using } from '../../../types/references';

/** */
export interface Animation extends BaseObject {
  /** */
  molang: MolangSet;
  /** */
  particles: Using;
  /** */
  sounds: Using;
}
