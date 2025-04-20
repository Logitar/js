import type { ValidationRule, ValidationSeverity } from "..";
import { isLetterOrDigit } from "../../helpers/stringUtils";

const slug: ValidationRule = (value: unknown): ValidationSeverity => {
  const isValid: boolean = typeof value === "string" && value.split("-").every((word) => word.length > 0 && [...word].every(isLetterOrDigit));
  return isValid ? "information" : "error";
};

export default slug;
