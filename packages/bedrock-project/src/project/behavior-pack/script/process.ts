import { CommandContainer, CommandData, CommandInfo, ParameterInfo, ParameterType } from 'bc-minecraft-bedrock-command';
import { TextDocument } from '../../../types';
import * as ts from 'typescript';

type ResolvedValue = string | number | boolean | undefined | ResolvedObject | ResolvedArray;
type ResolvedArray = ResolvedValue[];
interface ResolvedObject {
  [key: string]: ResolvedValue;
}

/**
 * Parses script files and registers script-defined custom commands.
 */
export function process(doc: TextDocument): void {
  const data = parseCustomCommands(doc);
  CommandData.setCustomCommands(doc.uri, data);
}

export function parseCustomCommands(doc: TextDocument): CommandContainer {
  const text = doc.getText();
  const language = doc.uri.endsWith('.ts') ? 'typescript' : 'javascript';
  const scriptKind = doc.uri.endsWith('.ts') ? ts.ScriptKind.TS : ts.ScriptKind.JS;
  const source = ts.createSourceFile(doc.uri, text, ts.ScriptTarget.Latest, true, scriptKind);
  const variables = new Map<string, ts.Expression>();
  const output: CommandContainer = {};

  visit(source);
  return output;

  function visit(node: ts.Node): void {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) {
      variables.set(node.name.text, node.initializer);
    }

    if (ts.isCallExpression(node)) {
      const call = node;
      if (isCustomCommandRegisterCall(call)) {
        const info = parseRegisterCall(call, source, variables, doc.uri, language);
        if (info) {
          const list = output[info.name] ?? [];
          list.push(info);
          output[info.name] = list;
        }
      }
    }

    ts.forEachChild(node, visit);
  }
}

function isCustomCommandRegisterCall(node: ts.CallExpression): boolean {
  if (!ts.isPropertyAccessExpression(node.expression)) return false;
  if (node.expression.name.text !== 'registerCommand') return false;

  const object = node.expression.expression;
  if (ts.isIdentifier(object) && object.text === 'CustomCommandRegistry') {
    return true;
  }

  if (ts.isPropertyAccessExpression(object) && ts.isIdentifier(object.name)) {
    return object.name.text === 'CustomCommandRegistry';
  }

  return false;
}

function parseRegisterCall(
  call: ts.CallExpression,
  source: ts.SourceFile,
  variables: Map<string, ts.Expression>,
  uri: string,
  language: 'javascript' | 'typescript',
): CommandInfo | undefined {
  const args = call.arguments;
  if (args.length <= 0) return undefined;

  const first = resolveValue(args[0], variables);
  const second = args.length > 1 ? resolveValue(args[1], variables) : undefined;
  const object = getDefinitionObject(first, second);

  if (!object) return undefined;
  const nameRaw = getString(object['name']) ?? getString(first);
  if (!nameRaw) return undefined;

  const name = nameRaw.replace(/^\//, '');
  const description = getString(object['description']) ?? 'Script-defined custom command.';
  const permission = getPermissionLevel(object['permission']);
  const parameters = getParameters(name, object);
  const line = ts.getLineAndCharacterOfPosition(source, call.getStart(source)).line + 1;

  return {
    name,
    documentation: description,
    permission_level: permission,
    parameters,
    source: {
      uri,
      line,
      language,
    },
  };
}

function getDefinitionObject(first: ResolvedValue, second: ResolvedValue): ResolvedObject | undefined {
  if (isObject(first)) return first;
  if (isObject(second)) return second;

  return undefined;
}

function getParameters(commandName: string, object: ResolvedObject): ParameterInfo[] {
  const out: ParameterInfo[] = [{ text: commandName, type: ParameterType.keyword, required: true }];
  const mandatory = getArray(object['mandatoryParameters']);
  const optional = getArray(object['optionalParameters']);
  const mixed = getArray(object['parameters']);

  addParameterArray(out, mandatory, true);
  addParameterArray(out, optional, false);
  addParameterArray(out, mixed, undefined);

  return out;
}

function addParameterArray(receiver: ParameterInfo[], input: ResolvedValue[] | undefined, required?: boolean): void {
  if (!input) return;

  for (let i = 0; i < input.length; i++) {
    const item = input[i];
    if (!isObject(item)) continue;

    const name = getString(item['name']) ?? getString(item['id']) ?? `parameter_${i + 1}`;
    const typeValue = getString(item['type']);
    const optional = item['optional'] === true;
    const parameterRequired = typeof required === 'boolean' ? required : !optional;
    const type = toParameterType(typeValue);
    const parameter: ParameterInfo = { text: name, type, required: parameterRequired };

    const acceptedValues = getStringArray(item['enum']) ?? getStringArray(item['acceptedValues']) ?? getStringArray(item['values']);
    if (acceptedValues && acceptedValues.length > 0) {
      parameter.options = { acceptedValues };
      if (type === ParameterType.unknown) {
        parameter.type = ParameterType.keyword;
      }
    }

    receiver.push(parameter);
  }
}

function toParameterType(type: string | undefined): ParameterType {
  if (!type) return ParameterType.unknown;

  switch (type.toLowerCase()) {
    case 'bool':
    case 'boolean':
      return ParameterType.boolean;
    case 'int':
    case 'integer':
    case 'long':
      return ParameterType.integer;
    case 'float':
    case 'number':
    case 'double':
      return ParameterType.float;
    case 'coordinate':
    case 'coordinates':
    case 'position':
    case 'vector3':
    case 'location':
      return ParameterType.coordinate;
    case 'target':
    case 'entity':
    case 'selector':
    case 'entityselector':
    case 'playerselector':
      return ParameterType.selector;
    case 'message':
      return ParameterType.message;
    case 'string':
    case 'text':
      return ParameterType.string;
    case 'json':
      return ParameterType.jsonRawText;
    default:
      return ParameterType.unknown;
  }
}

function getPermissionLevel(value: ResolvedValue): number {
  if (typeof value === 'number') return value;

  const text = getString(value);
  if (!text) return 0;

  switch (text.toLowerCase()) {
    case 'any':
      return 0;
    case 'host':
    case 'gamedirectors':
      return 1;
    case 'admin':
      return 2;
  }

  return 0;
}

function resolveValue(value: ts.Expression, variables: Map<string, ts.Expression>, depth: number = 0): ResolvedValue {
  if (depth > 20) return undefined;

  if (ts.isParenthesizedExpression(value)) {
    return resolveValue(value.expression, variables, depth + 1);
  }

  if (ts.isAsExpression(value) || ts.isTypeAssertionExpression(value)) {
    return resolveValue(value.expression, variables, depth + 1);
  }

  if (ts.isIdentifier(value)) {
    const resolved = variables.get(value.text);
    if (resolved) return resolveValue(resolved, variables, depth + 1);

    return value.text;
  }

  if (ts.isPropertyAccessExpression(value)) {
    return value.name.text;
  }

  if (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) {
    return value.text;
  }

  if (ts.isNumericLiteral(value)) {
    return Number(value.text);
  }

  if (value.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (value.kind === ts.SyntaxKind.FalseKeyword) return false;

  if (ts.isArrayLiteralExpression(value)) {
    return value.elements.map((element) => resolveValue(element, variables, depth + 1));
  }

  if (ts.isObjectLiteralExpression(value)) {
    const out: ResolvedObject = {};

    for (let i = 0; i < value.properties.length; i++) {
      const property = value.properties[i];

      if (ts.isPropertyAssignment(property)) {
        const key = getPropertyName(property.name);
        if (!key) continue;

        out[key] = resolveValue(property.initializer, variables, depth + 1);
      } else if (ts.isShorthandPropertyAssignment(property)) {
        const name = property.name.text;
        out[name] = resolveValue(property.name, variables, depth + 1);
      }
    }

    return out;
  }

  return undefined;
}

function getPropertyName(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name)) return name.text;
  if (ts.isStringLiteral(name)) return name.text;
  if (ts.isNumericLiteral(name)) return name.text;

  return undefined;
}

function isObject(value: ResolvedValue): value is ResolvedObject {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function getArray(value: ResolvedValue): ResolvedValue[] | undefined {
  if (Array.isArray(value)) return value;

  return undefined;
}

function getString(value: ResolvedValue): string | undefined {
  if (typeof value === 'string') return value;

  return undefined;
}

function getStringArray(value: ResolvedValue): string[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const out: string[] = [];
  for (let i = 0; i < value.length; i++) {
    const item = value[i];
    if (typeof item === 'string') out.push(item);
  }

  return out;
}
