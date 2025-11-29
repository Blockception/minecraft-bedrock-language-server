import { IIdentifier } from '../interfaces';

/**
 * Render controller data from resource packs
 */
export interface RenderController extends IIdentifier {
  id: string;
}

/**
 * Create a new RenderController
 */
export function createRenderController(): RenderController {
  return {
    id: '',
  };
}

/**
 * Convert JSON document to RenderController objects
 */
export function convertRenderController(doc: object, receiver: RenderController[]): void {
  const root = doc as Record<string, unknown>;
  const container = root['render_controllers'] as Record<string, unknown>;
  if (!container) return;

  for (const controllerName of Object.keys(container)) {
    const item = createRenderController();
    item.id = controllerName;
    receiver.push(item);
  }
}
