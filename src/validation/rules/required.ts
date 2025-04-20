import type { ValidationRule } from "..";
import { isNullOrWhiteSpace } from "../../helpers/stringUtils";

const required: ValidationRule = (value: unknown): boolean => {
  switch (typeof value) {
    case "number":
      return !isNaN(value) && value !== 0;
    case "string":
      return !isNullOrWhiteSpace(value);
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return Boolean(value);
};

export default required;
