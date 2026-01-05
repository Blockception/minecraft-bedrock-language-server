
import { Location } from '@blockception/packages-shared';
import { NodeType, VariableNode } from 'bc-minecraft-molang';
import * as Internal from '../../../internal/resource-pack/render-controller';
import { Documentation, TextDocument } from '../../../types';
import { harvestMolang } from '../../molang';
import { RenderController } from './render-controller';

/** Constant for the array scope identifier used in render controller arrays */
const ARRAY_SCOPE = 'array';

/**
 * Extracts array definitions from render controller arrays section and adds them to the molang set
 * @param controller The render controller object
 * @param content The full document content for position tracking
 * @param molangSet The molang set to add array definitions to
 */
function extractArrayDefinitions(
  controller: Internal.RenderController,
  content: string,
  molangSet: ReturnType<typeof harvestMolang>
): void {
  if (!controller.arrays) return;

  // Process each array category (materials, geometries, textures)
  const categories = ['materials', 'geometries', 'textures'] as const;
  
  for (const category of categories) {
    const arraySpec = controller.arrays[category];
    if (!arraySpec) continue;

    // Each key in the ArraySpec is an array name following the format "Scope.name"
    // For example: "Array.skins", "Array.variants", etc.
    for (const arrayName of Object.keys(arraySpec)) {
      // Find the position of this array name in the content
      // Note: This uses a simple indexOf which may not be perfect if the name appears
      // multiple times, but in practice render controller array names are unique
      const position = content.indexOf(arrayName);
      if (position === -1) continue;

      // Parse the array name to extract scope and name parts
      // Expected format: "Array.name" where "Array" is the scope and "name" is the identifier
      const parts = arrayName.split('.');
      if (parts.length < 2) {
        // Invalid format - array names should be at least "Scope.name"
        continue;
      }

      const scopePrefix = parts[0].toLowerCase();
      const arrayIdentifier = parts[1];
      
      // Only process if it's an array scope (e.g., "Array.skins")
      // Other scopes like "Texture" or "Material" are not array definitions
      if (scopePrefix !== ARRAY_SCOPE) continue;

      // Create a VariableNode for the array definition
      const arrayNode: VariableNode = {
        type: NodeType.Variable,
        scope: ARRAY_SCOPE,
        names: [arrayIdentifier] as [string],
        position: position,
      };

      // Add to the assigned set (indicating this array is defined)
      molangSet.assigned.add(arrayNode);
    }
  }
}

/** */
export function process(doc: TextDocument): RenderController[] | undefined {
  const imp = TextDocument.toObject(doc, Internal.RenderControllers.is);
  if (!imp) return undefined;

  const uri = doc.uri;
  const content = doc.getText();

  return Object.entries(imp.render_controllers).map(([id, controller]) => {
    const molangSet = harvestMolang(content, controller);
    
    // Extract and add array definitions to the molang set
    extractArrayDefinitions(controller, content, molangSet);

    return {
      id: id,
      location: Location.create(uri, content.indexOf(id)),
      molang: molangSet,
      documentation: Documentation.getDoc(doc, () => `Render Controller: \`${id}\``),
    };
  });
}
