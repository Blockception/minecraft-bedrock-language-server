import { OffsetWord } from '@blockception/packages-shared';
import { TextDocument } from 'bc-minecraft-bedrock-project';
import {
  ExpressionNode,
  FunctionCallNode,
  MolangData,
  MolangFunction,
  MolangParameter,
  MolangSet,
  MolangSyntaxError,
  NodeType,
} from 'bc-minecraft-molang';
import { DiagnosticsBuilder, DiagnosticSeverity, DocumentDiagnosticsBuilder } from '../../types';
import { Json } from '../json';
import { createDefaultOptimizationRegistry, traverseAndOptimize } from './optimizations/registry';

export function diagnose_molang_syntax_current_document(
  diagnoser: DocumentDiagnosticsBuilder,
  obj?: string | Record<string, any>,
): MolangSet {
  return diagnose_molang_syntax_document(diagnoser.document, diagnoser, obj);
}

export function diagnose_molang_syntax_document(
  doc: TextDocument,
  diagnoser: DiagnosticsBuilder,
  obj?: string | Record<string, any>,
): MolangSet {
  const objSet = obj ?? Json.LoadReport(DocumentDiagnosticsBuilder.wrap(diagnoser, doc));

  return diagnose_molang_set(objSet, diagnoser, doc.getText());
}

export function diagnose_molang_syntax_text(
  text: string,
  diagnoser: DiagnosticsBuilder,
  obj?: string | Record<string, any>,
): MolangSet {
  const objSet = obj ?? JSON.parse(text);

  return diagnose_molang_set(objSet, diagnoser, text);
}

export function diagnose_molang_syntax_line(line: string, diagnoser: DiagnosticsBuilder): MolangSet {
  return diagnose_molang_set(line, diagnoser, line);
}

function diagnose_molang_set(
  obj: string | Record<string, any> | undefined,
  diagnoser: DiagnosticsBuilder,
  text: string,
): MolangSet {
  const set = new MolangSet();
  if (obj === undefined) return set;

  try {
    set.harvest(obj, text);
  } catch (err: any) {
    if (err instanceof MolangSyntaxError) {
      diagnoser.add(err.position, err.message, DiagnosticSeverity.error, `molang.${err.code}`);
    } else {
      diagnoser.add(
        0,
        `unknown error was thrown during parsing of molang, please submit an github issue.\n${JSON.stringify(
          {
            message: err.message,
            stack: err.stack,
          },
          null,
          2,
        )}`,
        DiagnosticSeverity.error,
        'molang.error.unknown',
      );
    }
  }

  return diagnose_molang_syntax_set(set, diagnoser);
}

export function diagnose_molang_syntax_set(set: MolangSet, diagnoser: DiagnosticsBuilder) {
  // Check functions parameters
  set.functions.forEach((fn) => diagnose_molang_function(fn, diagnoser));

  // Check syntax
  for (const exps of set.cache.expressions()) {
    exps.forEach((exp) => {
      diagnose_molang_syntax(exp, diagnoser);
      diagnose_molang_syntax_optimizations(exp, diagnoser);
    });
  }

  return set;
}

export function diagnose_molang_syntax(expression: ExpressionNode, diagnoser: DiagnosticsBuilder) {
  const objs: ExpressionNode[] = [expression];

  for (let i = 0; i < objs.length; i++) {
    const n = objs[i];
    switch (n.type) {
      case NodeType.ResourceReference:
      case NodeType.Variable:
        if (n.scope !== 'this' && (n.names as string[]).length === 0)
          diagnoser.add(
            n.position,
            `expected something after '${n.scope}.' but found nothing`,
            DiagnosticSeverity.error,
            'molang.identifier.invalid',
          );

        switch (n.scope.toLowerCase()) {
          case 'array':
          case 'this':
          case 'geometry':
          case 'material':
          case 'texture':
          case 'v':
          case 'variable':
          case 'c':
          case 'context':
          case 't':
          case 'temp':
            break;
          default:
            diagnoser.add(
              n.position,
              `unknown variable/resource starting identifier: '${n.scope}' for '${n.scope}.${n.names.join('.')}'`,
              DiagnosticSeverity.error,
              'molang.identifier.scope',
            );
        }

        break;
      case NodeType.ArrayAccess:
        objs.push(n.array, n.index);
        break;
      case NodeType.Assignment:
        // TODO left should be a resource / variable
        objs.push(n.left, n.right);
        break;
      case NodeType.BinaryOperation:
        objs.push(n.left, n.right);
        // TODO check operator
        break;
      case NodeType.Conditional:
        objs.push(n.condition, n.falseExpression, n.trueExpression);
        break;
      case NodeType.FunctionCall:
        objs.push(...n.arguments);
        break;
      case NodeType.StringLiteral:
      case NodeType.Literal:
        break;
      case NodeType.NullishCoalescing:
        objs.push(n.left, n.right);
        break;
      case NodeType.StatementSequence:
        objs.push(...n.statements);
        break;
      case NodeType.UnaryOperation:
        objs.push(n.operand);
        // TODO check operator
        break;

      case NodeType.Marker:
      default:
        diagnoser.add(
          n.position,
          `unknown piece of molang syntax: ${JSON.stringify(n)}`,
          DiagnosticSeverity.error,
          'molang.diagnoser.syntax',
        );
    }
  }
}

// Singleton registry instance for optimization rules
let optimizationRegistry: ReturnType<typeof createDefaultOptimizationRegistry> | undefined;

/**
 * Gets or creates the optimization registry
 */
function getOptimizationRegistry() {
  if (!optimizationRegistry) {
    optimizationRegistry = createDefaultOptimizationRegistry();
  }
  return optimizationRegistry;
}

export function diagnose_molang_syntax_optimizations(expression: ExpressionNode, diagnoser: DiagnosticsBuilder) {
  const registry = getOptimizationRegistry();
  traverseAndOptimize(expression, registry, diagnoser);
}

export function diagnose_molang_function(fn: FunctionCallNode, diagnoser: DiagnosticsBuilder) {
  const id = fn.names.join('.');
  let fnData: MolangFunction | undefined;
  switch (fn.scope) {
    case 'math':
      fnData = MolangData.General.getMath(id);
      break;
    case 'q':
    case 'query':
      fnData = MolangData.General.getQuery(id);
      break;
    default:
      diagnoser.add(
        OffsetWord.create(ExpressionNode.getIdentifier(fn), fn.position),
        `Unknown function molang scope: ${fn.scope}, expected math or query`,
        DiagnosticSeverity.error,
        `molang.function.scope`,
      );
      return;
  }

  if (fnData === undefined) {
    diagnoser.add(
      OffsetWord.create(ExpressionNode.getIdentifier(fn), fn.position),
      `Unknown function ${fn.scope}.${id}, doesn't seem to exist`,
      DiagnosticSeverity.error,
      `molang.function.${fn.scope}.${id}`,
    );
    return;
  }

  if (fnData.deprecated) {
    let msg = fnData.deprecated;
    if (msg.startsWith('query') || msg.startsWith('math')) {
      msg = `\n\treplace it with: ${fnData.deprecated}`;
    }

    diagnoser.add(
      OffsetWord.create(ExpressionNode.getIdentifier(fn), fn.position),
      `molang function has been deprecated: ${fnData.deprecated}`,
      DiagnosticSeverity.error,
      'molang.function.deprecated',
    );
  }

  if (fnData.parameters) {
    // Check if the last parameter is repeatable
    const lastParam = fnData.parameters[fnData.parameters.length - 1];
    const hasRepeatableParam = lastParam?.repeatable === true;
    const minRequiredParams = fnData.parameters.length;

    // Validate parameter count
    if (hasRepeatableParam) {
      // With repeatable parameter, we need at least the minimum parameters
      if (fn.arguments.length < minRequiredParams) {
        diagnoser.add(
          OffsetWord.create(ExpressionNode.getIdentifier(fn), fn.position),
          `wrong amount of arguments, expected at least ${minRequiredParams} but got ${fn.arguments.length}`,
          DiagnosticSeverity.error,
          'molang.function.arguments',
        );
      }
    } else {
      // Without repeatable parameter, we need exact match
      if (fnData.parameters.length != fn.arguments.length) {
        diagnoser.add(
          OffsetWord.create(ExpressionNode.getIdentifier(fn), fn.position),
          `wrong amount of arguments, expected ${fnData.parameters.length} but got ${fn.arguments.length}`,
          DiagnosticSeverity.error,
          'molang.function.arguments',
        );
      }
    }

    // Validate parameter types
    for (let i = 0; i < fn.arguments.length; i++) {
      const arg = fn.arguments[i];
      let expectedParam: MolangParameter | undefined;

      // Determine which parameter definition to use
      if (i < fnData.parameters.length) {
        // Use the parameter at this index
        expectedParam = fnData.parameters[i];
      } else if (hasRepeatableParam) {
        // Use the last (repeatable) parameter for additional arguments
        expectedParam = lastParam;
      }

      // Validate type if specified
      if (expectedParam?.type) {
        const actualType = getArgumentType(arg);
        if (actualType && actualType !== expectedParam.type) {
          diagnoser.add(
            OffsetWord.create(ExpressionNode.getIdentifier(fn), fn.position),
            `wrong argument type at position ${i + 1}, expected ${expectedParam.type} but got ${actualType}`,
            DiagnosticSeverity.error,
            'molang.function.arguments.type',
          );
        }
      }
    }
  }
}

/**
 * Helper function to determine the type of an argument node
 */
function getArgumentType(arg: ExpressionNode): 'string' | 'float' | 'boolean' | undefined {
  switch (arg.type) {
    case NodeType.StringLiteral:
      return 'string';
    case NodeType.Literal:
      // Check if it's a boolean literal (true/false) or numeric
      const value = (arg as any).value?.toLowerCase();
      if (value === 'true' || value === 'false') {
        return 'boolean';
      }
      return 'float';
    default:
      // For complex expressions, we can't determine the type statically
      return undefined;
  }
}
