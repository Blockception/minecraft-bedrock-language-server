
import { Definition } from 'bc-minecraft-bedrock-shared';
import { MolangSet, NodeType } from 'bc-minecraft-molang';
import { TextDocument } from '../../types';

interface Resources {
  materials?: Definition;
  geometry?: Definition;
  textures?: Definition;
}

export function getUsingResources(receiver: MolangSet, source: Resources, document: TextDocument) {
  Definition.forEach(source.geometry, (reference) => {
    receiver.assigned.add({
      scope: 'geometry',
      names: [reference],
      position: document.getText().indexOf(`"${reference}"`),
      type: NodeType.ResourceReference,
    });
  });
  Definition.forEach(source.materials, (reference) => {
    receiver.assigned.add({
      scope: 'material',
      names: [reference],
      position: document.getText().indexOf(`"${reference}"`),
      type: NodeType.ResourceReference,
    });
  });
  Definition.forEach(source.textures, (reference) => {
    receiver.assigned.add({
      scope: 'texture',
      names: [reference],
      position: document.getText().indexOf(`"${reference}"`),
      type: NodeType.ResourceReference,
    });
  });
}
