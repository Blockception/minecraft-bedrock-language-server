/** */
export namespace Character {
  export const CharacterLowerA: number = 'a'.charCodeAt(0);
  export const CharacterLowerZ: number = 'z'.charCodeAt(0);
  export const CharacterUpperA: number = 'A'.charCodeAt(0);
  export const CharacterUpperZ: number = 'Z'.charCodeAt(0);
  export const Character0: number = '0'.charCodeAt(0);
  export const Character9: number = '9'.charCodeAt(0);

  export const CharacterUnderscore: number = '_'.charCodeAt(0);
  export const CharacterDash: number = '-'.charCodeAt(0);
  export const CharacterForwardslash: number = '/'.charCodeAt(0);
  export const CharacterColumn: number = ':'.charCodeAt(0);

  /** */
  export function IsLetter(char: string): boolean {
    const code = char.charCodeAt(0);

    if (code >= CharacterLowerA && code <= CharacterLowerZ) return true;
    if (code >= CharacterUpperA && code <= CharacterUpperZ) return true;

    return false;
  }

  /** */
  export function IsLetterCode(char: number): boolean {
    if (char >= CharacterLowerA && char <= CharacterLowerZ) return true;
    if (char >= CharacterUpperA && char <= CharacterUpperZ) return true;

    return false;
  }

  /** */
  export function IsNumber(char: string): boolean {
    const code = char.charCodeAt(0);

    if (code >= Character0 && code <= Character9) return true;

    return false;
  }

  /** */
  export function IsNumberCode(char: number): boolean {
    if (char >= Character0 && char <= Character9) return true;

    return false;
  }
}
