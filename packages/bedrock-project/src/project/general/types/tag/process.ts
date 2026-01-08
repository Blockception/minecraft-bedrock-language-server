import { Location } from 'bc-minecraft-bedrock-shared';
import { Command } from 'bc-minecraft-bedrock-command';
import { Documentation, TextDocument } from '../../../../types';
import { GeneralInfo } from '../general-info';

export function process(command: Command, doc: TextDocument): GeneralInfo | undefined {
  //tag <selector> add <tag>
  if (command.parameters[2]?.text !== 'add') return undefined;

  const tag = command.parameters[3];

  return GeneralInfo.create(
    tag.text,
    Location.create(doc.uri, tag.offset),
    Documentation.getDoc(doc, () => `The tag: ${tag.text}`, command.parameters[0].offset),
  );
}
