"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTrading = createTrading;
exports.convertTrading = convertTrading;
/**
 * Create a new Trading
 */
function createTrading(id = '') {
    return {
        id,
    };
}
/**
 * Convert file path to Trading object
 */
function convertTrading(filepath, receiver) {
    const index = filepath.indexOf('trading');
    if (index >= 0) {
        const id = filepath.substring(index).replace(/\\/g, '/');
        receiver.push(createTrading(id));
    }
}
//# sourceMappingURL=trading.js.map