"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedLogger = void 0;
const util_1 = require("../../util");
class ExtendedLogger {
    logger;
    prefix;
    additionals;
    constructor(logger, prefix = '', additionals = []) {
        this.logger = logger;
        this.prefix = prefix;
        this.additionals = additionals;
    }
    render(base, ...messages) {
        messages = [...messages, ...this.additionals].map((m) => typeof m === 'object' ? JSON.stringify(m, undefined, 2) : `${m}`);
        return `${this.prefix} ${base} ${messages.join(' ')}`.trim();
    }
    /**
     * Logs an error message, with optional additional information
     * @param message The message to log
     * @param additionals Additional information to log
     */
    error(message, ...additionals) {
        this.logger.error(this.render(message, ...additionals));
    }
    /**
     * Logs a warning message, with optional additional information
     * @param message The message to log
     * @param additionals Additional information to log
     */
    warn(message, ...additionals) {
        this.logger.warn(this.render(message, ...additionals));
    }
    /**
     * Logs an informational message, with optional additional information
     * @param message The message to log
     * @param additionals Additional information to log
     */
    info(message, ...additionals) {
        this.logger.info(this.render(message, ...additionals));
    }
    /**
     * Logs a message, with optional additional information
     * @param message The message to log
     * @param additionals Additional information to log
     */
    log(message, ...additionals) {
        this.logger.log(this.render(message, ...additionals));
    }
    /**
     * Logs a debug message, with optional additional information
     * @param message The message to log
     * @param additionals Additional information to log
     */
    debug(message, ...additionals) {
        this.logger.debug(this.render(message, ...additionals));
    }
    /**
     * Adds a prefix to all the logging
     * @param prefix The prefix to add
     * @returns A new logger
     */
    withPrefix(prefix) {
        return new ExtendedLogger(this.logger, this.prefix + prefix, this.additionals);
    }
    /**
     * Adds the given additionals to the logger
     * @param additionals The additional objects to add
     * @returns Returns a new logger
     */
    with(...additionals) {
        return new ExtendedLogger(this.logger, this.prefix, [...this.additionals, ...additionals]);
    }
    recordError(err, doc) {
        let msg;
        if (errormsg.is(err)) {
            msg = `message: ${err.message}\n\tstack:${err.stack}`;
        }
        else {
            msg = JSON.stringify(err);
        }
        if (doc) {
            msg = (0, util_1.getFilename)(typeof doc === 'object' ? doc.uri : doc) + ' | ' + msg;
        }
        this.error(msg);
    }
}
exports.ExtendedLogger = ExtendedLogger;
var errormsg;
(function (errormsg) {
    function is(value) {
        if (typeof value === 'object') {
            if (typeof value.message === 'string' && typeof value.stack === 'string')
                return true;
        }
        return false;
    }
    errormsg.is = is;
})(errormsg || (errormsg = {}));
//# sourceMappingURL=logger.js.map