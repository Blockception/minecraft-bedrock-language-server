"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressBar = void 0;
class ProgressBar {
    value;
    maximum;
    reporter;
    constructor(reporter, title, value = 0, max = 1) {
        this.value = value;
        this.maximum = max;
        this.reporter = reporter;
        this.reporter.begin(title, this.getPercentage());
    }
    setValue(value) {
        this.value = value;
        this.maximum = Math.max(value, this.maximum);
    }
    addValue(value = 1) {
        this.setValue(this.value + value);
    }
    getValue() {
        return this.value;
    }
    getPercentage() {
        return (this.value / this.maximum) * 100;
    }
    setMaximum(value) {
        this.maximum = value;
        this.value = Math.min(this.value, this.maximum);
    }
    addMaximum(value = 1) {
        this.setMaximum(this.maximum + value);
    }
    getMaximum() {
        return this.value;
    }
    sendProgress(message) {
        if (message) {
            this.reporter.report(this.getPercentage(), message);
        }
        else {
            this.reporter.report(this.getPercentage());
        }
    }
    sendMessage(message) {
        this.reporter.report(message);
    }
    done() {
        this.reporter.done();
    }
}
exports.ProgressBar = ProgressBar;
/**
 *
 */
(function (ProgressBar) {
    /**
     *
     * @param title
     * @param value
     * @param max
     * @returns
     */
    function create(extension, title, value = 0, max = 1) {
        const temp = extension.connection.window.createWorkDoneProgress();
        return temp.then((progres) => {
            return new ProgressBar(progres, title, value, max);
        });
    }
    ProgressBar.create = create;
    function attach(extension, token, title, value = 0, max = 1) {
        const progres = extension.connection.window.attachWorkDoneProgress(token);
        return new ProgressBar(progres, title, value, max);
    }
    ProgressBar.attach = attach;
    const _noop = new ProgressBar({
        begin: () => { },
        report: () => { },
        done: () => { },
    }, 'noop');
    function noop() {
        return _noop;
    }
    ProgressBar.noop = noop;
})(ProgressBar || (exports.ProgressBar = ProgressBar = {}));
//# sourceMappingURL=progress-bar.js.map