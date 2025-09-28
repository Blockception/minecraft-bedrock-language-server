/** The boolean data type, but related to minecraft */
export namespace Boolean {
  /**Checks if the given text value is a valid boolean
   * @param value The valued to compare to
   * @returns True or false if the text represents a boolean*/
  export function is(value: string | boolean): boolean {
    switch (value) {
      case "false":
      case "False":
      case "true":
      case "True":
      case false:
      case true:
        return true;

      default:
        return false;
    }
  }

  /**Parses the text value to a boolean value
   * @param value The text value comparing
   * @returns True or false if the text represents a boolean*/
  export function parse(value: string | boolean): boolean {
    switch (value) {
      case "True":
      case "true":
      case "1":
      case true:
        return true;

      default:
      case false:
        return false;
    }
  }
}
