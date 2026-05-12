"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
exports.provideRangeCompletion = provideRangeCompletion;
exports.provideCreateCompletion = provideCreateCompletion;
const vscode_languageserver_1 = require("vscode-languageserver");
function provideCompletion(context) {
    const builder = context.builder;
    const options = context.parameter.options;
    provideCreateCompletion(builder, options?.minimum, options?.maximum);
}
function provideRangeCompletion(context) {
    const builder = context.builder.withDefaults({ kind: vscode_languageserver_1.CompletionItemKind.Constant });
    const options = context.parameter.options;
    const minimum = options?.minimum ?? 0;
    const maximum = options?.maximum ?? 10;
    const diff = maximum - minimum;
    let steps = diff > 10 ? diff / 10 : 1;
    if (steps < 1)
        steps = 1;
    builder.add({ label: `..${minimum}`, documentation: '' });
    builder.add({ label: `${maximum}..`, documentation: '' });
    for (let I = minimum; I <= maximum; I += steps) {
        builder.add({ label: `${I}..${I + steps}`, documentation: '' });
    }
}
function provideCreateCompletion(receiver, minimum, maximum) {
    minimum = minimum ?? 0;
    maximum = maximum ?? 10;
    const diff = maximum - minimum;
    let steps = diff > 10 ? diff / 10 : 1;
    if (steps < 1)
        steps = 1;
    for (let I = minimum; I < maximum; I += steps) {
        receiver.add({
            label: I.toString(),
            documentation: 'The integer number: ' + I.toString(),
            kind: vscode_languageserver_1.CompletionItemKind.Constant,
        });
    }
}
//# sourceMappingURL=integer.js.map