/** The namespace for the string functions */
export namespace String {
  /**Checks if the given text value is a valid string
   * @param value The valued to compare to
   * @returns True or false if the text represents an string*/
  export function is(value: string): boolean {
    if (value.includes(" ")) {
      if (value.startsWith('"') && value.endsWith('"')) return true;

      return false;
    }

    return true;
  }
}
