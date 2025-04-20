import type { RuleExecutionOutcome, ValidationRule } from "../validator";
import { isNullOrWhiteSpace } from "../../helpers/stringUtils";

const required: ValidationRule = (value: unknown): RuleExecutionOutcome => {
  switch (typeof value) {
    case "string":
      if (isNullOrWhiteSpace(value)) {
        return { severity: "error", message: "{{field}} cannot be empty." };
      }
      break;
    case "number":
      if (isNaN(value) || value === 0) {
        return { severity: "error", message: "{{field}} must be a number different from 0." };
      }
      break;
  }
  if (Array.isArray(value) && value.length === 0) {
    return { severity: "error", message: "{{field}} cannot be empty." };
  } else if (!value) {
    return { severity: "error", message: "{{field}} is required." };
  }
  return { severity: "information" };
};

export default required;
