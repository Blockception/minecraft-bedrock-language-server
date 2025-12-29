/**
 * A conditional object
 * @example { "walk.anim": "query.random" }
 */
export interface Conditional {
  /**The id is an animation / controller that is to be activated if the string value is evaluated to be 1.0 or higher*/
  [id: string]: string | number;
}

/**
 * The namespace of the conditional
 */
export namespace Conditional {
  /**
   * Returns the identification of the conditional
   * @param data Either a conditional object or a string
   * @returns Returns the identification string (property key) or the string itself
   */
  export function getId(data: Conditional | string): string {
    if (typeof data === 'string') return data;

    return Object.getOwnPropertyNames(data)[0] ?? '';
  }

  /**
   * Returns the condition value of the conditional
   * @param data Either a conditional object or a string
   * @returns Returns the condition value or 1.0 if a string was provided
   */
  export function getCondition(data: Conditional | string): string | number {
    if (typeof data === 'string') return '1.0';

    const id = Object.getOwnPropertyNames(data)[0];

    if (id) return data[id] ?? '1.0';

    return '1.0';
  }

  /**
   * Iterates through each conditional or string in the provided array
   * @param data An array of conditional objects or strings
   * @param callbackfn A callback function that is called for each item
   */
  export function forEach(
    data: (Conditional | string)[] | Conditional[] | string[] | undefined,
    callbackfn: (id: string, value: string | number, index: number, data: (Conditional | string)[]) => void,
  ): void {
    if (!data) return;

    data.forEach((item, index) => {
      if (typeof item === 'string') {
        callbackfn(item, '1.0', index, data);
        return;
      }

      //Is an conditional
      const id = Object.getOwnPropertyNames(item)[0];

      if (id) callbackfn(id, item[id] ?? '1.0', index, data);
    });
  }
}
