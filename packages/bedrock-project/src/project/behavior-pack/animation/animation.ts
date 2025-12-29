import { BaseObject } from 'bc-minecraft-bedrock-types';
import { MolangSet } from 'bc-minecraft-molang';
import { Using } from '../../../types';

/** */
export interface Animation extends BaseObject {
  /** */
  molang: MolangSet;
  /** */
  events: Using;
}
