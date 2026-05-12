"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
/**
 * The class that holds the base information most service will use
 */
class BaseService {
    disposables;
    logger;
    extension;
    /**
     * Creates a new instance of the BaseService class
     * @param logger The logger provided
     */
    constructor(logger, extension) {
        this.logger = logger;
        this.extension = extension;
        this.disposables = [];
    }
    /** @inheritdoc */
    dispose() {
        return this.disposables.forEach((d) => d.dispose());
    }
    /**
     * Adds the given objects as disposables and registers them to be disposed.
     * @param toDispose The object or subscription to dispose on server close
     */
    addDisposable(...toDispose) {
        this.disposables.push(...toDispose);
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.js.map