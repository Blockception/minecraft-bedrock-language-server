import { Types } from "bc-minecraft-bedrock-types";
import { MolangSet, NodeType } from "bc-minecraft-molang";
import { TextDocument } from "../../types";

interface Resources {
  materials?: Types.Definition;
  geometry?: Types.Definition;
  textures?: Types.Definition;
}

export function getUsingResources(receiver: MolangSet, source: Resources, document: TextDocument) {
  Types.Definition.forEach(source.geometry, (reference) => {
    receiver.assigned.add({
      scope: "geometry",
      names: [reference],
      position: document.getText().indexOf(`"${reference}"`),
      type: NodeType.ResourceReference,
    });
  });
  Types.Definition.forEach(source.materials, (reference) => {
    receiver.assigned.add({
      scope: "material",
      names: [reference],
      position: document.getText().indexOf(`"${reference}"`),
      type: NodeType.ResourceReference,
    });
  });
  Types.Definition.forEach(source.materials, (reference) => {
    receiver.assigned.add({
      scope: "texture",
      names: [reference],
      position: document.getText().indexOf(`"${reference}"`),
      type: NodeType.ResourceReference,
    });
  });
}
