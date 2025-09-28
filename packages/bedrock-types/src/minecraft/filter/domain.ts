/** The type of domain */
export type DomainType = "any" | "armor" | "feet" | "hand" | "head" | "leg" | "torso";

export namespace DomainType {
  /**
   * Tries to convert the given text to a DomainType
   * @param text The text to convert
   * @returns The DomainType or undefined
   */
  export function parse(text: string): DomainType {
    switch (text) {
      case "any":
      case "armor":
      case "feet":
      case "hand":
      case "head":
      case "leg":
      case "torso":
        return text;

      default:
        return "any";
    }
  }
}
