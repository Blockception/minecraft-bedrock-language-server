
import { MolangSet } from 'bc-minecraft-molang';
import { Defined, References } from '../../../types/references';
import { EntityProperty } from './properties';
import { BaseObject } from 'bc-minecraft-bedrock-types';

/** */
export interface Entity extends BaseObject {
  /** */
  runtime_identifier: string;
  /** */
  molang: MolangSet;
  /** */
  groups: Defined;
  /** */
  events: Defined;
  /** */
  families: Defined;
  /** */
  animations: References;
  /** */
  properties: EntityProperty[];
}
