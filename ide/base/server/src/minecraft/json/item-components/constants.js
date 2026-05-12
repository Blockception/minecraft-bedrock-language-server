"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example = exports.LockInSlotComponent = exports.KeepOnDeathComponent = exports.LockInInventoryComponent = exports.CanPlaceOnComponent = exports.CanDestroyComponent = void 0;
exports.CanDestroyComponent = '"minecraft:can_destroy": { "blocks": [ ] }';
exports.CanPlaceOnComponent = '"minecraft:can_place_on": { "blocks": [ ] }';
exports.LockInInventoryComponent = '"item_lock": { "mode": "lock_in_inventory" }';
exports.KeepOnDeathComponent = '"keep_on_death": {}';
exports.LockInSlotComponent = '"item_lock": { "mode": "lock_in_slot" } ';
exports.Example = `{ ${exports.CanDestroyComponent}, ${exports.CanPlaceOnComponent}, ${exports.LockInInventoryComponent}, ${exports.LockInSlotComponent}, ${exports.KeepOnDeathComponent} }`;
//# sourceMappingURL=constants.js.map