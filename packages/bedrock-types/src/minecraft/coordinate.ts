/** */
export namespace Coordinate {
  /**The regex pattern that matches a coordinate */
  export const pattern: RegExp = /^[~^+\-\d][+\-.\d]*$/;

  /**Checks if the given text value is a valid coordinate
   * @param value The valued to compare to
   * @returns True or false if the text represents a coordinate*/
  export function is(text: string): boolean {
    return pattern.test(text);
  }
}
