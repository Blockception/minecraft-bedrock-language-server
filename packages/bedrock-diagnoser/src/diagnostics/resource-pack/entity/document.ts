import { Internal, ResourcePack } from "bc-minecraft-bedrock-project";
import { getUsingResources } from "bc-minecraft-bedrock-project/src/internal/resource-pack/resources";
import { harvestMolang } from 'bc-minecraft-bedrock-project/src/project/molang';
import { Types } from "bc-minecraft-bedrock-types";
import { DiagnosticSeverity, DocumentDiagnosticsBuilder, Metadata } from "../../../types";
import { behaviorpack_entityid_diagnose } from "../../behavior-pack/entity";
import { Json } from "../../json/json";
import { AnimationUsage } from "../../minecraft";
import { diagnose_script } from "../../minecraft/script";
import { diagnose_molang_syntax_current_document, MolangMetadata } from "../../molang";
import { animation_or_controller_diagnose_implementation } from "../anim-or-controller";
import { diagnose_animation_controller_implementation } from "../animation-controllers/diagnostics";
import { resourcepack_animation_used } from "../animation/usage";
import { model_is_defined } from "../model/diagnose";
import { particle_is_defined } from "../particle/diagnose";
import { render_controller_diagnose_implementation } from "../render-controller/diagnostics";
import { diagnose_resourcepack_sounds } from "../sounds/diagnostics";
import { texture_files_diagnose } from "../texture-atlas/entry";

/**
 * Diagnoses the given document as an RP entity
 * @param doc The text document to diagnose
 * @param diag The diagnoser builder to receive the errors
 */
export function diagnose_entity_document(diag: DocumentDiagnosticsBuilder): void {
  const diagnoser = Metadata.withMetadata(diag, { userType: "Entities" } as MolangMetadata);
  //No behaviorpack check, entities can exist without their bp side (for servers)
  //Load entity
  const entity = Json.LoadReport<Internal.ResourcePack.Entity>(diagnoser);
  if (!Internal.ResourcePack.Entity.is(entity)) return;

  const description = entity["minecraft:client_entity"].description;
  const entityGathered = ResourcePack.Entity.process(diagnoser.document);

  diagnose_molang_syntax_current_document(diagnoser, entity);
  behaviorpack_entityid_diagnose(description.identifier, diagnoser);

  if (!entityGathered) return;
  if (!entityGathered.molang) {
    entityGathered.molang = harvestMolang(diagnoser.document.getText(), entity);
    getUsingResources(entityGathered.molang, entity["minecraft:client_entity"].description, diagnoser.document);
  }

  // Collect all animations and animation controllers
  const anim_data: AnimationUsage = {
    animation_controllers: {},
    animations: description.animations ?? {},
    script: description.scripts ?? {},
  };
  description.animation_controllers?.forEach((controller) => {
    if (typeof controller === "string") {
      anim_data.animation_controllers[controller] = controller;
      return;
    }

    Types.Definition.forEach(controller, (ref, anim_id) => (anim_data.animation_controllers[ref] = anim_id));
  });

  //#region animations
  //Check animations / animation controllers
  Types.Definition.forEach(anim_data.animations, (ref, anim_id) =>
    animation_or_controller_diagnose_implementation(
      anim_id,
      entityGathered,
      diagnoser,
      description.particle_effects,
      description.sound_effects
    )
  );
  Types.Definition.forEach(anim_data.animation_controllers, (ref, anim_id) =>
    animation_or_controller_diagnose_implementation(
      anim_id,
      entityGathered,
      diagnoser,
      description.particle_effects,
      description.sound_effects
    )
  );

  //Check used animations
  resourcepack_animation_used(anim_data, diagnoser);
  //#endregion

  //Check animation controllers
  description.animation_controllers
    ?.map((controller) => flatten(controller))
    .filter((id) => id !== undefined)
    .forEach((id) => diagnose_animation_controller_implementation(id, entityGathered, diagnoser, {}));

  //Check render controllers
  description.render_controllers
    ?.map((controller) => getKey(controller))
    .filter((key) => key !== undefined)
    .forEach((key) => render_controller_diagnose_implementation(key, entityGathered, diagnoser));

  //Check models
  Types.Definition.forEach(description.geometry, (ref, modelId) => model_is_defined(modelId, diagnoser));

  //check particles
  Types.Definition.forEach(description.particle_effects, (ref, part_id) => particle_is_defined(part_id, diagnoser));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const textureId = description["spawn_egg"]?.["texture"];

  if (
    typeof textureId == "string" &&
    !diagnoser.context.getProjectData().projectData.resourcePacks.itemTextures.find((val) => val.id == textureId)
  ) {
    diagnoser.add(
      `description/spawn_egg/${textureId}`,
      `Texture reference "${textureId}" was not defined in item_texture.json`,
      DiagnosticSeverity.error,
      "behaviorpack.item.components.texture_not_found"
    );
  }

  //Get pack
  const pack = diagnoser.context.getProjectData().projectData.resourcePacks.get(diagnoser.document.uri);
  if (pack === undefined) return;

  const rp_files = diagnoser.context
    .getFiles(pack.folder, ["**/textures/**/*.{tga,png,jpg,jpeg}"], pack.context.ignores)
    .map((item) => item.replace(/\\/gi, "/"));

  //Check if entity has textures defined
  Types.Definition.forEach(description.textures, (ref, id) => {
    texture_files_diagnose(description.identifier, id, rp_files, diagnoser);
  });

  //Check if entity has sounds defined
  diagnose_resourcepack_sounds(description.sound_effects, diagnoser);

  //Script check
  if (description.scripts) diagnose_script(diagnoser, description.scripts, description.animations);
}

function flatten(data: string | Types.Definition): string | undefined {
  if (typeof data === "string") return data;

  const key = Object.getOwnPropertyNames(data)[0];

  if (key) return data[key];

  return undefined;
}

function getKey(data: string | Types.Definition): string | undefined {
  if (typeof data === "string") return data;

  return Object.getOwnPropertyNames(data)[0];
}
