import type { ValidationRule } from "..";

const url: ValidationRule = (value: unknown): boolean => {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (!trimmed) {
    return false;
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
