import { MCLint, MCLintRules } from 'bc-minecraft-project';
import { DiagnosticsBuilder } from '../../types';
import { getLintSeverity } from './identity';

/**
 * Generic naming check: tests an identifier against a regex pattern from the given lint rule.
 * Reports a diagnostic if the rule is enabled, a pattern is configured, and the ID does not match.
 *
 * @param ruleKey The key in `MCLintRules` to look up
 * @param id The identifier to validate
 * @param label Human-readable label used in the diagnostic message (e.g. `"Animation ID"`)
 * @param diagnoser The diagnoser to report to
 */
function lint_check_naming(
  ruleKey: keyof MCLintRules,
  id: string,
  label: string,
  diagnoser: DiagnosticsBuilder,
): void {
  const rule = diagnoser.project.linting.rules[ruleKey];
  if (!MCLint.isEnabled(rule)) return;

  const options = MCLint.getOptions(rule);
  const pattern = options[0];
  if (typeof pattern !== 'string') return;

  try {
    const regex = new RegExp(pattern);
    if (!regex.test(id)) {
      const severity = getLintSeverity(MCLint.getSeverity(rule));
      diagnoser.add(
        id,
        `${label} '${id}' does not match the required naming pattern: ${pattern}`,
        severity,
        `lint.${ruleKey}`,
      );
    }
  } catch {
    // Invalid regex in user config — skip silently
  }
}

/**
 * Validates an animation ID against the `animation.naming` lint rule.
 * @param animId The animation identifier to validate (e.g. `animation.entity.walk`)
 * @param diagnoser The diagnoser to report to
 */
export function lint_check_animation_naming(animId: string, diagnoser: DiagnosticsBuilder): void {
  lint_check_naming('animation.naming', animId, 'Animation ID', diagnoser);
}

/**
 * Validates an animation controller ID against the `animation-controller.naming` lint rule.
 * @param controllerId The animation controller identifier to validate (e.g. `controller.animation.entity.main`)
 * @param diagnoser The diagnoser to report to
 */
export function lint_check_animation_controller_naming(controllerId: string, diagnoser: DiagnosticsBuilder): void {
  lint_check_naming('animation-controller.naming', controllerId, 'Animation controller ID', diagnoser);
}

/**
 * Validates an animation controller state ID against the `animation-state.naming` lint rule.
 * @param stateId The animation state identifier to validate (e.g. `default`)
 * @param diagnoser The diagnoser to report to
 */
export function lint_check_animation_state_naming(stateId: string, diagnoser: DiagnosticsBuilder): void {
  lint_check_naming('animation-state.naming', stateId, 'Animation state', diagnoser);
}

/**
 * Validates a biome identifier against the `biome.naming` lint rule.
 * @param biomeId The biome identifier to validate (e.g. `mynamespace:my_biome`)
 * @param diagnoser The diagnoser to report to
 */
export function lint_check_biome_naming(biomeId: string, diagnoser: DiagnosticsBuilder): void {
  lint_check_naming('biome.naming', biomeId, 'Biome identifier', diagnoser);
}

/**
 * Validates a block identifier against the `block.naming` lint rule.
 * @param blockId The block identifier to validate (e.g. `mynamespace:my_block`)
 * @param diagnoser The diagnoser to report to
 */
export function lint_check_block_naming(blockId: string, diagnoser: DiagnosticsBuilder): void {
  lint_check_naming('block.naming', blockId, 'Block identifier', diagnoser);
}

/**
 * Validates a bone name against the `bone.naming` lint rule.
 * @param boneId The bone name to validate (e.g. `leftArm`)
 * @param diagnoser The diagnoser to report to
 */
export function lint_check_bone_naming(boneId: string, diagnoser: DiagnosticsBuilder): void {
  lint_check_naming('bone.naming', boneId, 'Bone name', diagnoser);
}

/**
 * Validates an entity identifier against the `entity.naming` lint rule.
 * @param entityId The entity identifier to validate (e.g. `mynamespace:my_entity`)
 * @param diagnoser The diagnoser to report to
 */
export function lint_check_entity_naming(entityId: string, diagnoser: DiagnosticsBuilder): void {
  lint_check_naming('entity.naming', entityId, 'Entity identifier', diagnoser);
}

/**
 * Validates a feature identifier against the `feature.naming` lint rule.
 * @param featureId The feature identifier to validate
 * @param diagnoser The diagnoser to report to
 */
export function lint_check_feature_naming(featureId: string, diagnoser: DiagnosticsBuilder): void {
  lint_check_naming('feature.naming', featureId, 'Feature identifier', diagnoser);
}

/**
 * Validates a feature rule identifier against the `feature-rule.naming` lint rule.
 * @param featureRuleId The feature rule identifier to validate
 * @param diagnoser The diagnoser to report to
 */
export function lint_check_feature_rule_naming(featureRuleId: string, diagnoser: DiagnosticsBuilder): void {
  lint_check_naming('feature-rule.naming', featureRuleId, 'Feature rule identifier', diagnoser);
}

/**
 * Validates a fog setting identifier against the `fog.naming` lint rule.
 * @param fogId The fog identifier to validate (e.g. `mynamespace:my_fog`)
 * @param diagnoser The diagnoser to report to
 */
export function lint_check_fog_naming(fogId: string, diagnoser: DiagnosticsBuilder): void {
  lint_check_naming('fog.naming', fogId, 'Fog identifier', diagnoser);
}

/**
 * Validates an item identifier against the `item.naming` lint rule.
 * @param itemId The item identifier to validate (e.g. `mynamespace:my_item`)
 * @param diagnoser The diagnoser to report to
 */
export function lint_check_item_naming(itemId: string, diagnoser: DiagnosticsBuilder): void {
  lint_check_naming('item.naming', itemId, 'Item identifier', diagnoser);
}

/**
 * Validates a model/geometry identifier against the `model.naming` lint rule.
 * @param modelId The model identifier to validate (e.g. `geometry.my_model`)
 * @param diagnoser The diagnoser to report to
 */
export function lint_check_model_naming(modelId: string, diagnoser: DiagnosticsBuilder): void {
  lint_check_naming('model.naming', modelId, 'Model identifier', diagnoser);
}

/**
 * Validates a particle identifier against the `particle.naming` lint rule.
 * @param particleId The particle identifier to validate (e.g. `mynamespace:my_particle`)
 * @param diagnoser The diagnoser to report to
 */
export function lint_check_particle_naming(particleId: string, diagnoser: DiagnosticsBuilder): void {
  lint_check_naming('particle.naming', particleId, 'Particle identifier', diagnoser);
}

/**
 * Validates a render controller ID against the `render-controller.naming` lint rule.
 * @param controllerId The render controller identifier to validate (e.g. `controller.render.my_entity`)
 * @param diagnoser The diagnoser to report to
 */
export function lint_check_render_controller_naming(controllerId: string, diagnoser: DiagnosticsBuilder): void {
  lint_check_naming('render-controller.naming', controllerId, 'Render controller ID', diagnoser);
}

/**
 * Validates a mcfunction ID (its file name relative to the `functions/` directory, without the
 * `.mcfunction` extension) against the `mcfunction.naming` lint rule.
 * If the rule is enabled and provides a regex pattern option, the function ID is
 * tested against that pattern and flagged if it does not match.
 *
 * @param functionId The function identifier to validate (e.g. `my_folder/my_function`)
 * @param diagnoser The diagnoser to report to
 */
export function lint_check_mcfunction_naming(functionId: string, diagnoser: DiagnosticsBuilder): void {
  const rule = diagnoser.project.linting.rules['mcfunction.naming'];
  if (!MCLint.isEnabled(rule)) return;

  const options = MCLint.getOptions(rule);
  const pattern = options[0];
  if (typeof pattern !== 'string') return;

  try {
    const regex = new RegExp(pattern);
    if (!regex.test(functionId)) {
      const severity = getLintSeverity(MCLint.getSeverity(rule));
      diagnoser.add(
        0,
        `Mcfunction '${functionId}' does not match the required naming pattern: ${pattern}`,
        severity,
        'lint.mcfunction.naming',
      );
    }
  } catch {
    // Invalid regex in user config — skip silently
  }
}

/**
 * Validates a fake player name against the `fake-player.naming` lint rule.
 * If the rule is enabled and provides a regex pattern option, the fake player name is
 * tested against that pattern and flagged if it does not match.
 *
 * @param name The fake player name to validate (e.g. `#myScore`)
 * @param diagnoser The diagnoser to report to
 */
export function lint_check_fake_player_naming(name: string, diagnoser: DiagnosticsBuilder): void {
  const rule = diagnoser.project.linting.rules['fake-player.naming'];
  if (!MCLint.isEnabled(rule)) return;

  const options = MCLint.getOptions(rule);
  const pattern = options[0];
  if (typeof pattern !== 'string') return;

  try {
    const regex = new RegExp(pattern);
    if (!regex.test(name)) {
      const severity = getLintSeverity(MCLint.getSeverity(rule));
      diagnoser.add(
        name,
        `Fake player name '${name}' does not match the required naming pattern: ${pattern}`,
        severity,
        'lint.fake-player.naming',
      );
    }
  } catch {
    // Invalid regex in user config — skip silently
  }
}
