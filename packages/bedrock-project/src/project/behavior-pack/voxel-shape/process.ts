
import { Location } from 'bc-minecraft-bedrock-shared';
import * as Internal from '../../../internal/behavior-pack/voxel-shape';
import { Json } from '../../../internal/json';
import { Documentation, TextDocument } from '../../../types';
import { VoxelShape } from './voxel-shape';

/**
 * Processes a TextDocument containing voxel shape data.
 * @param doc The text document to process
 * @returns The processed VoxelShape object or undefined if parsing fails
 */
export function process(doc: TextDocument): VoxelShape | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<Internal.VoxelShape>(doc);

  if (!Internal.VoxelShape.is(imp)) return undefined;

  const id = imp['minecraft:voxel_shape'].description.identifier;

  return {
    id: id,
    documentation: Documentation.getDoc(doc, () => `Voxel shape: ${id}`),
    location: Location.create(uri, content.indexOf(id)),
  };
}
