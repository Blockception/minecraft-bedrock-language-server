/**
 * Computes the absolute document offset for a position within an extracted
 * (unescaped) command string that is embedded in a JSON string value.
 *
 * A command embedded in JSON looks like:  "/say hello"
 *                                          ^ jsonStringDocStart  (the opening `"`)
 *
 * Characters layout (with slash prefix):
 *   jsonStringDocStart + 0  →  `"` (opening quote)
 *   jsonStringDocStart + 1  →  `/` (command slash prefix)
 *   jsonStringDocStart + 2  →  first character of the command text
 *
 * Characters layout (without slash prefix):
 *   jsonStringDocStart + 0  →  `"` (opening quote)
 *   jsonStringDocStart + 1  →  first character of the command text
 *
 * @param cmdOffset          - 0-based offset within the command text (i.e. the
 *                             string passed to {@link commandsCheck} after stripping
 *                             any leading `/`)
 * @param jsonStringDocStart - absolute document offset of the JSON string's
 *                             opening double-quote character
 * @param hasSlashPrefix     - `true` (default) when the JSON string value begins
 *                             with a `/` that has been stripped from `cmdOffset`
 * @returns the absolute document offset of the character at `cmdOffset` inside
 *          the command text
 *
 * @example
 * // Document: '{ "on_entry": ["/say hello"] }'
 * //                            ^ position 16 (the opening `"`)
 * offsetIntoJsonString(0, 16)        // → 18  (the `s` in `say`)
 * offsetIntoJsonString(4, 16)        // → 22  (the `h` in `hello`)
 *
 * // Document: '{ "command": "say hello" }'
 * //                          ^ position 14 (the opening `"`)
 * offsetIntoJsonString(0, 14, false) // → 15  (the `s` in `say`)
 * offsetIntoJsonString(4, 14, false) // → 19  (the `h` in `hello`)
 */
export function offsetIntoJsonString(cmdOffset: number, jsonStringDocStart: number, hasSlashPrefix = true): number {
  // +1 for the opening `"`, optionally +1 for the `/` command prefix
  return jsonStringDocStart + 1 + (hasSlashPrefix ? 1 : 0) + cmdOffset;
}
