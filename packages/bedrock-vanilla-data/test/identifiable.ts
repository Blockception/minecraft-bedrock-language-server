import { fail } from "assert";
import { assert } from "console";
import { Identifiable } from "../src/Lib/Types/Identifiable";

export function Test_Identifiable(data: Identifiable) {
  if (Identifiable.is(data)) {
    assert(data.id.length > 0, `Not a length on ID: ${JSON.stringify(data)}`);
  } else {
    fail(`Not a proper Identifiable: ${JSON.stringify(data)}`);
  }
}

export function Check_Identifiable(data: (Identifiable | string)[]): void {
  data.forEach((item) => {
    assert(count(data, item) === 1, "found duplicate items");
  });
}

export function Check_IsFunction<T extends Identifiable>(items: T[], check: (value: any) => value is T) {
  items.forEach((item, index) => {
    if (check(item)) {
      // do nothing
    } else {
      throw new Error(`at '${index}', Did not pass the is function check: ${check.name}`);
    }
  });
}

function count(data: (Identifiable | string)[], id: Identifiable | string): number {
  let out = 0;

  const find = typeof id === "string" ? id : id.id;

  data.forEach((item) => {
    if (typeof item !== "string") item = item.id;

    if (item === find) out++;
  });

  return out;
}
