import type { ValidationRule, ValidationSeverity } from "..";
import { isNullOrWhiteSpace } from "../../helpers/stringUtils";

const required: ValidationRule = (value: unknown): ValidationSeverity => {
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
  return isValid ? "information" : "error";
};

export default required;
