import { Types } from 'bc-minecraft-bedrock-types';
import { CompactJson, CompactJsonReader } from 'bc-minecraft-bedrock-types/src/minecraft/json';
import { Minecraft } from 'bc-minecraft-bedrock-types';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../../types';
import { behaviorpack_item_diagnose } from '../../behavior-pack/item/diagnose';
import { general_integer_diagnose, general_range_integer_diagnose } from '../../general';
import { mode_slotid_diagnose, mode_slot_type_diagnose } from '../../mode/diagnose';
import { selectorattributes_no_duplicate as no_duplicate } from './checks';
import {
  selectorattribute_no_negatives as no_negatives,
  selectorattribute_one_positive_all_negatives as one_positive_all_negatives,
} from './general';
import { all, diagnoseAttributes, must_offset_word } from './util';

function integer_diagnose(range?: { min: number; max: number }): diagnoseAttributes {
  return must_offset_word((value, diagnoser) => general_integer_diagnose(value, diagnoser, range));
}
function range_integer_diagnose(range?: { min: number; max: number }): diagnoseAttributes {
  return must_offset_word((value, diagnoser) => general_range_integer_diagnose(value, diagnoser, range));
}

export const attribute_hasitem_diagnostics: Record<string, diagnoseAttributes> = {
  item: all(no_duplicate, no_negatives, must_offset_word(behaviorpack_item_diagnose)),
  //Has extra checks down below
  data: all(no_duplicate, no_negatives, integer_diagnose({ min: -1, max: 32767 })),
  quantity: all(one_positive_all_negatives, range_integer_diagnose({ min: 0, max: 32767 })),
  location: all(no_duplicate, one_positive_all_negatives, must_offset_word(mode_slot_type_diagnose)),
  //Has extra checks down below
  slot: all(no_duplicate, one_positive_all_negatives, integer_diagnose({ min: 0, max: 53 })),
};

/**
 * Diagnoses the hasitem selector attribute
 * @param attr
 * @param sel
 * @param diagnoser
 */
export function minecraft_selector_hasitem_diagnose(
  attr: CompactJson.IKeyNode,
  sel: Minecraft.Selector.Selector,
  diagnoser: DiagnosticsBuilder,
): boolean {
  if (CompactJson.isString(attr)) {
    diagnoser.add(
      CompactJson.toOffsetWord(attr),
      'The hasitem attribute needs to be either a array or object',
      DiagnosticSeverity.error,
      'minecraft.selector.hasitem.type',
    );
    return false;
  }

  if (CompactJson.isObject(attr)) {
    return diagnose_hasitem_object(attr, sel, diagnoser);
  }

  let result = true;

  if (CompactJson.isArray(attr)) {
    for (const a of attr.value) {
      //Sub items need to be a object
      if (CompactJson.isObject(a)) {
        result =
          diagnose_hasitem_object(
            CompactJson.toKeyed(a, 'hasitem') as CompactJson.IKeyNode & CompactJson.IObject,
            sel,
            diagnoser,
          ) && result;
      } else {
        diagnoser.add(
          CompactJson.toOffsetWord(a),
          'Expected a object',
          DiagnosticSeverity.error,
          'minecraft.selector.hasitem.type',
        );
        result = false;
      }
    }
  }

  return result;
}

function diagnose_hasitem_object(
  attr: CompactJson.IKeyNode & CompactJson.IObject,
  sel: Minecraft.Selector.Selector,
  diagnoser: DiagnosticsBuilder,
) {
  let result = true;
  const reader = new CompactJsonReader(attr);

  //Hasitem needs to contain the item attribute
  if (!reader.contains('item')) {
    diagnoser.add(
      CompactJson.toOffsetWord(attr),
      'Missing item selector attribute',
      DiagnosticSeverity.error,
      'minecraft.selector.hasitem.item.missing',
    );
    result = false;
  }

  const names = reader.names();
  for (const name of names) {
    const checks = attribute_hasitem_diagnostics[name];
    const attrs = reader.get(name) as CompactJson.IKeyNode[];

    if (checks) {
      result = checks(attrs, sel, diagnoser) && result;
    } else {
      result = defaultAttribute(name, attrs, sel, diagnoser) && result;
    }

    //If still good we check perform additional checks
    if (result) {
      switch (name) {
        case 'data':
          result = diagnose_hasitem_data(attrs, reader, diagnoser) && result;
          break;

        case 'slot':
          result = diagnose_hasitem_slot(attrs, reader, diagnoser) && result;
          break;
      }
    }
  }

  return result;
}

function defaultAttribute(
  attribute: string,
  attributes: CompactJson.INode[],
  sel: Minecraft.Selector.Selector,
  diagnoser: DiagnosticsBuilder,
): boolean {
  const msg = `Unknown attribute: ${attribute}`;

  attributes.forEach((a) => {
    diagnoser.add(
      CompactJson.toOffsetWord(a),
      msg,
      DiagnosticSeverity.error,
      'minecraft.selector.hasitem.attribute.invalid',
    );
  });

  return false;
}

function diagnose_hasitem_data(
  attrs: CompactJson.IKeyNode[],
  reader: CompactJsonReader<CompactJson.IKeyNode & CompactJson.IObject>,
  diagnoser: DiagnosticsBuilder,
): boolean {
  let result = true;
  const item = reader.get('item') as CompactJson.IKeyNode[];
  if (item.length !== 1) {
    return false;
  }

  const itemWord = CompactJson.valueToOffsetWord(item[0]) as Types.OffsetWord & { data: number };
  attrs.forEach((a) => {
    if (CompactJson.isString(a)) {
      itemWord.data = parseInt(a.value);
      result = behaviorpack_item_diagnose(itemWord, diagnoser) && result;
    }
  });

  return result;
}

function diagnose_hasitem_slot(
  attrs: CompactJson.IKeyNode[],
  reader: CompactJsonReader<CompactJson.IKeyNode & CompactJson.IObject>,
  diagnoser: DiagnosticsBuilder,
): boolean {
  let result = true;
  const location = reader.get('location') as CompactJson.IKeyNode[];
  if (location.length !== 1) {
    return false;
  }

  const locationWord = CompactJson.valueToOffsetWord(location[0]);
  attrs.forEach((a) => {
    if (CompactJson.isString(a)) {
      result = mode_slotid_diagnose(locationWord, a.value, diagnoser) && result;
    }
  });

  return result;
}
