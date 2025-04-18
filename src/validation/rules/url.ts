import type { ValidationRule } from "../validator";

const url: ValidationRule = (value: unknown): boolean => {
  if (typeof value !== "string") {
    return false;
  }
  const trimmed: string = value.trim();
  if (trimmed.length === 0) {
    return true;
  }
  let url: URL;
  try {
    url = new URL(trimmed);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};

export default url;
