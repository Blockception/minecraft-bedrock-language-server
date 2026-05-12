/** */
export declare namespace Character {
    const Character_a: number;
    const Character_z: number;
    const Character_A: number;
    const Character_Z: number;
    const Character_0: number;
    const Character_9: number;
    /** `_` */
    const Character_underscore: number;
    /** `-` */
    const Character_dash: number;
    /** `/` */
    const Character_forwardslash: number;
    /** `:` */
    const Character_column: number;
    /** `.` */
    const Character_dot: number;
    /**Tests if the first character of the provide string is a letter
     * @param char The string to test the first character from
     * @returns true or false*/
    function IsLetter(char: string): boolean;
    /**Tests if the first character of the provide string is an uppercase letter
     * @param char The string to test the first character from
     * @returns true or false*/
    function IsUppercase(char: string): boolean;
    /**Tests if the character code is a letter
     * @param char the character code is a letter
     * @returns true or false*/
    function IsLetterCode(char: number): boolean;
    /**Tests if the first character is a number
     * @param char the character code is a letter
     * @returns true or false*/
    function IsNumber(char: string): boolean;
    /**Tests if the character code is a number
     * @param char the character code is a letter
     * @returns true or false*/
    function IsNumberCode(char: number): boolean;
}
//# sourceMappingURL=character.d.ts.map