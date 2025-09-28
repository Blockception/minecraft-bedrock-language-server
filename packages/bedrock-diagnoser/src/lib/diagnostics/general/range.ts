import { Types } from "bc-minecraft-bedrock-types";
import { DiagnosticsBuilder, DiagnosticSeverity } from "../../types";
import { general_float_diagnose } from "./float";
import { general_integer_diagnose } from "./integer";

/**
 * Diagnoses a range integer value
 * @param value The value to diagnose
 * @param diagnoser The diagnoser to use
 * @param range The accepted range
 * @returns Returns true when the value is valid
 */
export function general_range_integer_diagnose(
  value: Types.OffsetWord,
  diagnoser: DiagnosticsBuilder,
  range?: { min: number; max: number }
): boolean {
  let upper = Number.MAX_SAFE_INTEGER;
  let lower = Number.MIN_SAFE_INTEGER;

  const index = value.text.indexOf("..");

  //has ..
  if (index >= 0) {
    //Grab texts
    const lowerText = value.text.slice(0, index);
    const upperText = value.text.slice(index + 2);

    //To continue or not
    let co = true;

    //If the text is filled, diagnose it as integer. if that returns false it has an error, then mark 'co'ntinue as false
    if (
      lowerText !== "" &&
      !general_integer_diagnose(Types.OffsetWord.create(lowerText, value.offset), diagnoser, range)
    )
      co = false;
    if (
      upperText !== "" &&
      !general_integer_diagnose(Types.OffsetWord.create(upperText, value.offset + index + 2), diagnoser, range)
    )
      co = false;

    //Return if marked to not continue
    if (!co) {
      return true;
    }

    //Parse values
    if (lowerText !== "") lower = Number.parseInt(lowerText);
    if (upperText !== "") upper = Number.parseInt(upperText);
  } else {
    //Just an integer
    return general_integer_diagnose(value, diagnoser, range);
  }

  //Check if the lowest value is not higher then lower
  if (lower > upper) {
    diagnoser.add(
      value,
      "Lower range is greater than the upper range",
      DiagnosticSeverity.error,
      "general.range.integer.invalid"
    );
    return false;
  }

  return true;
}

/**
 * Diagnoses a range value
 * @param value The value to diagnose
 * @param diagnoser The diagnoser to use
 * @param range The accepted range
 * @returns Returns true when the value is valid
 */
export function general_range_float_diagnose(
  value: Types.OffsetWord,
  diagnoser: DiagnosticsBuilder,
  range?: { min: number; max: number }
): boolean {
  let upper = Number.MAX_VALUE;
  let lower = Number.MIN_VALUE;

  const index = value.text.indexOf("..");

  //has ..
  if (index >= 0) {
    //Grab texts
    const lowerText = value.text.slice(0, index);
    const upperText = value.text.slice(index + 2);

    //To continue or not
    let co = true;

    //If the text is filled, diagnose it as integer. if that returns false it has an error, then mark 'co'ntinue as false
    if (lowerText !== "" && !general_float_diagnose(Types.OffsetWord.create(lowerText, value.offset), diagnoser, range))
      co = false;
    if (
      upperText !== "" &&
      !general_float_diagnose(Types.OffsetWord.create(upperText, value.offset + index + 2), diagnoser, range)
    )
      co = false;

    //Return if marked to not continue
    if (!co) {
      return true;
    }

    //Parse values
    if (lowerText !== "") lower = Number.parseFloat(lowerText);
    if (upperText !== "") upper = Number.parseFloat(upperText);
  } else {
    //Just an integer
    return general_float_diagnose(value, diagnoser, range);
  }

  //Check if the lowest value is not higher then lower
  if (lower > upper) {
    diagnoser.add(
      value,
      "Lower range is greater than the upper range",
      DiagnosticSeverity.error,
      "general.range.float.invalid"
    );
    return false;
  }

  return true;
}
