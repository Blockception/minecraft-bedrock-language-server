import { Types } from 'bc-minecraft-bedrock-types';

/**
 *
 */
export interface MolangFunction extends Types.Identifiable, Types.Documentated {
  /**
   *
   */
  parameters?: MolangParameter[];

  /**If present, then the molang is deprecated and needs to be replaced*/
  deprecated?: string;

  /**
   * If present, specifies the minimum number of parameters required.
   * When set, the function can accept any number of parameters >= minParams.
   * This is used for functions like query.is_owner_identifier_any that accept variable arguments.
   */
  minParams?: number;
}

/**
 *
 */
export namespace MolangFunction {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is MolangFunction {
    if (typeof value === 'object') {
      if (typeof value.id === 'string') return true;
    }

    return false;
  }
}

/**
 *
 */
export interface MolangParameter extends Types.Identifiable, Types.Documentated {
  /** */
  range?: { min: number; max: number };
  /**
   *
   */
  type?: 'boolean' | 'float' | 'string';
}

/**
 *
 */
export namespace MolangParameter {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is MolangParameter {
    if (typeof value === 'object') {
      if (typeof value.id === 'string') return true;
    }

    return false;
  }
}
