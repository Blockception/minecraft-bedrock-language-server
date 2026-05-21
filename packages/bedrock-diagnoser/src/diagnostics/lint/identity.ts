import { MCLint } from 'bc-minecraft-project';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../types';

/** The regex that validates a `namespace:name` identity string */
const IDENTITY_REGEX = /^[a-z0-9_]+:[a-z0-9_.]+$/i;

/**
 * Checks that an identifier follows the `namespace:name` format.
 * Reports a diagnostic if the format rule is enabled and the identifier is malformed.
 *
 * @param id The identifier string to validate
 * @param diagnoser The diagnoser to report to
 */
export function lint_check_identity_format(id: string, diagnoser: DiagnosticsBuilder): void {
  const rule = diagnoser.project.linting.rules['identity.format'];
  if (!MCLint.isEnabled(rule)) return;

  if (!IDENTITY_REGEX.test(id)) {
    const severity = getLintSeverity(MCLint.getSeverity(rule));
    diagnoser.add(
      id,
      `Identifier '${id}' does not follow the expected 'namespace:name' format`,
      severity,
      'lint.identity.format',
    );
  }
}

/**
 * Checks that the namespace portion of an identifier is allowed or not denied.
 * The `namespace.allow` rule restricts namespaces to a specific list.
 * The `namespace.deny` rule rejects identifiers with listed namespaces.
 *
 * @param id The identifier string to validate (expected format: `namespace:name`)
 * @param diagnoser The diagnoser to report to
 */
export function lint_check_namespace(id: string, diagnoser: DiagnosticsBuilder): void {
  const colonIndex = id.indexOf(':');
  if (colonIndex < 0) return; // Not a namespaced identifier

  const namespace = id.substring(0, colonIndex);

  // Check allow list
  const allowRule = diagnoser.project.linting.rules['namespace.allow'];
  if (MCLint.isEnabled(allowRule)) {
    const options = MCLint.getOptions(allowRule);
    const allowList = options[0];
    if (Array.isArray(allowList) && !allowList.includes(namespace)) {
      const severity = getLintSeverity(MCLint.getSeverity(allowRule));
      diagnoser.add(
        id,
        `Namespace '${namespace}' is not in the allowed namespaces list: ${allowList.join(', ')}`,
        severity,
        'lint.namespace.allow',
      );
    }
  }

  // Check deny list
  const denyRule = diagnoser.project.linting.rules['namespace.deny'];
  if (MCLint.isEnabled(denyRule)) {
    const options = MCLint.getOptions(denyRule);
    const denyList = options[0];
    if (Array.isArray(denyList) && denyList.includes(namespace)) {
      const severity = getLintSeverity(MCLint.getSeverity(denyRule));
      diagnoser.add(
        id,
        `Namespace '${namespace}' is in the denied namespaces list: ${denyList.join(', ')}`,
        severity,
        'lint.namespace.deny',
      );
    }
  }
}

/**
 * Converts an MCLint severity string into a DiagnosticSeverity value.
 * Defaults to `warning` when the severity cannot be resolved.
 */
export function getLintSeverity(severity: 'off' | 'warn' | 'error'): DiagnosticSeverity {
  switch (severity) {
    case 'error':
      return DiagnosticSeverity.error;
    case 'warn':
      return DiagnosticSeverity.warning;
    default:
      return DiagnosticSeverity.warning;
  }
}
