export type RuleExecutionOutcome = {
  severity: ValidationSeverity;
  value?: unknown;
};

export type RuleExecutionResult = {
  severity: ValidationSeverity;
  value: unknown;
};

export type ValidationOptions = {
  treatWarningsAsErrors?: boolean;
  throwOnFailure?: boolean;
};

export type ValidationResult = {
  isValid: boolean;
  rules: Record<ValidationRuleKey, RuleExecutionResult>;
};

export type ValidationRule = (value: unknown) => boolean | ValidationSeverity | RuleExecutionOutcome;

export type ValidationRuleKey = string;

export type ValidationRuleSet = Record<ValidationRuleKey, unknown>;

// https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.logging.loglevel?view=net-9.0-pp
export type ValidationSeverity = "trace" | "debug" | "information" | "warning" | "error" | "critical";

class Validator {
  private readonly rules: Map<ValidationRuleKey, ValidationRule> = new Map();
  private readonly treatWarningsAsErrors: boolean;

  constructor(treatWarningsAsErrors?: boolean) {
    this.treatWarningsAsErrors = treatWarningsAsErrors ?? false;
  }

  clearRules(): void {
    this.rules.clear();
  }
  getRule(key: ValidationRuleKey): ValidationRule | undefined {
    return this.rules.get(key);
  }
  hasRule(key: ValidationRuleKey): boolean {
    return this.rules.has(key);
  }
  listRules(): [ValidationRuleKey, ValidationRule][] {
    return [...this.rules.entries()];
  }
  removeRule(key: ValidationRuleKey): boolean {
    return this.rules.delete(key);
  }
  setRule(key: ValidationRuleKey, rule: ValidationRule): void {
    this.rules.set(key, rule);
  }

  validate(value: unknown, rules: ValidationRuleSet, options?: ValidationOptions): ValidationResult {
    options = options ?? {};
    const treatWarningsAsErrors: boolean = options.treatWarningsAsErrors ?? this.treatWarningsAsErrors;

    let errors: number = 0;
    const results: Record<ValidationRuleKey, RuleExecutionResult> = {};

    const missingRules: string[] = [];
    for (const rule in rules) {
      const validationRule: ValidationRule | undefined = this.rules.get(rule);
      if (!validationRule) {
        missingRules.push(rule);
        continue;
      }

      const result: RuleExecutionResult = {
        severity: "error",
        value,
      };
      const outcome: boolean | ValidationSeverity | RuleExecutionOutcome = validationRule(value);
      switch (typeof outcome) {
        case "boolean":
          result.severity = Boolean(outcome) ? "information" : "error";
          break;
        case "string":
          result.severity = outcome;
          break;
        default:
          result.severity = outcome.severity;
          if (typeof outcome.value !== "undefined") {
            result.value = outcome.value;
          }
          break;
      }
      switch (result.severity) {
        case "warning":
          if (treatWarningsAsErrors) {
            errors++;
          }
          break;
        case "error":
        case "critical":
          errors++;
          break;
      }
      results[rule] = result;
    }

    const result: ValidationResult = {
      isValid: errors === 0,
      rules: results,
    };
    if (!result.isValid && options.throwOnFailure) {
      throw result;
    }
    return result;
  }
}
export default Validator;
