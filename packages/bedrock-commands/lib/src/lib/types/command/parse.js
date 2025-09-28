"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterBuilder = void 0;
exports.GetParameters = GetParameters;
/**The interface of a basic word builder*/
class ParameterBuilder {
    /**Creates a new instance of the ParameterBuilder
     * @param offset The offset the text will start at*/
    constructor(offset = 0) {
        this.offset = offset;
        this.items = [];
    }
    /**Add the given text as a word to the internal list, starting at the given offset
     * @param text The word text
     * @param offset The offset where the word was found*/
    Add(text, offset) {
        this.items.push({ offset: offset + this.offset, text: text });
    }
}
exports.ParameterBuilder = ParameterBuilder;
/**A function that shits through the text looking for parameters. Sends found parameters to the builder
 * @param text The text to parse
 * @param Builder The builder to report to*/
function GetParameters(text, Builder) {
    let level = 0;
    let startIndex = 0;
    let inString = false;
    for (let index = 0; index < text.length; index++) {
        const c = text.charAt(index);
        //If inString or not
        if (inString) {
            //Is end of string and not escaped?
            if (c == '"' && text.charAt(index - 1) !== "\\")
                inString = false;
        }
        else {
            //Switch on character
            switch (c) {
                //Its a string start
                case '"':
                    inString = true;
                    break;
                //Bracket start
                case "[":
                case "(":
                case "{":
                    level++;
                    break;
                //Bracket end
                case "]":
                case ")":
                case "}":
                    level--;
                    break;
                //Empty spaces
                case " ":
                case "\t":
                    if (level == 0) {
                        if (startIndex < index) {
                            const word = text.substring(startIndex, index).trim();
                            Builder.Add(word, startIndex);
                        }
                        startIndex = index + 1;
                    }
                    break;
                //Coordinates start
                case "~":
                case "^":
                    if (level == 0) {
                        if (startIndex < index) {
                            const word = text.substring(startIndex, index).trim();
                            Builder.Add(word, startIndex);
                        }
                        startIndex = index;
                    }
                    break;
                default:
                    break;
            }
        }
        if (level < 0)
            break;
    }
    if (startIndex < text.length) {
        const word = text.substring(startIndex, text.length).trim();
        Builder.Add(word, startIndex);
    }
}
//# sourceMappingURL=parse.js.map