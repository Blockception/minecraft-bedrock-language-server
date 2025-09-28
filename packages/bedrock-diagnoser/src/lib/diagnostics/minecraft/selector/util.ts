import { CompactJson } from "bc-minecraft-bedrock-types/lib/minecraft/json";
import { Selector } from "bc-minecraft-bedrock-types/lib/minecraft/selector";
import { OffsetWord } from "bc-minecraft-bedrock-types/lib/types";
import { DiagnosticSeverity, DiagnosticsBuilder } from "../../../types";

export type diagnoseAttribute = (
  attribute: CompactJson.IKeyNode,
  sel: Selector,
  diagnoser: DiagnosticsBuilder
) => boolean;
export type diagnoseAttributes = (
  attributes: CompactJson.IKeyNode[],
  sel: Selector,
  diagnoser: DiagnosticsBuilder
) => boolean;

/**
 *
 * @param fn
 * @returns
 */
export function all(...fn: diagnoseAttributes[]): diagnoseAttributes {
  return (attr: CompactJson.IKeyNode[], sel: Selector, diagnoser: DiagnosticsBuilder) => {
    let result = true;

    for (const f of fn) {
      result = result && f(attr, sel, diagnoser);
    }

    return result;
  };
}

export function forEach(fn: diagnoseAttribute): diagnoseAttributes {
  return (attr: CompactJson.IKeyNode[], sel: Selector, diagnoser: DiagnosticsBuilder) => {
    let result = true;

    for (const a of attr) {
      result = result && fn(a, sel, diagnoser);
    }

    return result;
  };
}

export function must_offset_word(
  fn: (value: OffsetWord, diagnoser: DiagnosticsBuilder) => boolean
): diagnoseAttributes {
  return forEach((attr, sel, diagnoser) => {
    if (CompactJson.isString(attr)) {
      const word = CompactJson.valueToOffsetWord(attr);
      if (word.text.startsWith("!")) {
        word.text = word.text.slice(1);
        word.offset++;
      }

      return fn(word, diagnoser);
    }

    diagnoser.add(
      CompactJson.valueToOffsetWord(attr),
      "Expected a string",
      DiagnosticSeverity.error,
      "minecraft.selector.attribute.string"
    );
    return false;
  });
}
