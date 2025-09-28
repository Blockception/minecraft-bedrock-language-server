import { Types } from "bc-minecraft-bedrock-types";
import { Definition } from "bc-minecraft-bedrock-types/src/types/definition";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { DiagnosticsBuilder, DiagnosticSeverity, EntityAnimationMolangCarrier, WithMetadata } from "../../types";
import { MolangMetadata } from "../molang";
import { diagnose_animation_controller_implementation } from "./animation-controllers/diagnostics";
import { diagnose_animation_implementation } from "./animation/diagnostics";

const whiteList = ["animation.humanoid.fishing_rod"];

export function animation_or_controller_diagnose_implementation(
  id: string,
  user: EntityAnimationMolangCarrier,
  diagnoser: WithMetadata<DiagnosticsBuilder, MolangMetadata>,
  particles?: Definition,
  sounds?: Definition
): void {
  switch (is_animation_or_controller(id, diagnoser)) {
    case anim_or_contr.animation:
      return diagnose_animation_implementation(id, user, diagnoser, particles, sounds);

    case anim_or_contr.controller:
      return diagnose_animation_controller_implementation(id, user, diagnoser, { particles, sounds });

    case anim_or_contr.neither:
      if (whiteList.includes(id)) return;
      diagnoser.add(
        id,
        `Cannot find animation / animation controller: ${id}`,
        DiagnosticSeverity.error,
        "resourcepack.anim_or_controller.missing"
      );
  }
}

export function animation_or_controller_diagnose(id: Types.OffsetWord, diagnoser: DiagnosticsBuilder): void {
  switch (is_animation_or_controller(id.text, diagnoser)) {
    case anim_or_contr.controller:
    case anim_or_contr.animation:
      return;

    case anim_or_contr.neither:
      diagnoser.add(
        id,
        `Cannot find animation / animation controller: ${id}`,
        DiagnosticSeverity.error,
        "resourcepack.anim_or_controller.missing"
      );
      return;
  }
}

export function animation_reference_diagnose(value: Types.OffsetWord, diagnoser: DiagnosticsBuilder): void {
  const data = diagnoser.context.getProjectData().projectData;
  const id = value.text;

  //Project in entity
  if (data.resourcePacks.entities.find((entity) => entity.animations.defined.has(id)) !== undefined) {
    return;
  }
  if (data.resourcePacks.animations.find((anim) => anim.id === id) !== undefined) {
    return;
  }
  if (data.resourcePacks.animation_controllers.find((anim) => anim.id === id) !== undefined) {
    return;
  }

  //Vanilla?
  if (MinecraftData.vanilla.ResourcePack.entities.some((entity) => entity.animations.includes(id))) {
    return;
  }
  if (MinecraftData.vanilla.ResourcePack.animations.some((anim) => anim.id === id)) {
    return;
  }
  if (MinecraftData.vanilla.ResourcePack.animation_controllers.some((anim) => anim.id === id)) {
    return;
  }

  diagnoser.add(
    value,
    `Cannot find animation / animation controller: ${value.text}`,
    DiagnosticSeverity.error,
    "resourcepack.anim_or_controller.missing"
  );
}

export enum anim_or_contr {
  animation,
  controller,
  neither,
}

/**
 *
 * @param id
 * @param diagnoser
 * @returns True if animation, false if controller
 */
export function is_animation_or_controller(id: string, diagnoser: DiagnosticsBuilder): anim_or_contr {
  const rp = diagnoser.context.getProjectData().resources;
  if (rp.animations.has(id, diagnoser.project)) return anim_or_contr.animation;
  if (rp.animation_controllers.has(id, diagnoser.project)) return anim_or_contr.controller;

  return anim_or_contr.neither;
}
