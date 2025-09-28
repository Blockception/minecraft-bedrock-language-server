/** */
export namespace XP {
  /**The regex pattern that matches a XP value */
  export const pattern: RegExp = /^([-\d]*|[-\d]*[Ll])$/;

  /**Checks if the given text value is a valid xp value
   * @param text The valued to check
   * @returns True or false if the text represents an xp value*/
  export function is(text: string): boolean {
    return pattern.test(text);
  }

  /**Checks if the XP is a value specification
   * @param text The valued to check
   * @returns True or false if the xp is not a level spec*/
  export function isLevel(text: string): boolean {
    return text.endsWith("l") || text.endsWith("L");
  }

  /**Parses the given xp into a number
   * @param text The text to convert*/
  export function parse(text: string): number {
    if (isLevel(text)) {
      text = text.slice(0, text.length - 1);
    }

    return Number.parseInt(text);
  }
}
