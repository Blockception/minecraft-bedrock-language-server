'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const shared_1 = require('@blockception/shared');
describe('Constants', () => {
  it('values', () => {
    expect(shared_1.Languages.McFunctionIdentifier).toEqual(shared_1.Languages.McFunctionIdentifier.toLowerCase());
  });
  it('Tool Identification', () => {
    expect(shared_1.ToolIdentification.length).toBeLessThanOrEqual(32);
  });
});
//# sourceMappingURL=constants.test.js.map
