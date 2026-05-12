"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CapabilityBuilder = void 0;
class CapabilityBuilder {
    base;
    constructor(base) {
        this.base = base ?? {};
    }
    result() {
        return this.base;
    }
    /**
     * Tell the client that this server supports code completion.
     * @param data
     */
    addCompletion(data) {
        return (this.base.completionProvider = {
            ...this.base.completionProvider,
            ...data,
        });
    }
    set(item, data) {
        return (this.base[item] = data);
    }
}
exports.CapabilityBuilder = CapabilityBuilder;
//# sourceMappingURL=capabilities.js.map