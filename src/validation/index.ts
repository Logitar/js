export type ValidationRule = (value: unknown) => boolean | ValidationSeverity;

export type ValidationRuleKey = string;

export type ValidationResult = {
  isValid: boolean;
  rules: Record<ValidationRuleKey, ValidationSeverity>;
};

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

  validate(value: unknown, rules: ValidationRuleSet): ValidationResult {
    let errors: number = 0;
    const results: Record<ValidationRuleKey, ValidationSeverity> = {};

    const missingRules: string[] = [];
    for (const rule in rules) {
      const validationRule: ValidationRule | undefined = this.rules.get(rule);
      if (!validationRule) {
        missingRules.push(rule);
        continue;
      }

      const outcome: boolean | ValidationSeverity = validationRule(value);
      switch (outcome) {
        case "trace":
        case "debug":
        case "information":
          results[rule] = outcome;
          break;
        case "warning":
          results[rule] = outcome;
          if (this.treatWarningsAsErrors) {
            errors++;
          }
          break;
        case "error":
        case "critical":
          results[rule] = outcome;
          errors++;
          break;
        case false:
          results[rule] = "error";
          errors++;
          break;
        case true:
          results[rule] = "information";
          break;
        default:
          throw new Error("not_implemented"); // TODO(fpion): implement
      }
    }

    return {
      isValid: errors === 0,
      rules: results,
    };
  }
}
export default Validator;
