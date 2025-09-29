import { ParameterType } from '../types/parameter-type';

/**An interface that carries additional obsolete info*/
export interface ObsoleteInfo {
  /**The message to be displayed */
  message: string;
  /**The error code to use*/
  code: string | number;
  /**The version in which the command was removed*/
  format_version?: string;
}

/**A single command syntax*/
export interface CommandInfo {
  /**The name of the command*/
  name: string;
  /**The documentation that goes with this syntax*/
  documentation: string;
  /**The parameter that make this particular syntax*/
  parameters: ParameterInfo[];
  /**Marks */
  obsolete?: boolean | ObsoleteInfo;
  /**The permission level required to use this command*/
  permission_level: number;
}

/**The information of a single parameter.*/
export interface ParameterInfo {
  /**The text/keyword of the parameter.*/
  text: string;
  /**The type of the parameter.*/
  type: ParameterType;
  /**True if this parameter is required, else false.*/
  required: boolean;

  /**The optional options for this parameter.*/
  options?: ParameterOptions;
}

/**The optional options for a given parameter.*/
export interface ParameterOptions {
  /**if defined, these values are always accepted, no evaluation anymore required.*/
  acceptedValues?: string[];

  /**Minimum value or amount of numbers.*/
  minimum?: number;
  /**Maximum value or amount of numbers.*/
  maximum?: number;

  /**Whether or not this parameter is aimed at players only, excluding entities .*/
  playerOnly?: boolean;
  /**Whether or not fake / dummy players are allowed.*/
  allowFakePlayers?: boolean;

  /**If the wild card: '*' is allowed.*/
  wildcard?: boolean;
}
