import { Internal, References } from "bc-minecraft-bedrock-project";
import { EntityProperty as DefinedEP } from "bc-minecraft-bedrock-project/lib/src/internal/behavior-pack/entity";
import { EntityProperty as ProjectEP } from "bc-minecraft-bedrock-project/lib/src/project/behavior-pack/entity";
import { Types } from "bc-minecraft-bedrock-types";
import { getUsedComponents } from "bc-minecraft-bedrock-types/lib/minecraft/components";
import { MolangSet } from "bc-minecraft-molang";
import { DiagnosticSeverity, DocumentDiagnosticsBuilder, Metadata } from "../../../types";
import { Context } from "../../../utility/components";
import { Json } from "../../json";
import { AnimationUsage } from "../../minecraft";
import { diagnose_script } from "../../minecraft/script";
import { diagnose_molang_syntax_current_document, MolangMetadata } from "../../molang";
import { no_other_duplicates } from "../../packs/duplicate-check";
import { diagnose_animation_or_controller_implementation } from "../anim-or-controller";
import { behaviorpack_animation_used } from "../animation/usage";
import { behaviorpack_entity_components_check } from "./components";
import { behaviorpack_entity_components_dependencies } from "./components/dependencies";
import { behaviorpack_entity_check_events } from "./events";
import { diagnose_entity_properties_definition } from "./properties";
import { harvestMolang } from "bc-minecraft-bedrock-project/lib/src/project/molang";

/**Diagnoses the given document as an bp entity
 * @param doc The text document to diagnose
 * @param diag The diagnoser builder to receive the errors*/
export function diagnose_entity_document(diag: DocumentDiagnosticsBuilder): void {
  const diagnoser = Metadata.withMetadata<DocumentDiagnosticsBuilder, MolangMetadata>(diag, { userType: "Entities" });
  const entity = Json.LoadReport<Internal.BehaviorPack.Entity>(diagnoser);
  if (!Internal.BehaviorPack.Entity.is(entity)) return;

  const container = entity["minecraft:entity"];
  const identifier = container.description.identifier;
  const molangData = harvestMolang(diagnoser.document.getText(), container);
  //check components
  const context: Context<Internal.BehaviorPack.Entity> = {
    source: entity,
    components: getUsedComponents(entity["minecraft:entity"]),
  };

  diagnose_molang_syntax_current_document(diagnoser, entity);
  behaviorpack_entity_components_dependencies(entity, context, diagnoser);
  behaviorpack_entity_components_check(entity, context, diagnoser);

  //No resource-pack check, entities can exist without their rp side
  // check that no other exists with this id
  no_other_duplicates(
    "behaviorpack.entity",
    diagnoser.context.getProjectData().projectData.behaviorPacks.entities,
    identifier,
    diagnoser
  );

  const owner = {
    id: identifier,
    molang: molangData,
    animations: References.create(),
  };
  const properties = Object.entries(container.description.properties ?? {}).map(([name, value]) =>
    propertyToProjectProperty(name, value)
  );

  //Convert animations / controllers
  Types.Definition.forEach(container.description.animations, (ref, anim_id) => {
    owner.animations.defined.add(ref);
    owner.animations.using.add(anim_id);
  });

  //Check animations / animation controllers implements
  owner.animations.using.forEach((anim_id) =>
    diagnose_animation_or_controller_implementation(anim_id, owner, diagnoser)
  );

  if ("permutations" in container)
    diagnoser.add(
      `permutations`,
      `Entity permutations have been deprecated.`,
      DiagnosticSeverity.error,
      "behaviorpack.entity.permutations"
    );

  if ("aliases" in container.description)
    diagnoser.add(
      `aliases`,
      `Entity aliases have been deprecated.`,
      DiagnosticSeverity.error,
      "behaviorpack.entity.aliases"
    );

  //Script check
  if (container.description.scripts) {
    diagnose_script(diagnoser, container.description.scripts, container.description.animations);
  }

  //Check used animations
  const anim_data: AnimationUsage = {
    animation_controllers: {},
    animations: container.description.animations ?? {},
    script: container.description.scripts ?? {},
  };

  behaviorpack_animation_used(anim_data, diagnoser);
  diagnose_entity_properties_definition(properties, diagnoser, diagnoser.document.getText());

  //Check events
  if (container.events) {
    behaviorpack_entity_check_events(container.events, diagnoser, properties, container.component_groups);
  }
}

function propertyToProjectProperty(name: string, value: DefinedEP): ProjectEP {
  switch (value.type) {
    case "bool":
      return {
        name: name,
        type: value.type,
        default: value.default == true,
      };
    case "float":
    case "int":
      return {
        name: name,
        type: value.type,
        default: Number(value.default),
        range: value.range,
      };
    case "enum":
      return {
        name: name,
        type: "enum",
        default: value.default,
        values: value.values,
        client_sync: value.client_sync,
      };
  }
}
