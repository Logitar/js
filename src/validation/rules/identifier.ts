import type { ValidationRule, ValidationSeverity } from "..";
import { isDigit, isLetterOrDigit } from "../../helpers/stringUtils";

const identifier: ValidationRule = (value: unknown): ValidationSeverity => {
  const isValid: boolean = typeof value === "string" && value.length > 0 && !isDigit(value[0]) && [...value].every((c) => isLetterOrDigit(c) || c === "_");
  return isValid ? "information" : "error";
};

export default identifier;
