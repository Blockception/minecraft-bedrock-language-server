import { Internal } from 'bc-minecraft-bedrock-project';
import { MinecraftData } from 'bc-minecraft-bedrock-vanilla-data';
import { DiagnosticsBuilder, DiagnosticSeverity, DocumentDiagnosticsBuilder } from '../../../types';
import { education_enabled } from '../../definitions';
import { Json } from '../../json/json';
import { lint_check_sound_extension } from '../../lint';

/**
 * Diagnoses the given document as a `sound_definitions` file
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export function diagnose_sound_definitions_document(diagnoser: DocumentDiagnosticsBuilder): void {
  const definitions = Json.LoadReport<Internal.ResourcePack.SoundDefinitions>(diagnoser);
  if (!Internal.ResourcePack.SoundDefinitions.is(definitions)) return;

  //Get pack for files search
  const pack = diagnoser.context.getProjectData().projectData.resourcePacks.get(diagnoser.document.uri);
  if (pack === undefined) return;

  const sounds = definitions.sound_definitions;
  const soundFiles = diagnoser.context
    .getFiles(pack.folder, ['**/sounds/**/*.{fsb,wav,ogg}'], pack.context.ignores)
    .map((item) => item.replace(/\\/gi, '/'));

  //For each sound definition
  Object.entries(sounds).forEach(([sound_id, sound]) => {
    //For each file reference
    sound.sounds.forEach((soundSpec) => {
      if (typeof soundSpec === 'string') {
        sound_files_diagnose(sound_id, soundSpec, soundFiles, diagnoser);
      } else {
        const name = soundSpec.name;
        if (typeof name === 'string') {
          sound_files_diagnose(sound_id, name, soundFiles, diagnoser);
        }
      }
    });
  });
}

export function sound_files_diagnose(
  owner: string,
  file: string,
  files: string[],
  diagnoser: DiagnosticsBuilder,
): void {
  // Check extension lint rule before existence check
  lint_check_sound_extension(file, diagnoser);

  // Encode the search term to match URI-encoded file paths (encodeURI keeps slashes as-is)
  const encodedFile = encodeURI(file);
  
  for (let i = 0; i < files.length; i++) {
    if (files[i].includes(encodedFile)) {
      //Found then return out
      return;
    }
  }

  if (MinecraftData.ResourcePack.getSoundFile(file, education_enabled(diagnoser)) !== undefined) return;

  diagnoser.add(
    `${owner}/${file}`,
    `Cannot find sound file: ${file}`,
    DiagnosticSeverity.error,
    'resourcepack.sound.missing',
  );
}
