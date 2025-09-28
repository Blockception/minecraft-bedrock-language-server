/** */
export namespace timeInTicks {
  /**The regex pattern that matches a time value */
  export const pattern: RegExp = /^([-\d]*|[-\d]*[TDS])$/;

  /**Checks if the given text value is a valid time value
   * @param text The valued to check
   * @returns True or false if the text represents an time value*/
  export function is(text: string): boolean {
    return pattern.test(text);
  }

  /**Checks if the time is a value specification
   * @param text The valued to check
   * @returns True or false if the time is not a tick spec*/
  export function isTick(text: string): boolean {
    return text.endsWith("T");
  }

  /**Checks if the time is a value specification
   * @param text The valued to check
   * @returns True or false if the time is not a second spec*/
  export function isSecond(text: string): boolean {
    return text.endsWith("S");
  }

  /**Checks if the time is a value specification
   * @param text The valued to check
   * @returns True or false if the time is not a day spec*/
  export function isDay(text: string): boolean {
    return text.endsWith("D");
  }

  /**Parses the given time into a number
   * @param text The text to convert*/
  export function parse(text: string): number {

    if (isDay(text)) {
      return Number.parseInt(text.slice(0, text.length - 1)) * 24000;
    }

    if (isSecond(text)) {
      return Number.parseInt(text.slice(0, text.length - 1)) * 20;
    }

    if (isTick(text)) {
      return Number.parseInt(text.slice(0, text.length - 1));
    }

    return Number.parseInt(text);
  }
}
