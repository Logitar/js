import { isNullOrWhiteSpace } from "../helpers/stringUtils";

export type RuleExecutionOutcome = {
  severity: ValidationSeverity;
  key?: string;
  name?: string;
  value?: unknown;
};

export type RuleExecutionResult = {
  key: string;
  severity: ValidationSeverity;
  name: string;
  value: unknown;
};

export type RuleConfiguration = {
  rule: ValidationRule;
  options: RuleOptions;
};

export type RuleOptions = {
  key?: string;
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
  private readonly rules: Map<ValidationRuleKey, RuleConfiguration> = new Map();
  private readonly treatWarningsAsErrors: boolean;

  constructor(treatWarningsAsErrors?: boolean) {
    this.treatWarningsAsErrors = treatWarningsAsErrors ?? false;
  }

  clearRules(): void {
    this.rules.clear();
  }
  getRule(key: ValidationRuleKey): RuleConfiguration | undefined {
    return this.rules.get(key);
  }
  hasRule(key: ValidationRuleKey): boolean {
    return this.rules.has(key);
  }
  listRules(): [ValidationRuleKey, RuleConfiguration][] {
    return [...this.rules.entries()];
  }
  removeRule(key: ValidationRuleKey): boolean {
    return this.rules.delete(key);
  }
  setRule(key: ValidationRuleKey, rule: ValidationRule, options?: RuleOptions): void {
    options ??= options;
    const configuration: RuleConfiguration = { rule, options };
    this.rules.set(key, configuration);
  }

  validate(name: string, value: unknown, rules: ValidationRuleSet, options?: ValidationOptions): ValidationResult {
    options ??= {};
    const treatWarningsAsErrors: boolean = options.treatWarningsAsErrors ?? this.treatWarningsAsErrors;

    let errors: number = 0;
    const results: Record<ValidationRuleKey, RuleExecutionResult> = {};

    const missingRules: string[] = [];
    for (const key in rules) {
      const configuration: RuleConfiguration | undefined = this.rules.get(key);
      if (!configuration) {
        missingRules.push(key);
        continue;
      }

      const args: unknown = rules[key];
      if (!args) {
        continue;
      }

      const result: RuleExecutionResult = {
        key,
        severity: "error",
        name,
        value,
      };
      const outcome: boolean | ValidationSeverity | RuleExecutionOutcome = configuration.rule(value);
      switch (typeof outcome) {
        case "boolean":
          result.severity = Boolean(outcome) ? "information" : "error";
          break;
        case "string":
          result.severity = outcome;
          break;
        default:
          result.severity = outcome.severity;
          if (!isNullOrWhiteSpace(configuration.options.key)) {
            result.key = configuration.options.key;
          } else if (!isNullOrWhiteSpace(outcome.key)) {
            result.key = outcome.key;
          }
          if (!isNullOrWhiteSpace(outcome.name)) {
            result.name = outcome.name;
          }
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
      results[key] = result;
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
