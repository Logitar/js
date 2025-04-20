import type { RuleExecutionOutcome, ValidationRule } from "..";
import { isNullOrWhiteSpace } from "../../helpers/stringUtils";

const required: ValidationRule = (value: unknown): RuleExecutionOutcome => {
  let isValid: boolean = false;
  switch (typeof value) {
    case "number":
      isValid = !isNaN(value) && value !== 0;
      break;
    case "string":
      isValid = !isNullOrWhiteSpace(value);
      break;
    default:
      if (Array.isArray(value)) {
        isValid = value.length > 0;
      } else {
        isValid = Boolean(value);
      }
      break;
  }
  return { severity: isValid ? "information" : "error" };
};

export default required;
