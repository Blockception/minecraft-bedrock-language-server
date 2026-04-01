import { Internal, PackType } from 'bc-minecraft-bedrock-project';
import { FileType as BPFileType } from 'bc-minecraft-bedrock-project/src/project/behavior-pack';
import { FileType as RPFileType } from 'bc-minecraft-bedrock-project/src/project/resource-pack';
import { DocumentDiagnosticsBuilder } from '../types';
import { Json } from './json';
import { json_commandsCheck } from './behavior-pack/mcfunction/commands';

type CommandContextHandler = (diagnoser: DocumentDiagnosticsBuilder) => void;

/** Checks commands embedded in behavior-pack animation-controller states. */
function bp_animation_controller_commands(diagnoser: DocumentDiagnosticsBuilder): void {
  const controllers = Json.LoadReport<Internal.BehaviorPack.AnimationControllers>(diagnoser);
  if (!Internal.BehaviorPack.AnimationControllers.is(controllers)) return;

  Object.values(controllers.animation_controllers).forEach((controller) => {
    Object.values(controller.states).forEach((state) => {
      state.on_entry?.forEach((item) => json_commandsCheck(item, diagnoser));
      state.on_exit?.forEach((item) => json_commandsCheck(item, diagnoser));
    });
  });
}

/** Checks commands embedded in resource-pack animation-controller states. */
function rp_animation_controller_commands(diagnoser: DocumentDiagnosticsBuilder): void {
  const controllers = Json.LoadReport<Internal.ResourcePack.AnimationControllers>(diagnoser);
  if (!Internal.ResourcePack.AnimationControllers.is(controllers)) return;

  Object.values(controllers.animation_controllers).forEach((controller) => {
    Object.values(controller.states).forEach((state) => {
      state.on_entry?.forEach((item) => json_commandsCheck(item, diagnoser));
      state.on_exit?.forEach((item) => json_commandsCheck(item, diagnoser));
    });
  });
}

/**
 * Registry of embedded command-context handlers.
 *
 * To add a new command embedding site, append one entry here — that is the
 * only place that needs to change.
 */
const commandContextRegistry: Array<{
  matchesUri: (uri: string, packType: PackType) => boolean;
  handle: CommandContextHandler;
}> = [
  {
    matchesUri: (uri, packType) =>
      packType === PackType.behavior_pack && BPFileType.detect(uri) === BPFileType.animation_controller,
    handle: bp_animation_controller_commands,
  },
  {
    matchesUri: (uri, packType) =>
      packType === PackType.resource_pack && RPFileType.detect(uri) === RPFileType.animation_controller,
    handle: rp_animation_controller_commands,
  },
];

/**
 * Resolves and runs any embedded command-context diagnostics for the given
 * document.  This is the single entry point that all pack-type branches in
 * the diagnoser delegate to so that new embedding sites only require one
 * registration in `commandContextRegistry` above.
 */
export function resolveCommandContext(diagnoser: DocumentDiagnosticsBuilder, packType: PackType): void {
  const uri = diagnoser.document.uri;

  for (const { matchesUri, handle } of commandContextRegistry) {
    if (matchesUri(uri, packType)) {
      handle(diagnoser);
      return;
    }
  }
}
