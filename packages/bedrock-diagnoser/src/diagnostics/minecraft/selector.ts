import { OffsetWord } from '@blockception/packages-shared';
import { ParameterInfo } from 'bc-minecraft-bedrock-command';
import { Text } from 'bc-minecraft-bedrock-project';
import { Minecraft } from 'bc-minecraft-bedrock-types';
import { CompactJson } from 'bc-minecraft-bedrock-types/src/minecraft/json';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../types';
import { check_definition_value } from '../definitions';
import { Attribute } from './selector/attributes';

/**
 *
 * @param pattern
 * @param value
 * @param diagnoser
 * @returns
 */
export function minecraft_selector_diagnose(
  pattern: ParameterInfo,
  value: OffsetWord,
  diagnoser: DiagnosticsBuilder,
) {
  const sel = value.text;

  //Is a selector?
  if (sel.startsWith('@')) {
    minecraft_selector_diagnose_hard(value, diagnoser, pattern);
    return;
  }

  //Fake entity or named then
  const name = Text.UnQuote(sel);

  //Fake players have been banned
  if (pattern.options?.allowFakePlayers === false) {
    diagnoser.add(value, 'No fake players / names allowed', DiagnosticSeverity.error, 'minecraft.selector.invalid');
    return;
  }

  if (pattern.options?.playerOnly === true) {
    diagnoser.add(
      value,
      'Only players selector allowed to be used',
      DiagnosticSeverity.error,
      'minecraft.selector.invalid',
    );
    return;
  }

  const data = diagnoser.context.getProjectData().projectData;

  //Defined in McProject
  if (check_definition_value(diagnoser.project.definitions.name, name, diagnoser)) return;

  //Project has defined this fake entity
  if (data.general.fakeEntities.has(name)) return;

  //Found nothing then report
  diagnoser.add(
    value,
    `Cannot find fake entity definition or name for: ${name}`,
    DiagnosticSeverity.warning,
    'minecraft.fakeentity.missing',
  );
}

/**
 * Diagnoses a selector
 * @param pattern
 * @param value
 * @param diagnoser
 */
function minecraft_selector_diagnose_hard(
  value: OffsetWord,
  diagnoser: DiagnosticsBuilder,
  pattern: ParameterInfo,
): boolean {
  const selector = Minecraft.Selector.Selector.parse(value.text, value.offset);

  if (selector === undefined) {
    diagnoser.add(value, 'Invalid selector', DiagnosticSeverity.error, 'minecraft.selector.invalid');
    return false;
  }
  let result = true;

  //If the selector is only meant to be aimed at player warn the user
  if (pattern.options?.playerOnly === true) {
    switch (selector.selectorType) {
      case '@e':
      case '@v':
        result = false;
        diagnoser.add(
          value,
          'Selector is meant to target only players',
          DiagnosticSeverity.info,
          'minecraft.selector.playeronly',
        );
        break;
    }
  }

  if (!Minecraft.Selector.Selector.isValidType(selector)) {
    result = false;
    diagnoser.add(
      value,
      `Unknown selector type: ${selector.type}`,
      DiagnosticSeverity.error,
      'minecraft.selector.type.invalid',
    );
  }

  //Check attributes
  const names = selector.names();

  for (const name of names) {
    const attributes = selector.get(name);
    //No attribute then next
    if (attributes) {
      result &&= minecraft_selector_attribute_diagnose_hard(
        name,
        attributes as CompactJson.IKeyNode[],
        selector,
        diagnoser,
      );
    }
  }

  return result;
}

/**
 * Diagnoses a selector attribute
 * @param attribute The attribute to diagnose
 * @param attributes The attributes to diagnose
 * @param selector The selector to diagnose
 * @param diagnoser The diagnoser to use
 * @returns Returns true when the attribute is valid
 */
export function minecraft_selector_attribute_diagnose_hard(
  attribute: string,
  attributes: CompactJson.IKeyNode[],
  selector: Minecraft.Selector.Selector,
  diagnoser: DiagnosticsBuilder,
): boolean {
  return Attribute.diagnose(attribute, attributes as Minecraft.Json.CompactJson.IKeyNode[], selector, diagnoser);
}
