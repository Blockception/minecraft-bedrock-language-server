import * as fs from 'fs';

/**
 * Convert property name to snake_case
 */
export function toSnakeCase(name: string): string {
  let result = '';
  for (let i = 0; i < name.length; i++) {
    const char = name[i];
    if (char === char.toUpperCase() && char !== char.toLowerCase()) {
      result += '_' + char.toLowerCase();
    } else {
      result += char;
    }
  }
  return result;
}

/**
 * Convert object keys to snake_case recursively
 */
export function convertToSnakeCase(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(convertToSnakeCase);
  }
  if (obj !== null && typeof obj === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      result[toSnakeCase(key)] = convertToSnakeCase(value);
    }
    return result;
  }
  return obj;
}

/**
 * Save array data to a TypeScript file
 */
export function saveArray<T>(
  type: string,
  typeLocation: string | null,
  name: string,
  data: T,
  filepath: string
): void {
  try {
    let content = '/** Notice: Auto generated file, do not edit */\n\n';

    if (typeLocation !== null) {
      content += `import { ${type} } from '${typeLocation}';\n\n\n`;
    }

    const snakeCaseData = convertToSnakeCase(data);
    const jsonContent = JSON.stringify(snakeCaseData, null, 2);

    content += `export const ${name}: ${type}[] = ${jsonContent};`;

    console.log("saving: " + filepath);
    fs.writeFileSync(filepath, content, 'utf-8');
  } catch (ex) {
    console.error(ex);
  }
}

/**
 * Save single object data to a TypeScript file
 */
export function saveSingle<T>(
  type: string,
  typeLocation: string | null,
  name: string,
  data: T,
  filepath: string
): void {
  try {
    let content = '/** Notice: Auto generated file, do not edit */\n\n';

    if (typeLocation !== null) {
      content += `import { ${type} } from '${typeLocation}';\n\n\n`;
    }

    const snakeCaseData = convertToSnakeCase(data);
    const jsonContent = JSON.stringify(snakeCaseData, null, 2);

    content += `export const ${name}: ${type} = ${jsonContent};`;

    console.log("saving: " + filepath);
    fs.writeFileSync(filepath, content, 'utf-8');
  } catch (ex) {
    console.error(ex);
  }
}
