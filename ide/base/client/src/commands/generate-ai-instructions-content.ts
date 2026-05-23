export function generateAIInstructionsContent(): string {
  return `# GitHub Copilot Instructions for Minecraft Bedrock Projects

Use these conventions when generating or editing files in this workspace.

## Project structure
- Prefer Bedrock add-on layouts with:
  - \`behavior_packs/<pack_name>/\`
  - \`resource_packs/<pack_name>/\`
- Keep files in their expected domains (behavior logic in BP, visuals/assets in RP).
- Respect existing \`manifest.json\` files and UUID/module structure.

## File types and language IDs
- \`.mcfunction\` (language id: \`bc-mcfunction\`): one command per line, no leading \`/\`.
- \`.molang\` (language id: \`bc-minecraft-molang\`): write valid Molang expressions, keep query/variable usage explicit.
- \`.lang\` (language id: \`bc-minecraft-language\`): \`key=value\` pairs, no JSON, preserve comments/ordering where possible.
- \`.json\` / \`.jsonc\`: preserve Bedrock \`format_version\` and existing object shapes.

## Namespaces and identifiers
- Use namespaced identifiers where possible: \`namespace:name\`.
- Prefer lowercase snake_case for new identifiers (for example \`my_pack:custom_entity\`).
- Keep related ids consistent across behavior and resource files.

## Bedrock-specific guidance
- Entity identifiers should stay consistent across:
  - BP entity definition
  - RP entity/client entity
  - animations / animation_controllers / render_controllers / models
- Place \`.mcfunction\` files under \`functions/\` in behavior packs.
- Place \`.lang\` files under \`texts/\` (for example \`texts/en_US.lang\`).
- When editing existing files, follow current naming and directory conventions first.

## AI output quality requirements
- Generate minimal, targeted edits.
- Do not rename or move unrelated files.
- Do not change unrelated JSON keys or formatting conventions.
- If unsure, ask for the intended pack/folder before generating large changes.
`;
}
