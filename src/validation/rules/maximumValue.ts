import type { RuleExecutionOutcome, ValidationRule } from "../types";

const maximumValue: ValidationRule = (value: unknown, args: unknown): RuleExecutionOutcome => {
  try {
    if (value > args) {
      return { severity: "error", message: "{{name}} must be at most {{maximumValue}}." };
    }
  } catch (_) {
    return { severity: "warning", message: `Could not compare {{name}} ({{value}} | ${typeof value}) with args ({{maximumValue}} | ${typeof args}).` };
  }
  return { severity: "information" };
};

export default maximumValue;
