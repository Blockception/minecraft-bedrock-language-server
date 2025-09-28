import { CompactJson } from "bc-minecraft-bedrock-types/lib/minecraft/json";
import { Selector } from "bc-minecraft-bedrock-types/lib/minecraft/selector/selector";
import { DiagnosticsBuilder, DiagnosticSeverity } from "../../../types";

/**
 * Attribute can only be tested positive once, but can have all the negative tests
 * @param parameters The parameters to check
 * @param selector The selector the parameters are from
 * @param diagnoser The diagnoser to use
 * @returns Returns true if the selector is valid
 */
export function selectorattribute_one_positive_all_negatives(
  parameters: CompactJson.IKeyNode[],
  selector: Selector,
  diagnoser: DiagnosticsBuilder
): boolean {
  let result = true;
  //Attribute can only be tested positive once, but can have all the negative tests
  if (parameters.length <= 1) return result;

  let negatives = 0;
  for (const element of parameters) {
    if (element.negative === true) {
      negatives++;
    }
  }

  //If we have less negatives then parameters - 1, then that means there are more positive thens 1
  if (negatives < parameters.length - 1) {
    result = false;

    parameters.forEach((item) => {
      diagnoser.add(
        CompactJson.toOffsetWord(item),
        `Parameter: "${item.key}" can only have 1 positive test or/and multiple negatives test`,
        DiagnosticSeverity.error,
        "minecraft.selector.attribute.test.one_positive_all_negatives"
      );
    });
  }

  return result;
}

/**
 * Checks if the attribute has duplicates tests
 * @param parameters
 * @param selector The selector the parameters are from
 * @param diagnoser
 * @returns
 */
export function selectorattribute_duplicate_check(
  parameters: CompactJson.IKeyNode[],
  selector: Selector,
  diagnoser: DiagnosticsBuilder
): boolean {
  let result = true;
  //Just check for duplicate tests
  if (parameters.length <= 1) return result;

  for (let I = 0; I < parameters.length; I++) {
    const first = parameters[I];

    for (let J = I + 1; J < parameters.length; J++) {
      const second = parameters[J];

      if (first.offset !== second.offset && first.value === second.value) {
        result = false;
        diagnoser.add(
          CompactJson.toOffsetWord(second),
          `Duplicate test for parameter: "${second.key}"`,
          DiagnosticSeverity.error,
          "minecraft.selector.attribute.test.duplicate"
        );
      }
    }
  }

  return result;
}

/**
 * No negative tests are allowed
 * @param parameters The parameters to check
 * @param selector The selector the parameters are from
 * @param diagnoser The diagnoser to use
 */
export function selectorattribute_no_negatives(
  parameters: CompactJson.IKeyNode[],
  selector: Selector,
  diagnoser: DiagnosticsBuilder
): boolean {
  let result = true;

  for (const p of parameters) {
    if (p.negative === true) {
      result = false;

      diagnoser.add(
        CompactJson.toOffsetWord(p),
        `Parameter: "${p.key}" can not have a negative test`,
        DiagnosticSeverity.error,
        "minecraft.selector.attribute.test.nonegatives"
      );
    }
  }

  return result;
}
