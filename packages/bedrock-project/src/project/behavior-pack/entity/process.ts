import { Types } from "bc-minecraft-bedrock-types";
import { ComponentContainer } from "bc-minecraft-bedrock-types/lib/minecraft/components";
import * as internal from "../../../internal/behavior-pack/entity";
import { Json } from "../../../internal/json";
import { Documentation, TextDocument } from "../../../types";
import { Defined, References } from "../../../types/references";
import { harvestMolang } from "../../molang";
import { Entity } from "./entity";
import { EntityProperty } from "./properties";

/**
 *
 * @param doc
 * @returns
 */
export function process(doc: TextDocument): Entity | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.Entity>(doc);

  if (!internal.Entity.is(imp)) return undefined;

  const container = imp["minecraft:entity"];
  const id = container.description.identifier;

  const out: Entity = {
    runtime_identifier: container.description.runtime_identifier ?? "",
    animations: References.create(),
    documentation: Documentation.getDoc(doc, () => `BP Entity: ${id}`),
    events: Defined.wrap(Object.keys(container.events ?? {})),
    families: Defined.create(),
    groups: Defined.create(),
    id: id,
    location: Types.Location.create(uri, content.indexOf(id)),
    molang: harvestMolang(content, container),
    properties: Object.entries(container.description?.properties ?? {}).map(([name, property]) => {
      return { name, ...property } as EntityProperty;
    }),
  };

  getFamilies(container.components, out.families);
  if (container.component_groups) {
    Object.entries(container.component_groups).forEach(([name, group]) => {
      out.groups.defined.add(name);
      getFamilies(group, out.families);
    });
  }

  //Animations
  Object.entries(container.description.animations ?? {}).forEach(([name, anim]) => {
    out.animations.defined.add(name);
    out.animations.using.add(anim);
  });

  return out;
}

function getFamilies(components: ComponentContainer, receiver: Defined) {
  const families = components["minecraft:type_family"];

  if (type_family.is(families)) {
    Defined.add(receiver, families.family);
  }
}

interface type_family {
  family: string[];
}

namespace type_family {
  export function is(value: any): value is type_family {
    if (typeof value === "object" && Array.isArray(value.family)) {
      return true;
    }

    return false;
  }
}
