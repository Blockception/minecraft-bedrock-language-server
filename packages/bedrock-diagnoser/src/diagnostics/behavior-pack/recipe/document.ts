import { Internal } from "bc-minecraft-bedrock-project";
import { FormatVersion } from "bc-minecraft-bedrock-types/src/minecraft";
import { DiagnosticSeverity, DocumentDiagnosticsBuilder } from "../../../types";
import { Json } from "../../json";
import { diagnose_molang_syntax_current_document } from "../../molang";
import { behaviorpack_item_diagnose } from "../item";

const allowedFurnaceTags = ["furnace", "smoker", "campfire", "soul_campfire", "blast_furnace"];
const allowedBrewingTags = ["brewing_stand"];
const allowedSmithingTags = ["smithing_table"];

/**Diagnoses the given document as an script
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export function diagnose_recipe_document(diagnoser: DocumentDiagnosticsBuilder): void {
  const recipe = Json.LoadReport<Internal.BehaviorPack.Recipe>(diagnoser);
  if (!Internal.BehaviorPack.Recipe.is(recipe)) return;
  diagnose_molang_syntax_current_document(diagnoser, recipe);

  if (recipe["minecraft:recipe_shaped"] !== undefined) diagnose_shaped(recipe, diagnoser);
  else if (recipe["minecraft:recipe_shapeless"] !== undefined) diagnose_shapeless(recipe, diagnoser);
  else if (recipe["minecraft:recipe_furnace"] !== undefined) diagnose_furnace(recipe, diagnoser);
  else if (
    recipe["minecraft:recipe_brewing_mix"] !== undefined ||
    recipe["minecraft:recipe_brewing_container"] !== undefined
  )
    diagnose_brewing(recipe, diagnoser);
  else if (recipe["minecraft:recipe_smithing_transform"]) diagnose_smithing(recipe, diagnoser);
}

function diagnose_smithing(recipe: Internal.BehaviorPack.Recipe, diagnoser: DocumentDiagnosticsBuilder) {
  const smithing = recipe["minecraft:recipe_smithing_transform"]!;

  diagnose_recipe_item(smithing.addition, diagnoser);
  diagnose_recipe_item(smithing.base, diagnoser);
  diagnose_recipe_item(smithing.template, diagnoser);
  diagnose_recipe_item(smithing.result, diagnoser);

  diagnose_unlocking(recipe, smithing, diagnoser);

  smithing.tags.forEach((tag) => {
    if (!allowedSmithingTags.includes(tag))
      diagnoser.add(
        "tags/" + tag,
        `Tag "${tag}" cannot be used for smithing recipes`,
        DiagnosticSeverity.warning,
        "behaviorpack.recipes.smithing_tags"
      );
  });
}

function diagnose_brewing(recipe: Internal.BehaviorPack.Recipe, diagnoser: DocumentDiagnosticsBuilder) {
  const brewing =
    recipe["minecraft:recipe_brewing_container"] == undefined
      ? recipe["minecraft:recipe_brewing_mix"]!
      : recipe["minecraft:recipe_brewing_container"];

  diagnose_recipe_item(brewing.input, diagnoser);
  diagnose_recipe_item(brewing.output, diagnoser);
  diagnose_recipe_item(brewing.reagent, diagnoser);

  diagnose_unlocking(recipe, brewing, diagnoser);

  brewing.tags.forEach((tag) => {
    if (!allowedBrewingTags.includes(tag))
      diagnoser.add(
        "tags/" + tag,
        `Tag "${tag}" cannot be used for brewing recipes`,
        DiagnosticSeverity.warning,
        "behaviorpack.recipes.brewing_tags"
      );
  });
}

function diagnose_furnace(recipe: Internal.BehaviorPack.Recipe, diagnoser: DocumentDiagnosticsBuilder) {
  const furnace = recipe["minecraft:recipe_furnace"]!;

  diagnose_recipe_item(furnace.input, diagnoser);
  diagnose_recipe_item(furnace.output, diagnoser);

  diagnose_unlocking(recipe, furnace, diagnoser);

  furnace.tags.forEach((tag) => {
    if (!allowedFurnaceTags.includes(tag))
      diagnoser.add(
        "tags/" + tag,
        `Tag "${tag}" cannot be used for furnace recipes`,
        DiagnosticSeverity.warning,
        "behaviorpack.recipes.furnace_tags"
      );
  });
}

function diagnose_shapeless(recipe: Internal.BehaviorPack.Recipe, diagnoser: DocumentDiagnosticsBuilder) {
  const shapeless = recipe["minecraft:recipe_shapeless"]!;

  const result = shapeless.result;
  if (!Array.isArray(result)) diagnose_recipe_item(result, diagnoser);
  else result.forEach((item) => diagnose_recipe_item(item, diagnoser));

  diagnose_unlocking(recipe, shapeless, diagnoser);

  let count = 0;
  shapeless.ingredients.forEach((item) => {
    if (typeof item == "object" && "item" in item && item.count !== undefined) count += item.count;
    else count++;
    diagnose_recipe_item(item, diagnoser);
  });

  if (count > 9)
    diagnoser.add(
      "ingredients",
      `Too many ingredients: ${count}`,
      DiagnosticSeverity.error,
      "behaviorpack.recipes.ingredient_count"
    );

  //TODO: Account for shapeless.tags
}

function diagnose_shaped(recipe: Internal.BehaviorPack.Recipe, diagnoser: DocumentDiagnosticsBuilder) {
  const shaped = recipe["minecraft:recipe_shaped"]!;
  const result = shaped.result;

  Object.values(shaped.key).forEach((item) => diagnose_recipe_item(item, diagnoser));

  if (!Array.isArray(result)) {
    diagnose_recipe_item(result, diagnoser);
  } else {
    result.forEach((item) => diagnose_recipe_item(item, diagnoser));
  }

  diagnose_unlocking(recipe, shaped, diagnoser);

  const keys = new Set(shaped.pattern.flat().flatMap((x) => x.split("")));
  const usedKeys = Object.keys(shaped.key);
  keys.forEach((key) => {
    if (key == " ") return;
    if (!usedKeys.includes(key))
      diagnoser.add(
        "pattern/" + key,
        `Key "${key}" does not have a matching item`,
        DiagnosticSeverity.error,
        "behaviorpack.recipes.missing_key"
      );
  });

  //TODO: Account for shaped.tags
}

function diagnose_unlocking(
  recipe: Internal.BehaviorPack.Recipe,
  recipeData: any,
  diagnoser: DocumentDiagnosticsBuilder
) {
  try {
    if (
      recipeData.unlock === undefined &&
      FormatVersion.isGreaterThan(FormatVersion.parse(recipe.format_version), [1, 20, 10])
    )
      diagnoser.add(
        recipe.format_version,
        `Recipe unlocking is required in format versions >= 1.20.10`,
        DiagnosticSeverity.error,
        "behaviorpack.recipes.unlocking_required"
      );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    // Leaving empty as the base diagnoser should flag an invalid format version
  }

  if (!Array.isArray(recipeData.unlock)) return;
  recipeData.unlock.forEach((item: any) => diagnose_recipe_item(item, diagnoser));
}

function diagnose_recipe_item(item: any, diagnoser: DocumentDiagnosticsBuilder) {
  if (typeof item == "string") {
    behaviorpack_item_diagnose(item, diagnoser);
  } else if ("item" in item) {
    behaviorpack_item_diagnose(item.item, diagnoser);
  }
}
