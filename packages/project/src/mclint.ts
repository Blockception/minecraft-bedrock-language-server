import * as fs from 'fs';

/** Severity level for a lint rule */
export type MCLintSeverity = 'off' | 'warn' | 'error' | 0 | 1 | 2;

/** A rule value is either a severity or an array of [severity, ...options] */
export type MCLintRuleValue = MCLintSeverity | [MCLintSeverity, ...unknown[]];

/** Rule definitions supported by MCLint */
export interface MCLintRules {
  /**
   * Validate that identity strings follow the `namespace:name` format.
   * When enabled, identifiers that do not contain a colon separator are flagged.
   */
  'identity.format'?: MCLintRuleValue;
  /**
   * Allow only listed namespaces.
   * Options: `[severity, [allowedNamespace1, allowedNamespace2, ...]]`
   */
  'namespace.allow'?: MCLintRuleValue;
  /**
   * Deny listed namespaces.
   * Options: `[severity, [deniedNamespace1, deniedNamespace2, ...]]`
   */
  'namespace.deny'?: MCLintRuleValue;
  /**
   * Require that identifiers for items, entities, blocks, and similar types always include a namespace.
   * When enabled, identifiers that do not contain a colon separator (e.g. `zombie` instead of `minecraft:zombie`)
   * are flagged.
   */
  'namespace.required'?: MCLintRuleValue;
  /**
   * Validate animation IDs against a regular expression pattern.
   * Options: `[severity, "regexPattern"]`
   */
  'animation.naming'?: MCLintRuleValue;
  /**
   * Validate animation controller state IDs against a regular expression pattern.
   * Options: `[severity, "regexPattern"]`
   */
  'animation-state.naming'?: MCLintRuleValue;
  /**
   * Validate bone names against a regular expression pattern.
   * Options: `[severity, "regexPattern"]`
   */
  'bone.naming'?: MCLintRuleValue;
  /**
   * Validate molang variable names against a regular expression pattern.
   * Options: `[severity, "regexPattern"]`
   */
  'molang.variable.naming'?: MCLintRuleValue;
  /** Additional user-defined rules */
  [key: string]: MCLintRuleValue | undefined;
}

/** The MCLint configuration object, parsed from a `.mclint` file */
export interface MCLint {
  /** The lint rules configuration */
  rules: MCLintRules;
}

/** Namespace providing utilities for working with MCLint configuration */
export namespace MCLint {
  /** The default filename for MCLint configuration */
  export const filename = '.mclint';

  /** Creates an empty MCLint configuration */
  export function createEmpty(): MCLint {
    return { rules: {} };
  }

  /** Checks whether the given value implements the MCLint interface */
  export function is(value: unknown): value is MCLint {
    return (
      value !== null &&
      typeof value === 'object' &&
      'rules' in (value as object) &&
      (value as MCLint).rules !== null &&
      typeof (value as MCLint).rules === 'object'
    );
  }

  /**
   * Parses a JSON string as MCLint configuration.
   * Returns an empty configuration if the input is invalid.
   */
  export function parse(content: string): MCLint {
    try {
      const parsed = JSON.parse(content) as unknown;
      if (is(parsed)) return parsed;
    } catch {
      // Invalid JSON — fall through to empty config
    }
    return createEmpty();
  }

  /** Loads the MCLint configuration from a file synchronously */
  export function loadSync(filepath: string): MCLint {
    if (fs.existsSync(filepath)) {
      try {
        return parse(fs.readFileSync(filepath).toString());
      } catch {
        // Ignore file-read errors
      }
    }
    return createEmpty();
  }

  /** Loads the MCLint configuration from a file asynchronously */
  export async function load(filepath: string): Promise<MCLint> {
    return fs.promises
      .readFile(filepath)
      .then((buf) => parse(buf.toString()))
      .catch(() => createEmpty());
  }

  /**
   * Resolves the effective severity string of a rule.
   * Returns `'off'` when the rule is undefined or explicitly disabled.
   */
  export function getSeverity(rule: MCLintRuleValue | undefined): 'off' | 'warn' | 'error' {
    if (rule === undefined) return 'off';
    const raw = Array.isArray(rule) ? rule[0] : rule;
    switch (raw) {
      case 0:
      case 'off':
        return 'off';
      case 1:
      case 'warn':
        return 'warn';
      case 2:
      case 'error':
        return 'error';
      default:
        return 'off';
    }
  }

  /**
   * Gets the options array for a rule (all elements after the severity).
   * Returns an empty array when the rule has no options or is a plain severity value.
   */
  export function getOptions(rule: MCLintRuleValue | undefined): unknown[] {
    if (!Array.isArray(rule) || rule.length <= 1) return [];
    return rule.slice(1);
  }

  /** Returns `true` when the rule is enabled (not `'off'`) */
  export function isEnabled(rule: MCLintRuleValue | undefined): boolean {
    return getSeverity(rule) !== 'off';
  }
}
