"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralEntity = void 0;
const sort_1 = require("../static/sort");
/**
 * General entity data (combined from all entities)
 */
class GeneralEntity {
    families = [];
    events = [];
    /**
     * Scrape entity data from BP container
     */
    scrape(data) {
        for (const entity of data.entities) {
            for (const event of entity.events) {
                if (!this.events.includes(event)) {
                    this.events.push(event);
                }
            }
            for (const family of entity.families) {
                if (!this.families.includes(family)) {
                    this.families.push(family);
                }
            }
        }
    }
    /**
     * Clean and sort data
     */
    clean() {
        this.events.sort(sort_1.stringSort);
        this.families.sort(sort_1.stringSort);
    }
}
exports.GeneralEntity = GeneralEntity;
//# sourceMappingURL=general-entity.js.map