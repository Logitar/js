import type { ValidationRule, ValidationSeverity } from "..";

const url: ValidationRule = (value: unknown): ValidationSeverity => {
  let isValid: boolean = false;
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (trimmed) {
    let url: URL;
    try {
      url = new URL(trimmed);
      isValid = url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {}
  }
  return isValid ? "information" : "error";
};

export default url;
