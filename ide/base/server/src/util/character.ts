/** */
export namespace Character {
  export const CharacterLowerA: number = 'a'.charCodeAt(0);
  export const CharacterLowerZ: number = 'z'.charCodeAt(0);
  export const CharacterUpperA: number = 'A'.charCodeAt(0);
  export const CharacterUpperZ: number = 'Z'.charCodeAt(0);
  export const Character0: number = '0'.charCodeAt(0);
  export const Character9: number = '9'.charCodeAt(0);

  /** `_` */
  export const CharacterUnderscore: number = '_'.charCodeAt(0);
  /** `-` */
  export const CharacterDash: number = '-'.charCodeAt(0);
  /** `/` */
  export const CharacterForwardslash: number = '/'.charCodeAt(0);
  /** `:` */
  export const CharacterColumn: number = ':'.charCodeAt(0);
  /** `.` */
  export const CharacterDot: number = '.'.charCodeAt(0);

  /**Tests if the first character of the provide string is a letter
   * @param char The string to test the first character from
   * @returns true or false*/
  export function IsLetter(char: string): boolean {
    const code = char.charCodeAt(0);

    if (code >= CharacterLowerA && code <= CharacterLowerZ) return true;
    if (code >= CharacterUpperA && code <= CharacterUpperZ) return true;

    return false;
  }

  /**Tests if the first character of the provide string is an uppercase letter
   * @param char The string to test the first character from
   * @returns true or false*/
  export function IsUppercase(char: string): boolean {
    const code = char.charCodeAt(0);

    if (code >= CharacterUpperA && code <= CharacterUpperZ) return true;

    return false;
  }

  /**Tests if the character code is a letter
   * @param char the character code is a letter
   * @returns true or false*/
  export function IsLetterCode(char: number): boolean {
    if (char >= CharacterLowerA && char <= CharacterLowerZ) return true;
    if (char >= CharacterUpperA && char <= CharacterUpperZ) return true;

    return false;
  }

  /**Tests if the first character is a number
   * @param char the character code is a letter
   * @returns true or false*/
  export function IsNumber(char: string): boolean {
    const code = char.charCodeAt(0);

    if (code >= Character0 && code <= Character9) return true;

    return false;
  }

  /**Tests if the character code is a number
   * @param char the character code is a letter
   * @returns true or false*/
  export function IsNumberCode(char: number): boolean {
    if (char >= Character0 && char <= Character9) return true;

    return false;
  }
}
