import { MCLint } from 'bc-minecraft-project';
import { DiagnosticsBuilder } from '../../types';
import { getLintSeverity } from './identity';

/**
 * Validates a molang variable name against the `molang.variable.naming` lint rule.
 * If the rule is enabled and provides a regex pattern option, the variable name is
 * tested against that pattern and flagged if it does not match.
 *
 * @param variableName The full variable expression to check (e.g. `v.my_var` or `variable.my_var`)
 * @param diagnoser The diagnoser to report to
 */
export function lint_check_molang_variable(variableName: string, diagnoser: DiagnosticsBuilder): void {
  const rule = diagnoser.project.linting.rules['molang.variable.naming'];
  if (!MCLint.isEnabled(rule)) return;

  const options = MCLint.getOptions(rule);
  const pattern = options[0];
  if (typeof pattern !== 'string') return;

  // Extract just the variable part after `v.` / `variable.` or `t.` / `temp.`
  const varPart = extractVariablePart(variableName);
  if (varPart === null) return;

  try {
    const regex = new RegExp(pattern);
    if (!regex.test(varPart)) {
      const severity = getLintSeverity(MCLint.getSeverity(rule));
      diagnoser.add(
        variableName,
        `Molang variable '${varPart}' does not match the required naming pattern: ${pattern}`,
        severity,
        'lint.molang.variable.naming',
      );
    }
  } catch {
    // Invalid regex in user config — skip silently
  }
}

/**
 * Extracts the variable name portion from a molang variable expression.
 * Returns `null` when the expression is not a variable reference.
 *
 * @example
 * extractVariablePart('v.my_var')       // => 'my_var'
 * extractVariablePart('variable.foo')   // => 'foo'
 * extractVariablePart('t.temp_var')     // => 'temp_var'
 * extractVariablePart('temp.bar')       // => 'bar'
 */
function extractVariablePart(expression: string): string | null {
  const lower = expression.toLowerCase();

  for (const prefix of ['variable.', 'v.', 'temp.', 't.']) {
    if (lower.startsWith(prefix)) {
      return expression.slice(prefix.length);
    }
  }

  return null;
}
