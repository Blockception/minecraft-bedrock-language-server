"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinecraftDataSet = void 0;
/**The namespace governing minecraft data sets*/
var MinecraftDataSet;
(function (MinecraftDataSet) {
    /**Checks whenever a given entity is present in either BP or RP
     * @param data The data to spit through
     * @param id The identification to find
     * @returns True or False if the entity is present or not*/
    function hasEntity(data, id) {
        if (data.BehaviorPack.entities.some((x) => x.id === id))
            return true;
        if (data.ResourcePack.entities.some((x) => x.id === id))
            return true;
        return false;
    }
    MinecraftDataSet.hasEntity = hasEntity;
})(MinecraftDataSet || (exports.MinecraftDataSet = MinecraftDataSet = {}));
//# sourceMappingURL=minecraft_data_set.js.map