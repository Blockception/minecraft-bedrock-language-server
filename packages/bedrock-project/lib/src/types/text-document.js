"use strict";
//Note: this is kept sync with vscode form of textdocument for easy of use
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestTextDocument = exports.TextDocument = void 0;
const json_1 = require("../internal/json");
var TextDocument;
(function (TextDocument) {
    /**
     * Reads the text document and returns the json object, but only if its matches the checkIs fn
     * @param doc The document to read
     * @param checkIs The function to check if the json object is of the correct type
     * @returns The json object or undefined
     */
    function toObject(doc, checkIs) {
        const imp = json_1.Json.To(doc);
        if (checkIs) {
            if (checkIs(imp)) {
                return imp;
            }
            else {
                return undefined;
            }
        }
        return imp;
    }
    TextDocument.toObject = toObject;
})(TextDocument || (exports.TextDocument = TextDocument = {}));
var TestTextDocument;
(function (TestTextDocument) {
    function create(uri, content) {
        return {
            uri,
            getText: () => content,
        };
    }
    TestTextDocument.create = create;
})(TestTextDocument || (exports.TestTextDocument = TestTextDocument = {}));
//# sourceMappingURL=text-document.js.map