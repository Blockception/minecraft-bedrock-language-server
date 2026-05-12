"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
var Context;
(function (Context) {
    /**
     * Creates a new context object to be used
     * @param base The base extension to merge into the context
     * @param additional Any additionals information, might override anything the extension added
     * @param overrides Anything to overrides such as the looger
     * @returns A new context object
     */
    function create(base, additional, overrides) {
        overrides = overrides || {};
        return {
            config: base.config,
            capabilities: base.capabilities,
            connection: base.connection,
            database: base.database,
            documents: base.documents,
            logger: base.logger,
            state: base.state,
            settings: base.settings,
            services: base.services,
            ...additional,
            ...overrides,
        };
    }
    Context.create = create;
    /**
     * Overrides the given context with new information
     * @param base The base context to add
     * @param overlay The object values to addd to the context
     * @returns A new modified context
     */
    function modify(base, overlay) {
        return {
            ...base,
            ...overlay,
        };
    }
    Context.modify = modify;
})(Context || (exports.Context = Context = {}));
//# sourceMappingURL=context.js.map