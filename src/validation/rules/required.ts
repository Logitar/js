import type { ValidationRule } from "../validator";
import { isNullOrWhiteSpace } from "../../helpers/stringUtils";

const required: ValidationRule = (value: unknown): boolean => {
  switch (typeof value) {
    case "string":
      return !isNullOrWhiteSpace(value);
    case "number":
      return !isNaN(value);
  }
  if (Array.isArray(value) && value.length === 0) {
    return false;
  }
  return value !== false && value !== null && value !== undefined;
};

export default required;
