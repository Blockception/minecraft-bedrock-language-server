"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const character_1 = require("./character");
describe('Character', () => {
    const letters = ['a', 'A', 'z', 'Z'];
    const not_letters = ['0', '5', '$', '%'];
    test.each(letters)(`IsLetter($letter)`, (letter) => {
        expect(character_1.Character.IsLetter(letter)).toBeTruthy();
    });
    test.each(not_letters)(`IsLetter($letter)`, (letter) => {
        expect(character_1.Character.IsLetter(letter)).toBeFalsy();
    });
    test('IsUpperCase', () => {
        expect(character_1.Character.IsUppercase('A')).toBeTruthy();
        expect(character_1.Character.IsUppercase('Z')).toBeTruthy();
        expect(character_1.Character.IsUppercase('a')).toBeFalsy();
        expect(character_1.Character.IsUppercase('z')).toBeFalsy();
        expect(character_1.Character.IsUppercase('0')).toBeFalsy();
        expect(character_1.Character.IsUppercase('5')).toBeFalsy();
        expect(character_1.Character.IsUppercase('$')).toBeFalsy();
        expect(character_1.Character.IsUppercase('%')).toBeFalsy();
    });
    test('IsNumber', () => {
        expect(character_1.Character.IsNumber('0')).toBeTruthy();
        expect(character_1.Character.IsNumber('5')).toBeTruthy();
        expect(character_1.Character.IsNumber('a')).toBeFalsy();
        expect(character_1.Character.IsNumber('A')).toBeFalsy();
        expect(character_1.Character.IsNumber('z')).toBeFalsy();
        expect(character_1.Character.IsNumber('Z')).toBeFalsy();
        expect(character_1.Character.IsNumber('$')).toBeFalsy();
        expect(character_1.Character.IsNumber('%')).toBeFalsy();
    });
    test('IsLetter Code', () => {
        expect(character_1.Character.IsLetterCode('a'.charCodeAt(0))).toBeTruthy();
        expect(character_1.Character.IsLetterCode('A'.charCodeAt(0))).toBeTruthy();
        expect(character_1.Character.IsLetterCode('z'.charCodeAt(0))).toBeTruthy();
        expect(character_1.Character.IsLetterCode('Z'.charCodeAt(0))).toBeTruthy();
        expect(character_1.Character.IsLetterCode('0'.charCodeAt(0))).toBeFalsy();
        expect(character_1.Character.IsLetterCode('5'.charCodeAt(0))).toBeFalsy();
        expect(character_1.Character.IsLetterCode('$'.charCodeAt(0))).toBeFalsy();
        expect(character_1.Character.IsLetterCode('%'.charCodeAt(0))).toBeFalsy();
    });
    test('IsNumber Code', () => {
        expect(character_1.Character.IsNumberCode('0'.charCodeAt(0))).toBeTruthy();
        expect(character_1.Character.IsNumberCode('5'.charCodeAt(0))).toBeTruthy();
        expect(character_1.Character.IsNumberCode('a'.charCodeAt(0))).toBeFalsy();
        expect(character_1.Character.IsNumberCode('A'.charCodeAt(0))).toBeFalsy();
        expect(character_1.Character.IsNumberCode('z'.charCodeAt(0))).toBeFalsy();
        expect(character_1.Character.IsNumberCode('Z'.charCodeAt(0))).toBeFalsy();
        expect(character_1.Character.IsNumberCode('$'.charCodeAt(0))).toBeFalsy();
        expect(character_1.Character.IsNumberCode('%'.charCodeAt(0))).toBeFalsy();
    });
});
//# sourceMappingURL=character.test.js.map