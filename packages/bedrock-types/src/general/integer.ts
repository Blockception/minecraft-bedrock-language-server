/** The namespace for the integer type*/
export namespace Integer {
  /**The regex pattern that matches a integer */
  export const pattern: RegExp = /^[-\d]*$/;

  /**Checks if the given text value is a valid integer
   * @param value The valued to compare to
   * @returns True or false if the text represents a integer*/
  export function is(text: string): boolean {
    return pattern.test(text);
  }
}
