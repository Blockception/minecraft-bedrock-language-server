
import { MolangSet } from 'bc-minecraft-molang';
import { References } from '../../../types/references';

/** */
export interface Entity extends BaseObject {
  /** */
  animations: References;
  /** */
  molang: MolangSet;
}
