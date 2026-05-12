"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVanillaModule = createVanillaModule;
exports.convertVanillaModule = convertVanillaModule;
exports.convertVanillaModuleFlat = convertVanillaModuleFlat;
const json_1 = require("../static/json");
/**
 * Create a new VanillaModule
 */
function createVanillaModule() {
    return {
        name: '',
        module_type: '',
        minecraft_version: '',
        vanilla_data_type: '',
        data_items: [],
    };
}
/**
 * Convert vanilla module items using a mapping function
 */
function convertVanillaModule(filepath, receiver, mapFn) {
    console.log('Loading file: ' + filepath);
    const obj = (0, json_1.load)(filepath);
    if (!obj)
        return;
    const items = obj.data_items.map(mapFn);
    receiver.push(...items);
}
/**
 * Convert vanilla module items using a mapping function that returns arrays
 */
function convertVanillaModuleFlat(filepath, receiver, mapFn) {
    console.log('Loading file: ' + filepath);
    const obj = (0, json_1.load)(filepath);
    if (!obj)
        return;
    for (const item of obj.data_items) {
        const items = mapFn(item);
        receiver.push(...items);
    }
}
//# sourceMappingURL=vanilla-module.js.map