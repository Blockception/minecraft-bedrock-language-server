"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = require("./manager");
describe('command manager', () => {
    it('should be able to load all the tests', async () => {
        const manager = manager_1.CommandManager.load();
        for (const [key, value] of manager.commands()) {
            expect(key).toBeDefined();
            expect(value).toBeDefined();
        }
    });
});
//# sourceMappingURL=manager.test.js.map