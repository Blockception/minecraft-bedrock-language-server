"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
exports.provideCreateCompletion = provideCreateCompletion;
const vscode_languageserver_1 = require("vscode-languageserver");
const context_1 = require("../context");
function provideCompletion(context) {
    const builder = context.builder;
    const options = context.parameter.options;
    provideCreateCompletion(builder, options?.minimum, options?.maximum);
}
function provideCreateCompletion(context, minimum, maximum) {
    minimum = minimum ?? 0;
    maximum = maximum ?? 10;
    const receiver = context_1.CommandCompletionContext.is(context) ? context.builder : context;
    const diff = maximum - minimum;
    const steps = diff / 10;
    for (let I = minimum; I < maximum; I += steps) {
        const text = I.toPrecision(3);
        receiver.add({ label: text, documentation: 'The float number: ' + text, kind: vscode_languageserver_1.CompletionItemKind.Constant });
    }
}
//# sourceMappingURL=float.js.map