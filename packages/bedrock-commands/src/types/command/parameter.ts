/**A parameter in a command, represent a single 'word' */
export class Parameter {
  /**The offset of the word in the document*/
  public offset: number;
  /**The text of the parameter*/
  public text: string;

  /**Creates a new instance of the parameter
   * @param text The text to assign
   * @param offset The offset to assign*/
  constructor(text: string = "", offset: number = 0) {
    this.offset = offset;
    this.text = text;
  }
}

/**The namespace surrounding the parameter object*/
export namespace Parameter {
  /**Checks if the given instance implements the Parameter object
   * @param value The value to evaluate
   * @returns true or false if the object implements the Parameter object or not*/
  export function is(value: any): value is Parameter {
    if (value && typeof value.offset === "number" && typeof value.text === "string") return true;

    return false;
  }
}
