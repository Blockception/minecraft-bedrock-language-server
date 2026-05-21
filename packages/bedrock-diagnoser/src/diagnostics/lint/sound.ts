import { MCLint } from 'bc-minecraft-project';
import { DiagnosticsBuilder } from '../../types';
import { getLintSeverity } from './identity';

/** The default set of valid sound file extensions */
const DEFAULT_SOUND_EXTENSIONS = ['.ogg', '.wav'];

/**
 * Validates the file extension of a sound path reference against the `sound.extensions` lint rule.
 * When the rule is enabled and a sound path explicitly includes a file extension, the extension
 * must be one of the allowed values. Paths without an extension are always accepted — Minecraft
 * resolves the actual file extension at runtime.
 *
 * Options: `[severity, [".ogg", ".wav"]]` — the list of allowed extensions defaults to
 * `[".ogg", ".wav"]` when omitted.
 *
 * @param soundPath The sound path to validate (e.g. `sounds/foo/bar` or `sounds/foo/bar.ogg`)
 * @param diagnoser The diagnoser to report to
 */
export function lint_check_sound_extension(soundPath: string, diagnoser: DiagnosticsBuilder): void {
  const rule = diagnoser.project.linting.rules['sound.extensions'];
  if (!MCLint.isEnabled(rule)) return;

  // Extract the extension from the path (empty string when there is none)
  const dotIndex = soundPath.lastIndexOf('.');
  const slashIndex = Math.max(soundPath.lastIndexOf('/'), soundPath.lastIndexOf('\\'));

  // No extension — the runtime resolves the file; nothing to validate
  if (dotIndex < 0 || dotIndex < slashIndex) return;

  const ext = soundPath.slice(dotIndex).toLowerCase();

  // Resolve the allowed-extensions list from rule options, falling back to defaults
  const options = MCLint.getOptions(rule);
  const customList = options[0];
  const allowedExtensions: string[] =
    Array.isArray(customList) && customList.length > 0
      ? (customList as string[]).map((e) => e.toLowerCase())
      : DEFAULT_SOUND_EXTENSIONS;

  if (!allowedExtensions.includes(ext)) {
    const severity = getLintSeverity(MCLint.getSeverity(rule));
    diagnoser.add(
      soundPath,
      `Sound file '${soundPath}' uses extension '${ext}' which is not in the allowed list: ${allowedExtensions.join(', ')}`,
      severity,
      'lint.sound.extensions',
    );
  }
}
