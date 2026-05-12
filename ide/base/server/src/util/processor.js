"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Processor = void 0;
const queue_processor_1 = require("@daanv2/queue-processor");
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const vscode_languageserver_1 = require("vscode-languageserver");
var Processor;
(function (Processor) {
    /**
     *
     * @param data
     * @param callbackFn
     * @param token
     * @param reporter
     * @returns
     */
    function forEach(data, callbackFn, token, reporter) {
        token = token || vscode_languageserver_1.CancellationToken.None;
        reporter = reporter || { report: () => { } };
        return queue_processor_1.QueueProcessor.forEach(data, (item, index, col) => {
            if (token.isCancellationRequested)
                return;
            reporter.report(index / col.length);
            return callbackFn(item, index, col);
        }).then(() => { });
    }
    Processor.forEach = forEach;
    async function map(data, callbackFn, token, reporter) {
        token = token || vscode_languageserver_1.CancellationToken.None;
        reporter = reporter || {
            begin: () => { },
            done: () => { },
            report: () => { },
        };
        const result = [];
        await queue_processor_1.QueueProcessor.forEach(data, async (item, index, col) => {
            if (token.isCancellationRequested)
                return;
            if (bc_minecraft_bedrock_shared_1.Identifiable.is(item)) {
                reporter.report(index / col.length, item.id);
            }
            else {
                reporter.report(index / col.length);
            }
            const r = await callbackFn(item, index, col);
            result.push(r);
        });
        return result;
    }
    Processor.map = map;
})(Processor || (exports.Processor = Processor = {}));
//# sourceMappingURL=processor.js.map