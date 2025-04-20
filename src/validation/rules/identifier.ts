import type { RuleExecutionOutcome, ValidationRule } from "..";
import { isDigit, isLetterOrDigit } from "../../helpers/stringUtils";

const identifier: ValidationRule = (value: unknown): RuleExecutionOutcome => {
  const isValid: boolean = typeof value === "string" && value.length > 0 && !isDigit(value[0]) && [...value].every((c) => isLetterOrDigit(c) || c === "_");
  return { severity: isValid ? "information" : "error" };
};

export default identifier;
