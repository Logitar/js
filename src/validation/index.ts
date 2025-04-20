export type ValidationRule = (value: unknown) => boolean;

export type ValidationRuleKey = string;

export type ValidationResult = {
  isValid: boolean;
  rules: Record<ValidationRuleKey, boolean>;
};

export type ValidationRuleSet = Record<ValidationRuleKey, unknown>;

class Validator {
  private readonly rules: Map<ValidationRuleKey, ValidationRule> = new Map();

  constructor() {}

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
    const results: Record<ValidationRuleKey, boolean> = {};

    const missingRules: string[] = [];
    for (const rule in rules) {
      const validationRule: ValidationRule | undefined = this.rules.get(rule);
      if (!validationRule) {
        missingRules.push(rule);
        continue;
      }

      const outcome: boolean = validationRule(value);
      if (!outcome) {
        errors++;
      }
      results[rule] = outcome;
    }

    return {
      isValid: errors === 0,
      rules: results,
    };
  }
}
export default Validator;
