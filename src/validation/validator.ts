/**
 * The validation severity levels.
 * Reference: https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.logging.loglevel
 */
export type ValidationSeverity = "trace" | "debug" | "information" | "warning" | "error" | "critical";

/**
 * Returns a numeric value representing the severity level.
 * @param severity The severity level.
 * @returns A numeric value representing the severity level.
 */
function getSeverityLevel(severity: ValidationSeverity): number {
  switch (severity) {
    case "debug":
      return 1;
    case "information":
      return 2;
    case "warning":
      return 3;
    case "error":
      return 4;
    case "critical":
      return 5;
    default:
      return 0;
  }
}

/**
 * The result of a validation rule execution.
 * Reference: https://github.com/FluentValidation/FluentValidation/blob/main/src/FluentValidation/Results/ValidationFailure.cs
 */
export type RuleExecutionResult = {
  /**
   * The unique key (or name) of the executed rule.
   */
  rule: string;
  /**
   * The severity of the execution result.
   */
  severity: ValidationSeverity;
  /**
   * The informative (or error) message of the execution result.
   */
  message?: string;
  /**
   * The placeholders of the execution result message.
   */
  placeholders: Record<string, unknown>;
  /**
   * The name of the validated field or property.
   */
  name: string;
  /**
   * The value of the validated field or property.
   */
  value: unknown;
  /**
   * Custom state shared between the validator, validation rules and the validation context.
   */
  custom?: unknown;
};

export type RuleExecutionOutcome = {
  /**
   * The unique key (or name) of the executed rule. Leave undefined to use the registered rule key or provide a value to override the registered rule key.
   */
  rule?: string;
  /**
   * The severity of the execution result.
   */
  severity: ValidationSeverity;
  /**
   * The informative (or error) message of the execution result. Leave undefined to use the registered rule message or provide a value to override the registered rule message.
   */
  message?: string;
  /**
   * The placeholders of the execution result message. Provide a value to add message placeholders.
   */
  placeholders?: Record<string, unknown>;
  /**
   * The name of the validated field or property. Leave undefined to use the input field/property name or provide a value to override the input field/property name.
   */
  name?: string;
  /**
   * The value of the validated field or property. Leave undefined to use the input field/property value or provide a value to override the input field/property value.
   */
  value?: unknown;
  /**
   * Custom state shared between the validator, validation rules and the validation context. Provide a value to add custom state to existing state in the validation context.
   */
  custom?: unknown;
};

/**
 * The options for a validation operation.
 */
export type ValidationOptions = {
  /**
   * The severity level producing a failure. Defaults to "error". May only be "warning", "error" or "critical".
   */
  failureSeverity?: ValidationSeverity;
  /**
   * The message placeholders. Provide a value to add new message placeholders or override existing message placeholders.
   */
  placeholders?: Record<string, unknown>;
  /**
   * The custom state of the validation operation.
   */
  custom?: unknown;
  /**
   * A value indicating whether to throw an error when validation fails.
   */
  throwOnFailure?: boolean;
};

/**
 * The result of a validation operation.
 * Reference: https://github.com/FluentValidation/FluentValidation/blob/main/src/FluentValidation/Results/ValidationResult.cs
 */
export type ValidationResult = {
  /**
   * A value indicating whether the validation operation was successful.
   */
  isValid: boolean;
  /**
   * The result of the executed validation rules.
   */
  rules: RuleExecutionResult[];
};

/**
 * The signature of a validation rule.
 */
export type ValidationRule = (value: unknown, args?: unknown) => boolean | ValidationSeverity | RuleExecutionOutcome;

/** Defines a validation class. You can register validation rules to the validator and perform validation operations. */
class Validator {
  /**
   * The default severity level producing a failure. Defaults to "error". May only be "warning", "error" or "critical".
   */
  private readonly failureSeverity: ValidationSeverity;
  /**
   * The registered validation rules.
   */
  private readonly rules: Map<string, ValidationRule> = new Map();

  /**
   * Initializes a new instance of the `Validator` class.
   * @param failureSeverity The default severity level producing a failure. Defaults to "error". May only be "warning", "error" or "critical".
   */
  constructor(failureSeverity: ValidationSeverity = "error") {
    if (failureSeverity !== "warning" && failureSeverity !== "error" && failureSeverity !== "critical") {
      throw new Error(`The failure severity '${failureSeverity}' must be one of the following: 'warning', 'error' or 'critical'.`);
    }
    this.failureSeverity = failureSeverity;
  }

  /**
   * Clears all registered validation rules.
   */
  clearRules(): void {
    this.rules.clear();
  }

  /**
   * Checks if a validation rule is registered.
   * @param key The key of the validation rule.
   * @returns A value indicating whether the validation rule is registered.
   */
  hasRule(key: string): boolean {
    return this.rules.has(key);
  }

  /**
   * Lists all registered validation rules.
   * @returns An array of all registered validation rule keys.
   */
  listRules(): string[] {
    return [...this.rules.keys()];
  }

  /**
   * Removes a validation rule.
   * @param key The key of the validation rule.
   * @returns A value indicating whether the validation rule was removed.
   */
  removeRule(key: string): boolean {
    return this.rules.delete(key);
  }

  /**
   * Registers a validation rule.
   * @param key The key of the validation rule.
   * @param rule The validation rule to register.
   */
  setRule(key: string, rule: ValidationRule): void {
    this.rules.set(key, rule);
  }

  /**
   * Validates a value against a set of validation rules.
   * @param name The name of the validated field or property.
   * @param value The value of the validated field or property.
   * @param rules The validation rules to apply.
   * @param options The options for the validation operation.
   */
  validate(name: string, value: unknown, rules: object, options?: ValidationOptions): ValidationResult {
    options = options ?? {};
    const failureSeverity: ValidationSeverity = options.failureSeverity ?? this.failureSeverity;
    // TODO(fpion): options.placeholders
    // TODO(fpion): options.custom

    const executions: RuleExecutionResult[] = [];
    const missingRules: string[] = [];
    for (const rule in rules) {
      const validationRule: ValidationRule | undefined = this.rules.get(rule);
      if (!validationRule) {
        missingRules.push(rule);
        continue;
      }

      const args: unknown = rules[rule];
      if (!args) {
        continue;
      }

      const outcome: boolean | ValidationSeverity | RuleExecutionOutcome = validationRule(value, args);
      const execution: RuleExecutionResult = {
        rule, // TODO(fpion): override from RuleExecutionOutcome and registered rule key override
        severity: undefined, // TODO(fpion): from outcome
        message: undefined, // TODO(fpion): override from RuleExecutionOutcome and registered rule message, format using placeholders
        placeholders: {}, // TODO(fpion): implement
        name: name, // TODO(fpion): override from RuleExecutionOutcome
        value: value, // TODO(fpion): override from RuleExecutionOutcome
        custom: undefined, // TODO(fpion): implement
      };
      executions.push(execution);
    }
    if (missingRules.length > 0) {
      throw new Error(`Missing validation rules for keys: ${missingRules.join(", ")}`);
    }

    const failureLevel: number = getSeverityLevel(failureSeverity);
    const result: ValidationResult = {
      isValid: executions.every(({ severity }) => getSeverityLevel(severity) < failureLevel),
      rules: executions,
    };
    if (!result.isValid && options.throwOnFailure) {
      throw result;
    }
    return result;
  }
}

export default Validator;
