import { Defined, Using } from "bc-minecraft-bedrock-project";

export function* filter_not_defined(using: Using, defined: Defined | undefined) {
  defined = defined ?? Defined.create();

  for (const s of using.using) {
    if (!defined.defined.has(s)) {
      yield s;
    }
  }
}
