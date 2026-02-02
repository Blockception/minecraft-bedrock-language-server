import { Identifiable, Documentated } from 'bc-minecraft-bedrock-shared';

/**
 *
 */
export interface MolangFunction extends Identifiable, Documentated {
  /**
   *
   */
  parameters?: MolangParameter[];

  /**If present, then the molang is deprecated and needs to be replaced*/
  deprecated?: string;

  /**If present, specifies which pack type this function is available in. 
   * 'behavior' means it's only available in Behavior Packs (server-side)
   * 'resource' means it's only available in Resource Packs (client-side)
   * If undefined or null, the function is available in both pack types*/
  packType?: 'behavior' | 'resource';
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
export interface MolangParameter extends Identifiable, Documentated {
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
