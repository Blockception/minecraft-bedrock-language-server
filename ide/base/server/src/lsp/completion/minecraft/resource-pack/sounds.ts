import { ResourcePack } from 'bc-minecraft-bedrock-project';
import { Identifiable } from '@blockception/packages-shared';
import { MinecraftData } from 'bc-minecraft-bedrock-vanilla-data';
import { CompletionItemKind } from 'vscode-languageserver';
import { Kinds } from '../../../../constants';
import { MinecraftFormat } from '../../../../minecraft/format';
import { IsEducationEnabled } from '../../../../project/attributes';
import { getExtension } from '../../../../util';
import { Context } from '../../../context/context';
import { CompletionContext } from '../../context';

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: Identifiable | string) => {
    if (typeof item === 'string') return `The defined sound: ${item}`;
    return `The sound: ${item.id}`;
  };
  const generateV = (item: string) => `The vanilla sound: ${item}`;
  const data = context.document.configuration();

  // Add sounds from .mcdefinitions
  context.builder.generate(data.definitions.sound?.defined, generateDoc, Kinds.Completion.Sound);

  context.builder.generate(context.database.ProjectData.resourcePacks.sounds, generateDoc, Kinds.Completion.Sound);
  context.builder.generate(MinecraftData.vanilla.ResourcePack.sounds, generateV, Kinds.Completion.Sound);

  //Education data
  if (IsEducationEnabled(context.document))
    context.builder.generate(MinecraftData.edu.ResourcePack.sounds, generateV, Kinds.Completion.Sound);
}

/**Looks for all the sound files in the given pack and returns them as completion text
 * @param doc
 * @returns
 */
export function provideSoundFileCompletion(context: Context<CompletionContext>): void {
  const RP = context.document.pack();

  //No associated pack, then do nothing
  if (!ResourcePack.ResourcePack.is(RP)) return;
  const files = MinecraftFormat.GetAudioFiles(RP.folder, RP.context.ignores.patterns);

  files.forEach((filepath) => {
    const index = filepath.indexOf('sounds');
    if (index <= 0) {
      return;
    }
    const ext = getExtension(filepath);
    // Decode URI-encoded paths to handle files with spaces
    const decodedPath = decodeURIComponent(filepath);
    const id = decodedPath.substring(index, decodedPath.length - ext.length);

    context.builder.add({
      label: id,
      documentation: decodedPath,
      kind: CompletionItemKind.File,
    });
  });
}
