
import { OffsetWord } from 'bc-minecraft-bedrock-shared';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../types';
import { check_definition_value } from '../definitions';

export function minecraft_tag_diagnose(value: OffsetWord | string, diagnoser: DiagnosticsBuilder): boolean {
  if (diagnoser.project.attributes['diagnostic.tags'] === 'false') {
    return true;
  }

  const rawText = typeof value === 'string' ? value : value.text;

  //Empty tags are valid as they are used to represent either no items or any items
  if (rawText === '') {
    return true;
  }

  //Quoted tags (e.g. tag="hello there") can contain any characters
  const isQuoted = rawText.length >= 2 && rawText.startsWith('"') && rawText.endsWith('"');
  const id = isQuoted ? rawText.slice(1, rawText.length - 1) : rawText;

  //Empty quoted tags (e.g. tag="") are valid - same as tag= - represents entities with no tags
  if (id === '') {
    return true;
  }

  if (!isQuoted && !/^[a-zA-Z0-9\-_.]+$/gim.test(id)) {
    diagnoser.add(value, `Illegal character found in tag: ${rawText}`, DiagnosticSeverity.error, 'minecraft.tag.invalid');
  }

  //Defined in McProject
  if (check_definition_value(diagnoser.project.definitions.tag, id, diagnoser)) {
    return true;
  }

  const data = diagnoser.context.getProjectData().projectData;

  //Project has defined
  if (data.general.tags.has(id)) {
    return true;
  }

  //Nothing then report error
  diagnoser.add(value, `Cannot find tag definition: ${id}`, DiagnosticSeverity.error, 'minecraft.tag.missing');
  return false;
}
