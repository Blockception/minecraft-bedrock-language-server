
import { Location } from '@blockception/packages-shared';
import { NodeType, VariableNode } from 'bc-minecraft-molang';
import * as Internal from '../../../internal/resource-pack/render-controller';
import { Documentation, TextDocument } from '../../../types';
import { harvestMolang } from '../../molang';
import { RenderController } from './render-controller';

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

    // Each key in the ArraySpec is an array name (e.g., "Array.skins")
    for (const arrayName of Object.keys(arraySpec)) {
      // Find the position of this array name in the content
      const position = content.indexOf(arrayName);
      if (position === -1) continue;

      // Parse the array name to extract scope and name parts
      // Array names can be like "Array.skins" where "Array" is the scope
      const parts = arrayName.split('.');
      if (parts.length < 2) continue;

      const scope = parts[0].toLowerCase();
      // Only process if it's an array scope
      if (scope !== 'array') continue;

      // Create a VariableNode for the array definition
      const arrayNode: VariableNode = {
        type: NodeType.Variable,
        scope: 'array',
        names: [parts[1]] as [string],
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
