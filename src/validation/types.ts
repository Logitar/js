import { MessageFormatter } from "./format";

export type RuleExecutionOutcome = {
  severity: ValidationSeverity;
  key?: string;
  message?: string;
  placeholders?: Record<string, unknown>;
  name?: string;
  value?: unknown;
  custom?: unknown;
};

export type RuleExecutionResult = {
  key: string;
  severity: ValidationSeverity;
  message?: string;
  placeholders: Record<string, unknown>;
  name: string;
  value: unknown;
  custom?: unknown;
};

export type RuleConfiguration = {
  rule: ValidationRule;
  options: RuleOptions;
};

export type RuleOptions = {
  key?: string;
  message?: string;
  placeholders?: Record<string, unknown>;
};

export type ValidationContext = Record<string, unknown>;

export type ValidationOptions = {
  context?: ValidationContext;
  messageFormatter?: MessageFormatter;
  placeholders?: Record<string, unknown>;
  treatWarningsAsErrors?: boolean;
  throwOnFailure?: boolean;
};

export type ValidationResult = {
  isValid: boolean;
  rules: Record<ValidationRuleKey, RuleExecutionResult>;
  context: ValidationContext;
};

export type ValidationRule = (value: unknown, args?: unknown, context?: ValidationContext) => boolean | ValidationSeverity | RuleExecutionOutcome;

export type ValidationRuleKey = string;

export type ValidationRuleSet = Record<ValidationRuleKey, unknown>;

// https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.logging.loglevel?view=net-9.0-pp
export type ValidationSeverity = "trace" | "debug" | "information" | "warning" | "error" | "critical";

export type ValidatorOptions = {
  messageFormatter?: MessageFormatter;
  treatWarningsAsErrors?: boolean;
};
