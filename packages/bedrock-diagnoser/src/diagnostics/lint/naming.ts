import { MCLint } from 'bc-minecraft-project';
import { DiagnosticsBuilder } from '../../types';
import { getLintSeverity } from './identity';

/**
 * Validates an animation ID against the `animation.naming` lint rule.
 * If the rule is enabled and provides a regex pattern option, the animation ID is
 * tested against that pattern and flagged if it does not match.
 *
 * @param animId The animation identifier to validate (e.g. `animation.entity.walk`)
 * @param diagnoser The diagnoser to report to
 */
export function lint_check_animation_naming(animId: string, diagnoser: DiagnosticsBuilder): void {
  const rule = diagnoser.project.linting.rules['animation.naming'];
  if (!MCLint.isEnabled(rule)) return;

  const options = MCLint.getOptions(rule);
  const pattern = options[0];
  if (typeof pattern !== 'string') return;

  try {
    const regex = new RegExp(pattern);
    if (!regex.test(animId)) {
      const severity = getLintSeverity(MCLint.getSeverity(rule));
      diagnoser.add(
        animId,
        `Animation ID '${animId}' does not match the required naming pattern: ${pattern}`,
        severity,
        'lint.animation.naming',
      );
    }
  } catch {
    // Invalid regex in user config — skip silently
  }
}

/**
 * Validates an animation controller state ID against the `animation-state.naming` lint rule.
 * If the rule is enabled and provides a regex pattern option, the state ID is
 * tested against that pattern and flagged if it does not match.
 *
 * @param stateId The animation state identifier to validate (e.g. `default`)
 * @param diagnoser The diagnoser to report to
 */
export function lint_check_animation_state_naming(stateId: string, diagnoser: DiagnosticsBuilder): void {
  const rule = diagnoser.project.linting.rules['animation-state.naming'];
  if (!MCLint.isEnabled(rule)) return;

  const options = MCLint.getOptions(rule);
  const pattern = options[0];
  if (typeof pattern !== 'string') return;

  try {
    const regex = new RegExp(pattern);
    if (!regex.test(stateId)) {
      const severity = getLintSeverity(MCLint.getSeverity(rule));
      diagnoser.add(
        stateId,
        `Animation state '${stateId}' does not match the required naming pattern: ${pattern}`,
        severity,
        'lint.animation-state.naming',
      );
    }
  } catch {
    // Invalid regex in user config — skip silently
  }
}

/**
 * Validates a bone name against the `bone.naming` lint rule.
 * If the rule is enabled and provides a regex pattern option, the bone name is
 * tested against that pattern and flagged if it does not match.
 *
 * @param boneId The bone name to validate (e.g. `leftArm`)
 * @param diagnoser The diagnoser to report to
 */
export function lint_check_bone_naming(boneId: string, diagnoser: DiagnosticsBuilder): void {
  const rule = diagnoser.project.linting.rules['bone.naming'];
  if (!MCLint.isEnabled(rule)) return;

  const options = MCLint.getOptions(rule);
  const pattern = options[0];
  if (typeof pattern !== 'string') return;

  try {
    const regex = new RegExp(pattern);
    if (!regex.test(boneId)) {
      const severity = getLintSeverity(MCLint.getSeverity(rule));
      diagnoser.add(
        boneId,
        `Bone name '${boneId}' does not match the required naming pattern: ${pattern}`,
        severity,
        'lint.bone.naming',
      );
    }
  } catch {
    // Invalid regex in user config — skip silently
  }
}
