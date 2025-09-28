"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Using = exports.Defined = exports.References = void 0;
// Namespace for functions that operate on the References type.
var References;
(function (References) {
    /**
     * Type guard to check if a value is a References object.
     * Returns true if the object has both `using` and `defined` properties as Sets.
     */
    function is(v) {
        return (v === null || v === void 0 ? void 0 : v.using) instanceof Set && (v === null || v === void 0 ? void 0 : v.defined) instanceof Set;
    }
    References.is = is;
    /**
     * Creates a new empty References object.
     */
    function create() {
        return { defined: new Set(), using: new Set() };
    }
    References.create = create;
    /**
     * Wraps existing Sets or Iterables into a References object.
     * If the provided values are not Sets, they are converted into Sets.
     */
    function wrap(using, defined) {
        return {
            using: using instanceof Set ? using : new Set(using),
            defined: defined instanceof Set ? defined : new Set(defined),
        };
    }
    References.wrap = wrap;
})(References || (exports.References = References = {}));
// Namespace for functions that operate on the Defined type.
var Defined;
(function (Defined) {
    /**
     * Type guard to check if a value is a Defined object.
     * Returns true if the object has a `defined` property that is a Set.
     */
    function is(v) {
        return (v === null || v === void 0 ? void 0 : v.defined) instanceof Set;
    }
    Defined.is = is;
    /**
     * Creates a new empty Defined object.
     */
    function create() {
        return { defined: new Set() };
    }
    Defined.create = create;
    /**
     * Wraps an existing Set or Iterable into a Defined object.
     * If the provided value is not a Set, it is converted into a Set.
     */
    function wrap(data) {
        return { defined: data instanceof Set ? data : new Set(data) };
    }
    Defined.wrap = wrap;
    function add(defined, data, transfn) {
        if (!data)
            return; // No data to add
        if (transfn) {
            // If a transformation function is provided, apply it before adding
            for (const item of data) {
                defined.defined.add(transfn(item));
            }
        }
        else {
            // Otherwise, assume the items are already strings
            for (const item of data) {
                defined.defined.add(item);
            }
        }
    }
    Defined.add = add;
})(Defined || (exports.Defined = Defined = {}));
// Namespace for functions that operate on the Using type.
var Using;
(function (Using) {
    /**
     * Type guard to check if a value is a Using object.
     * Returns true if the object has a `using` property that is a Set.
     */
    function is(v) {
        return (v === null || v === void 0 ? void 0 : v.using) instanceof Set;
    }
    Using.is = is;
    /**
     * Creates a new empty Using object.
     */
    function create() {
        return { using: new Set() };
    }
    Using.create = create;
    /**
     * Wraps an existing Set or Iterable into a Using object.
     * If the provided value is not a Set, it is converted into a Set.
     */
    function wrap(data) {
        return { using: data instanceof Set ? data : new Set(data) };
    }
    Using.wrap = wrap;
    function add(using, data, transfn) {
        if (!data)
            return; // No data to add
        if (transfn) {
            // If a transformation function is provided, apply it before adding
            for (const item of data) {
                using.using.add(transfn(item));
            }
        }
        else {
            // Otherwise, assume the items are already strings
            for (const item of data) {
                using.using.add(item);
            }
        }
    }
    Using.add = add;
})(Using || (exports.Using = Using = {}));
//# sourceMappingURL=references.js.map