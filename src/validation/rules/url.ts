import type { RuleExecutionOutcome, ValidationRule } from "..";

const url: ValidationRule = (value: unknown): RuleExecutionOutcome => {
  let isValid: boolean = false;
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (trimmed) {
    let url: URL;
    try {
      url = new URL(trimmed);
      isValid = url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {}
  }
  return { severity: isValid ? "information" : "error" };
};

export default url;
