"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
/** */
var Character;
(function (Character) {
    Character.Character_a = 'a'.charCodeAt(0);
    Character.Character_z = 'z'.charCodeAt(0);
    Character.Character_A = 'A'.charCodeAt(0);
    Character.Character_Z = 'Z'.charCodeAt(0);
    Character.Character_0 = '0'.charCodeAt(0);
    Character.Character_9 = '9'.charCodeAt(0);
    /** `_` */
    Character.Character_underscore = '_'.charCodeAt(0);
    /** `-` */
    Character.Character_dash = '-'.charCodeAt(0);
    /** `/` */
    Character.Character_forwardslash = '/'.charCodeAt(0);
    /** `:` */
    Character.Character_column = ':'.charCodeAt(0);
    /** `.` */
    Character.Character_dot = '.'.charCodeAt(0);
    /**Tests if the first character of the provide string is a letter
     * @param char The string to test the first character from
     * @returns true or false*/
    function IsLetter(char) {
        const code = char.charCodeAt(0);
        if (code >= Character.Character_a && code <= Character.Character_z)
            return true;
        if (code >= Character.Character_A && code <= Character.Character_Z)
            return true;
        return false;
    }
    Character.IsLetter = IsLetter;
    /**Tests if the first character of the provide string is an uppercase letter
     * @param char The string to test the first character from
     * @returns true or false*/
    function IsUppercase(char) {
        const code = char.charCodeAt(0);
        if (code >= Character.Character_A && code <= Character.Character_Z)
            return true;
        return false;
    }
    Character.IsUppercase = IsUppercase;
    /**Tests if the character code is a letter
     * @param char the character code is a letter
     * @returns true or false*/
    function IsLetterCode(char) {
        if (char >= Character.Character_a && char <= Character.Character_z)
            return true;
        if (char >= Character.Character_A && char <= Character.Character_Z)
            return true;
        return false;
    }
    Character.IsLetterCode = IsLetterCode;
    /**Tests if the first character is a number
     * @param char the character code is a letter
     * @returns true or false*/
    function IsNumber(char) {
        const code = char.charCodeAt(0);
        if (code >= Character.Character_0 && code <= Character.Character_9)
            return true;
        return false;
    }
    Character.IsNumber = IsNumber;
    /**Tests if the character code is a number
     * @param char the character code is a letter
     * @returns true or false*/
    function IsNumberCode(char) {
        if (char >= Character.Character_0 && char <= Character.Character_9)
            return true;
        return false;
    }
    Character.IsNumberCode = IsNumberCode;
})(Character || (exports.Character = Character = {}));
//# sourceMappingURL=character.js.map