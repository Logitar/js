import type { ValidationRule } from "../validator";
import { isLetterOrDigit } from "../../helpers/stringUtils";

const requireNonAlphanumeric: ValidationRule = (value: unknown): boolean => {
  return typeof value === "string" && [...value].some((c) => !isLetterOrDigit(c));
};

export default requireNonAlphanumeric;
