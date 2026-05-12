"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideSignature = provideSignature;
function provideSignature(doc, pos) {
    const line = doc.getLine(pos.line);
    const index = line.indexOf('=');
    let parameter = 0;
    if (index > 0 && index < pos.character) {
        parameter = 1;
    }
    const out = {
        activeParameter: parameter,
        activeSignature: 0,
        signatures: [
            {
                label: '[translation key]=[text]',
                documentation: 'The key/value pair that is used by minecraft to determine what text to display',
                parameters: [
                    {
                        label: '[translation key]',
                        documentation: 'The key to this translation text',
                    },
                    {
                        label: '[text]',
                        documentation: 'The translation text, some pretty stuff can be done with the following: \n§ = ALT + 0167 on the numpad\nOther neat functions: %%s, %%#, see the wiki',
                    },
                ],
            },
        ],
    };
    return out;
}
//# sourceMappingURL=languages.js.map