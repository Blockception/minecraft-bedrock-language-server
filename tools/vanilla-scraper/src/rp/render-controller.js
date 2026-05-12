"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRenderController = createRenderController;
exports.convertRenderController = convertRenderController;
/**
 * Create a new RenderController
 */
function createRenderController() {
    return {
        id: '',
    };
}
/**
 * Convert JSON document to RenderController objects
 */
function convertRenderController(doc, receiver) {
    const root = doc;
    const container = root['render_controllers'];
    if (!container)
        return;
    for (const controllerName of Object.keys(container)) {
        const item = createRenderController();
        item.id = controllerName;
        receiver.push(item);
    }
}
//# sourceMappingURL=render-controller.js.map