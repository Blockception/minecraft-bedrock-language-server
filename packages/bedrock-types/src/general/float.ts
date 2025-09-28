/** The namespace for the float type */
export namespace Float {
  /**The regex pattern that matches a float */
  export const pattern: RegExp = /^[-.\d]*$/;

  /**Checks if the given text value is a valid float
   * @param value The valued to compare to
   * @returns True or false if the text represents a float*/
  export function is(text: string): boolean {
    return pattern.test(text);
  }
}
