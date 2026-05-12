"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MCProjectprovider = void 0;
var MCProjectprovider;
(function (MCProjectprovider) {
    function is(value) {
        if (typeof value === 'object') {
            if (typeof value.configuration === 'undefined')
                return false;
            return true;
        }
        return false;
    }
    MCProjectprovider.is = is;
})(MCProjectprovider || (exports.MCProjectprovider = MCProjectprovider = {}));
//# sourceMappingURL=interfaces.js.map