"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundDefinitions = void 0;
/** */
var SoundDefinitions;
(function (SoundDefinitions) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object" &&
            typeof value.format_version === "string" &&
            typeof value.sound_definitions === "object") {
            return true;
        }
        return false;
    }
    SoundDefinitions.is = is;
})(SoundDefinitions || (exports.SoundDefinitions = SoundDefinitions = {}));
//# sourceMappingURL=sound-definitions.js.map