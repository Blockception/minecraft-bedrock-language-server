"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureCarrier = void 0;
/**
 *
 */
var SignatureCarrier;
(function (SignatureCarrier) {
    /**
     *
     * @param value
     * @param generate
     * @returns
     */
    function get(value, generate) {
        const temp = value;
        if (temp.__signature) {
            return temp.__signature;
        }
        const out = generate(value);
        temp.__signature = out;
        return out;
    }
    SignatureCarrier.get = get;
})(SignatureCarrier || (exports.SignatureCarrier = SignatureCarrier = {}));
//# sourceMappingURL=carrier.js.map