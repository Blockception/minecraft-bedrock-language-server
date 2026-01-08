import { Identifiable } from 'bc-minecraft-bedrock-shared';

/**
 *
 */
export interface Entity extends Identifiable {
  /**
   *
   */
  animations: string[];
}

/**
 *
 */
export namespace Entity {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Entity {
    if (value) {
      if (typeof value.id === "string" && Array.isArray(value.animations)) return true;
    }

    return false;
  }
}
