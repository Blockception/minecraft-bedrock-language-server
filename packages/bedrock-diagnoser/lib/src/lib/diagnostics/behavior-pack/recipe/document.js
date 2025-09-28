"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_recipe_document = diagnose_recipe_document;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const minecraft_1 = require("bc-minecraft-bedrock-types/lib/minecraft");
const types_1 = require("../../../types");
const json_1 = require("../../json");
const molang_1 = require("../../molang");
const item_1 = require("../item");
const allowedFurnaceTags = ["furnace", "smoker", "campfire", "soul_campfire", "blast_furnace"];
const allowedBrewingTags = ["brewing_stand"];
const allowedSmithingTags = ["smithing_table"];
/**Diagnoses the given document as an script
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
function diagnose_recipe_document(diagnoser) {
    const recipe = json_1.Json.LoadReport(diagnoser);
    if (!bc_minecraft_bedrock_project_1.Internal.BehaviorPack.Recipe.is(recipe))
        return;
    (0, molang_1.diagnose_molang_syntax_current_document)(diagnoser, recipe);
    if (recipe["minecraft:recipe_shaped"] !== undefined)
        diagnose_shaped(recipe, diagnoser);
    else if (recipe["minecraft:recipe_shapeless"] !== undefined)
        diagnose_shapeless(recipe, diagnoser);
    else if (recipe["minecraft:recipe_furnace"] !== undefined)
        diagnose_furnace(recipe, diagnoser);
    else if (recipe["minecraft:recipe_brewing_mix"] !== undefined ||
        recipe["minecraft:recipe_brewing_container"] !== undefined)
        diagnose_brewing(recipe, diagnoser);
    else if (recipe["minecraft:recipe_smithing_transform"])
        diagnose_smithing(recipe, diagnoser);
}
function diagnose_smithing(recipe, diagnoser) {
    const smithing = recipe["minecraft:recipe_smithing_transform"];
    diagnose_recipe_item(smithing.addition, diagnoser);
    diagnose_recipe_item(smithing.base, diagnoser);
    diagnose_recipe_item(smithing.template, diagnoser);
    diagnose_recipe_item(smithing.result, diagnoser);
    diagnose_unlocking(recipe, smithing, diagnoser);
    smithing.tags.forEach((tag) => {
        if (!allowedSmithingTags.includes(tag))
            diagnoser.add("tags/" + tag, `Tag "${tag}" cannot be used for smithing recipes`, types_1.DiagnosticSeverity.warning, "behaviorpack.recipes.smithing_tags");
    });
}
function diagnose_brewing(recipe, diagnoser) {
    const brewing = recipe["minecraft:recipe_brewing_container"] == undefined
        ? recipe["minecraft:recipe_brewing_mix"]
        : recipe["minecraft:recipe_brewing_container"];
    diagnose_recipe_item(brewing.input, diagnoser);
    diagnose_recipe_item(brewing.output, diagnoser);
    diagnose_recipe_item(brewing.reagent, diagnoser);
    diagnose_unlocking(recipe, brewing, diagnoser);
    brewing.tags.forEach((tag) => {
        if (!allowedBrewingTags.includes(tag))
            diagnoser.add("tags/" + tag, `Tag "${tag}" cannot be used for brewing recipes`, types_1.DiagnosticSeverity.warning, "behaviorpack.recipes.brewing_tags");
    });
}
function diagnose_furnace(recipe, diagnoser) {
    const furnace = recipe["minecraft:recipe_furnace"];
    diagnose_recipe_item(furnace.input, diagnoser);
    diagnose_recipe_item(furnace.output, diagnoser);
    diagnose_unlocking(recipe, furnace, diagnoser);
    furnace.tags.forEach((tag) => {
        if (!allowedFurnaceTags.includes(tag))
            diagnoser.add("tags/" + tag, `Tag "${tag}" cannot be used for furnace recipes`, types_1.DiagnosticSeverity.warning, "behaviorpack.recipes.furnace_tags");
    });
}
function diagnose_shapeless(recipe, diagnoser) {
    const shapeless = recipe["minecraft:recipe_shapeless"];
    const result = shapeless.result;
    if (!Array.isArray(result))
        diagnose_recipe_item(result, diagnoser);
    else
        result.forEach((item) => diagnose_recipe_item(item, diagnoser));
    diagnose_unlocking(recipe, shapeless, diagnoser);
    let count = 0;
    shapeless.ingredients.forEach((item) => {
        if (typeof item == "object" && "item" in item && item.count !== undefined)
            count += item.count;
        else
            count++;
        diagnose_recipe_item(item, diagnoser);
    });
    if (count > 9)
        diagnoser.add("ingredients", `Too many ingredients: ${count}`, types_1.DiagnosticSeverity.error, "behaviorpack.recipes.ingredient_count");
    //TODO: Account for shapeless.tags
}
function diagnose_shaped(recipe, diagnoser) {
    const shaped = recipe["minecraft:recipe_shaped"];
    const result = shaped.result;
    Object.values(shaped.key).forEach((item) => diagnose_recipe_item(item, diagnoser));
    if (!Array.isArray(result)) {
        diagnose_recipe_item(result, diagnoser);
    }
    else {
        result.forEach((item) => diagnose_recipe_item(item, diagnoser));
    }
    diagnose_unlocking(recipe, shaped, diagnoser);
    const keys = new Set(shaped.pattern.flat().flatMap((x) => x.split("")));
    const usedKeys = Object.keys(shaped.key);
    keys.forEach((key) => {
        if (key == " ")
            return;
        if (!usedKeys.includes(key))
            diagnoser.add("pattern/" + key, `Key "${key}" does not have a matching item`, types_1.DiagnosticSeverity.error, "behaviorpack.recipes.missing_key");
    });
    //TODO: Account for shaped.tags
}
function diagnose_unlocking(recipe, recipeData, diagnoser) {
    try {
        if (recipeData.unlock === undefined &&
            minecraft_1.FormatVersion.isGreaterThan(minecraft_1.FormatVersion.parse(recipe.format_version), [1, 20, 10]))
            diagnoser.add(recipe.format_version, `Recipe unlocking is required in format versions >= 1.20.10`, types_1.DiagnosticSeverity.error, "behaviorpack.recipes.unlocking_required");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }
    catch (err) {
        // Leaving empty as the base diagnoser should flag an invalid format version
    }
    if (!Array.isArray(recipeData.unlock))
        return;
    recipeData.unlock.forEach((item) => diagnose_recipe_item(item, diagnoser));
}
function diagnose_recipe_item(item, diagnoser) {
    if (typeof item == "string") {
        (0, item_1.behaviorpack_item_diagnose)(item, diagnoser);
    }
    else if ("item" in item) {
        (0, item_1.behaviorpack_item_diagnose)(item.item, diagnoser);
    }
}
//# sourceMappingURL=document.js.map