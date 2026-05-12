"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Output = void 0;
const path = __importStar(require("path"));
const output_set_1 = require("./output-set");
const general_1 = require("./general");
/**
 * Main output containing vanilla, edu, and general data
 */
class Output {
    vanilla = new output_set_1.OutputSet();
    edu = new output_set_1.OutputSet();
    general = new general_1.General();
    /**
     * Load output from a folder
     */
    static load(folder) {
        const out = new Output();
        out.edu = output_set_1.OutputSet.load(path.join(folder, 'edu'));
        out.vanilla = output_set_1.OutputSet.load(path.join(folder, 'vanilla'));
        out.general = general_1.General.load(path.join(folder, 'general'));
        return out;
    }
    /**
     * Save output to a folder
     */
    save(folder) {
        console.log("::group::saving data: " + folder);
        this.edu.save(path.join(folder, 'edu'));
        this.vanilla.save(path.join(folder, 'vanilla'));
        this.general.save(path.join(folder, 'general'));
        console.log("::endgroup::");
    }
    /**
     * Clean all data
     */
    clean() {
        this.edu.clean();
        this.vanilla.clean();
        this.general.clean();
    }
    /**
     * Prune education data from vanilla
     */
    prune() {
        // Remove edu entities from vanilla
        for (const entity of this.edu.behaviorPack.entities) {
            this.vanilla.behaviorPack.entities = this.vanilla.behaviorPack.entities.filter((x) => x.id !== entity.id);
            this.vanilla.resourcePack.entities = this.vanilla.resourcePack.entities.filter((x) => x.id !== entity.id);
        }
        // Remove edu blocks from vanilla
        for (const block of this.edu.behaviorPack.blocks) {
            this.vanilla.behaviorPack.blocks = this.vanilla.behaviorPack.blocks.filter((x) => x.id !== block.id);
        }
    }
}
exports.Output = Output;
//# sourceMappingURL=output.js.map