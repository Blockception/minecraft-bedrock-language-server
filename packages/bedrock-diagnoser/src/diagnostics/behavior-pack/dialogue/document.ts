import { DocumentDiagnosticsBuilder } from '../../../types';
import { Json } from '../../json/json';
import { json_commandsCheck } from '../mcfunction/commands';

/**Diagnoses the given document as a dialogue file
 * @param diagnoser The diagnoser builder to receive the errors*/
export function diagnose_dialogue_document(diagnoser: DocumentDiagnosticsBuilder): void {
  const dialogue = Json.LoadReport<NpcDialogue>(diagnoser);
  if (typeof dialogue !== 'object') return;

  dialogue['minecraft:npc_dialogue']?.scenes?.forEach((scene) => {
    if (scene.on_open_commands) json_commandsCheck(scene.on_open_commands, diagnoser);
    if (scene.on_close_commands) json_commandsCheck(scene.on_close_commands, diagnoser);

    scene.buttons?.forEach((button) => {
      if (button.commands) json_commandsCheck(button.commands, diagnoser);
    });
  });
}

interface NpcDialogue {
  format_version?: string;
  'minecraft:npc_dialogue'?: {
    scenes?: NpcDialogueScene[];
  };
}

interface NpcDialogueScene {
  scene_tag?: string;
  npc_name?: string | object;
  text?: string | object;
  on_open_commands?: string[];
  on_close_commands?: string[];
  buttons?: NpcDialogueButton[];
}

interface NpcDialogueButton {
  name?: string | object;
  commands?: string[];
}
