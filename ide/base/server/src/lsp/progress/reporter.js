"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warpReporter = warpReporter;
function warpReporter(title, call) {
    return async function (params, token, workDoneProgress, resultProgress) {
        try {
            workDoneProgress.begin(title, 0, undefined, false);
            return call(params, token, workDoneProgress, resultProgress);
        }
        finally {
            workDoneProgress.done();
        }
    };
}
//# sourceMappingURL=reporter.js.map