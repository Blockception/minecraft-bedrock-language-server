/**
 * The namespace for the json values as strings
 */
export namespace Json {
  /**Checks if the given text value is a valid json object
   * @param value The valued to compare to
   * @returns True or false if the text represents an json obect*/
  export function isObject(value: string): boolean {
    if (value.startsWith("{") && value.endsWith("}")) return true;

    return false;
  }

  /**Checks if the given text value is a valid jsob array
   * @param value The valued to compare to
   * @returns True or false if the text represents an json array*/
  export function isArray(value: string): boolean {
    if (value.startsWith("[") && value.endsWith("]")) return true;

    return false;
  }
}
