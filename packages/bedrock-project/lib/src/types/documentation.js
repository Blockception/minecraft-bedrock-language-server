"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Documentation = void 0;
/** */
var Documentation;
(function (Documentation) {
    /**Retrieves the comment from the first line or uses the given default to generate a default line of documentation
     * @param receiver The receiving object
     * @param doc The text document to read from
     * @param ifDefault The default text is nothing is found in the document*/
    function setDoc(receiver, doc, ifDefault = undefined) {
        receiver.documentation = getDoc(doc, ifDefault);
    }
    Documentation.setDoc = setDoc;
    /**Retrieves the comment from the first line or uses the given default to generate a default line of documentation
     * @param doc The text document to read from
     * @param ifDefault The default text is nothing is found in the document*/
    function getDoc(doc, ifDefault = undefined, offset) {
        let documentation;
        //If specific spot is mentioned
        if (offset !== undefined) {
            //Get comment on current line
            documentation = getDocumentation(doc, offset);
            if (documentation)
                return documentation;
            //Get comment on previous line
            offset = findPreviousLine(doc, offset);
            documentation = getDocumentation(doc, offset, 5);
            if (documentation)
                return documentation;
        }
        documentation = getDocumentation(doc, 0);
        if (documentation)
            return documentation;
        if (ifDefault)
            return typeof ifDefault === "string" ? ifDefault : ifDefault();
        return undefined;
    }
    Documentation.getDoc = getDoc;
    function getDocumentation(doc, startoffset, maxDist) {
        const text = doc.getText();
        let index = text.indexOf("\n", startoffset + 1);
        if (index < 0)
            index = text.length;
        let line = text.slice(startoffset, index);
        const length = line.length;
        line = line.trimStart();
        startoffset += length - line.length;
        //Comment
        if (doc.uri.endsWith(".mcfunction") || doc.uri.endsWith(".lang")) {
            //Mcfunction comment
            index = line.indexOf("#");
            if (validIndex(index, maxDist)) {
                let comment = line.slice(index + 1).trim();
                while (comment.startsWith("#")) {
                    comment = comment.slice(1);
                }
                return comment.trimStart();
            }
        }
        //Json comments
        if (doc.uri.endsWith(".json")) {
            index = line.indexOf("//");
            if (validIndex(index, maxDist)) {
                return line.slice(index + 2).trim();
            }
        }
        return undefined;
    }
})(Documentation || (exports.Documentation = Documentation = {}));
function validIndex(index, maxDist) {
    return index > -1 && (maxDist ? index <= maxDist : true);
}
function findPreviousLine(doc, offset) {
    let count = 0;
    const text = doc.getText();
    for (; offset > 0; offset--) {
        if (text[offset] === "\n") {
            count++;
            if (count == 2)
                return offset;
        }
    }
    return -1;
}
//# sourceMappingURL=documentation.js.map