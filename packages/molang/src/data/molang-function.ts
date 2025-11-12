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
  /**
   * If true, this parameter can be repeated indefinitely.
   * When a parameter is repeatable, the function can accept any number of additional arguments
   * matching this parameter's type.
   */
  repeatable?: boolean;
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
