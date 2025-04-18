export type ValidationResult = {
  isValid: boolean;
  errors: string[];
};
export type ValidationRule = (value: unknown, args?: unknown) => boolean;

class Validator {
  private readonly rules: Map<string, ValidationRule>;

  constructor() {
    this.rules = new Map();
  }

  clearRules(): void {
    this.rules.clear();
  }
  hasRule(key: string): boolean {
    return this.rules.has(key);
  }
  listRules(): string[] {
    return [...this.rules.keys()];
  }
  removeRule(key: string): void {
    this.rules.delete(key);
  }
  setRule(key: string, rule: ValidationRule): void {
    this.rules.set(key, rule);
  }

  validate(value: unknown, rules: object): ValidationResult {
    const errors: string[] = [];
    const missingKeys: string[] = [];

    for (const key in rules) {
      const isValid: ValidationRule | undefined = this.rules.get(key);
      if (isValid) {
        const args: unknown = rules[key];
        if (args && !isValid(value, args)) {
          errors.push(key);
        }
      } else {
        missingKeys.push(key);
      }
    }

    if (missingKeys.length > 0) {
      throw new Error(`Missing validation rules for keys: ${missingKeys.join(", ")}`);
    }

    return { isValid: errors.length === 0, errors };
  }
}

export default Validator;
