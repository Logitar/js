import type { ValidationRule } from "../validator";
import { isNullOrWhiteSpace } from "../../helpers/stringUtils";

const url: ValidationRule = (value: unknown): boolean => {
  if (typeof value !== "string") {
    return false;
  }
  if (isNullOrWhiteSpace(value)) {
    return true;
  }
  let url: URL;
  try {
    url = new URL(value.trim());
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};

export default url;
