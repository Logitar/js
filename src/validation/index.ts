import DefaultMessageFormatter, { MessageFormatter } from "./format";
import { isNullOrWhiteSpace } from "../helpers/stringUtils";
import type {
  RuleConfiguration,
  RuleExecutionOutcome,
  RuleExecutionResult,
  RuleOptions,
  ValidationOptions,
  ValidationResult,
  ValidationRule,
  ValidationRuleKey,
  ValidationRuleSet,
  ValidationSeverity,
  ValidatorOptions,
} from "./types";

function apply(result: RuleExecutionResult, outcome: RuleExecutionOutcome, options: RuleOptions): void {
  // severity
  result.severity = outcome.severity;
  // key
  if (!isNullOrWhiteSpace(options.key)) {
    result.key = options.key;
  } else if (!isNullOrWhiteSpace(outcome.key)) {
    result.key = outcome.key;
  }
  // message
  if (!isNullOrWhiteSpace(options.message)) {
    result.message = options.message;
  } else if (!isNullOrWhiteSpace(options.message)) {
    result.message = outcome.message;
  }
  // name
  if (!isNullOrWhiteSpace(outcome.name)) {
    result.name = outcome.name;
  }
  // value
  if (typeof outcome.value !== "undefined") {
    result.value = outcome.value;
  }
}

function fillPlaceholders(result: RuleExecutionResult, outcome?: RuleExecutionOutcome, rule?: RuleOptions, validation?: ValidationOptions): void {
  result.placeholders.key = result.key;
  result.placeholders.name = result.name;
  result.placeholders.value = result.value;
  result.placeholders.severity = result.severity;

  if (outcome && outcome.placeholders) {
    result.placeholders = { ...result.placeholders, ...outcome.placeholders };
  }
  if (rule && rule.placeholders) {
    result.placeholders = { ...result.placeholders, ...rule.placeholders };
  }
  if (validation && validation.placeholders) {
    result.placeholders = { ...result.placeholders, ...validation.placeholders };
  }
}

class Validator {
  private readonly messageFormatter: MessageFormatter;
  private readonly rules: Map<ValidationRuleKey, RuleConfiguration> = new Map();
  private readonly treatWarningsAsErrors: boolean;

  constructor(options?: ValidatorOptions) {
    options ??= options;
    this.messageFormatter = options.messageFormatter ?? new DefaultMessageFormatter();
    this.treatWarningsAsErrors = options.treatWarningsAsErrors ?? false;
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
        placeholders: { [key]: args },
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
          apply(result, outcome, configuration.options);
          break;
      }

      fillPlaceholders(result, typeof outcome === "object" ? outcome : undefined, configuration.options, options);

      this.formatMessage(result, options);

      if (this.isError(result.severity, options)) {
        errors++;
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
  private formatMessage(result: RuleExecutionResult, options?: ValidationOptions): void {
    options ??= {};
    const messageFormatter: MessageFormatter = options.messageFormatter ?? this.messageFormatter;
    result.message = messageFormatter.format(result.message, result.placeholders);
  }
  private isError(severity: ValidationSeverity, options?: ValidationOptions): boolean {
    options ??= {};
    switch (severity) {
      case "error":
      case "critical":
        return true;
      case "warning":
        if (options.treatWarningsAsErrors ?? this.treatWarningsAsErrors) {
          return true;
        }
        break;
    }
    return false;
  }
}
export default Validator;
