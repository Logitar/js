import type { RuleExecutionOutcome, ValidationRule } from "../types";

const minimumValue: ValidationRule = (value: unknown, args: unknown): RuleExecutionOutcome => {
  try {
    if (value < args) {
      return { severity: "error", message: "{{name}} must be at least {{minimumValue}}." };
    }
  } catch (_) {
    return { severity: "warning", message: `Could not compare {{name}} ({{value}} | ${typeof value}) with args ({{minimumValue}} | ${typeof args}).` };
  }
  return { severity: "information" };
};

export default minimumValue;
