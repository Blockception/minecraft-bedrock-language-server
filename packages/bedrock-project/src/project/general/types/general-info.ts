/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Location } from 'bc-minecraft-bedrock-shared';
import { BaseObject } from 'bc-minecraft-bedrock-types';
import { Text } from '../../../types';

/**
 *
 */
export interface GeneralInfo extends BaseObject {}

/**
 *
 */
export namespace GeneralInfo {
  /**
   *
   * @param id
   * @param location
   * @param documentation
   * @returns
   */
  export function create(
    id: string,
    location: Location,
    documentation: string | undefined = undefined,
  ): GeneralInfo {
    id = Text.UnQuote(id);

    return {
      id: id,
      location: location,
      documentation: documentation,
    };
  }
}
