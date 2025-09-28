"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Particle = void 0;
/**
 *
 */
var Particle;
(function (Particle) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object" &&
            typeof value.format_version === "string" &&
            typeof value["particle_effect"] === "object") {
            const desc = value["particle_effect"].description;
            if (typeof desc === "object" && typeof desc.identifier === "string") {
                return true;
            }
        }
        return false;
    }
    Particle.is = is;
})(Particle || (exports.Particle = Particle = {}));
//# sourceMappingURL=particle.js.map