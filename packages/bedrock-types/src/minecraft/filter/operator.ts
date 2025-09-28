/** The operator type */
export type OperatorType = "!=" | "<" | "<=" | "<>" | "=" | "==" | ">" | ">=" | "equals" | "not";

/** The operator type */
export namespace OperatorType {
  /**
   * Parses the given text into a operator type
   * @param text The text to parse
   * @returns The parsed operator type
   * @throws When the text is not a valid operator type
   */
  export function parse(text: string): OperatorType {
    switch (text) {
      case "!=":
      case "<":
      case "<=":
      case "<>":
      case "=":
      case "==":
      case ">":
      case ">=":
      case "equals":
      case "not":
        return text;

      default:
        throw new Error(`Unknown operator type: ${text}`);
    }
  }
}
